import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { register as apiRegister } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      });
      
      toast({
        title: "Registration successful!",
        description: "Please login with your credentials.",
      });
      setLocation("/login");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 lg:px-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, City, Country" value={formData.address} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} />
              </div>
              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
