import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, ShoppingBag, Plus } from "lucide-react";
import { useApp } from "@/lib/store";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentOrders, getOrderHistory, updateUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user, login } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    } else {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, setLocation]);

  const { data: currentOrders = [], isLoading: isLoadingCurrent } = useQuery({
    queryKey: ["orders", "current"],
    queryFn: getCurrentOrders,
    enabled: !!user,
  });

  const { data: orderHistory = [], isLoading: isLoadingHistory } = useQuery({
    queryKey: ["orders", "history"],
    queryFn: getOrderHistory,
    enabled: !!user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      login(data);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  if (!user) return null;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      processing: { color: "bg-amber-500 hover:bg-amber-600", label: "Processing" },
      shipped: { color: "bg-blue-500 hover:bg-blue-600", label: "Shipped" },
      delivered: { color: "bg-green-500 hover:bg-green-600", label: "Delivered" },
      cancelled: { color: "bg-red-500 hover:bg-red-600", label: "Cancelled" },
    };
    const config = statusMap[status] || statusMap.processing;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container px-6 md:px-8 lg:px-12 py-12 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Link href="/#categories">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Order
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
            <TabsTrigger value="orders">Active Orders</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal details and shipping address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={formData.address} onChange={handleChange} />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4" disabled={updateProfileMutation.isPending}>
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Current Orders</CardTitle>
                <CardDescription>Track the status of your active orders.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingCurrent ? (
                  <p className="text-muted-foreground text-center py-8">Loading orders...</p>
                ) : currentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {currentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <p className="text-sm font-medium mt-1">${parseFloat(order.totalAmount).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No active orders</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/20 border-t p-6">
                 <div className="w-full text-center">
                    <p className="text-muted-foreground mb-4">Want to order more?</p>
                    <Link href="/#categories">
                        <Button variant="outline" className="gap-2">
                            <ShoppingBag className="h-4 w-4" /> Browse Catalog
                        </Button>
                    </Link>
                 </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past purchases.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHistory ? (
                  <p className="text-muted-foreground text-center py-8">Loading history...</p>
                ) : orderHistory.length > 0 ? (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-muted-foreground">Order #{order.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <p className="text-sm font-medium text-muted-foreground mt-1">
                            ${parseFloat(order.totalAmount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No order history yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}
