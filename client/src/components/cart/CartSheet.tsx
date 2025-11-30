import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/api";
import { useState } from "react";

export function CartSheet() {
  const { cart, removeFromCart, cartTotal, clearCart } = useApp();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await createOrder(cart);
      toast({
        title: "Order placed!",
        description: "Your order has been successfully placed.",
      });
      clearCart();
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Checkout failed",
        description: error.message || "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full animate-in zoom-in">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] flex flex-col pr-0">
        <SheetHeader className="px-1">
          <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 my-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden border bg-secondary/20 shrink-0 flex items-center justify-center">
                    <div className="text-2xl text-muted-foreground/30">🏠</div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium font-serif line-clamp-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <div className="space-y-4 pr-6">
            <Separator />
            <div className="flex items-center justify-between font-serif text-lg font-medium">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
