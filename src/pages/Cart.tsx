
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui/select";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Product } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

interface CartItem extends Product {
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      setIsLoading(true);
      const cart = localStorage.getItem("cart");
      if (cart) {
        try {
          setCartItems(JSON.parse(cart));
        } catch (e) {
          console.error("Error parsing cart", e);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
      setIsLoading(false);
    };

    loadCart();
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast("Item removed", {
      description: "The item has been removed from your cart.",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    
    toast("Cart cleared", {
      description: "All items have been removed from your cart.",
    });
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container px-4 py-12 mx-auto animate-pulse">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-secondary rounded w-1/4 mb-8" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex py-4 gap-4">
                  <div className="h-24 w-24 bg-secondary rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-4 bg-secondary rounded w-1/4" />
                  </div>
                  <div className="h-8 w-20 bg-secondary rounded" />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="h-40 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="px-6">
                    <div className="flex justify-between items-center">
                      <CardTitle>Items ({cartItems.length})</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6">
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex py-4 border-b border-border">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="font-medium">
                                  <button 
                                    onClick={() => navigate(`/products/${item.id}`)}
                                    className="hover:text-primary"
                                  >
                                    {item.name}
                                  </button>
                                </h3>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground capitalize">{item.category}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between mt-2">
                              <div className="flex items-center border border-border rounded-md">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 rounded-r-none"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 rounded-l-none"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/products")}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Button>

                    <Select defaultValue="standard">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Shipping Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Shipping</SelectItem>
                        <SelectItem value="express">Express Shipping</SelectItem>
                        <SelectItem value="overnight">Overnight Shipping</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>
                      Review your order before proceeding to checkout.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (7%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => navigate("/checkout")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>

                <div className="mt-6 bg-primary/5 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Have a promo code?</h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 text-sm rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button className="rounded-l-none">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/products")}
                className="rounded-full"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
