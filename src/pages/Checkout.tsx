
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

type CheckoutStep = "customer" | "shipping" | "payment" | "review";

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("customer");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Customer information
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Shipping information
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  
  // Payment information
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Order summary
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const subtotal = cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  const handleNextStep = () => {
    const steps: CheckoutStep[] = ["customer", "shipping", "payment", "review"];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePreviousStep = () => {
    const steps: CheckoutStep[] = ["customer", "shipping", "payment", "review"];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call to place order
    setTimeout(() => {
      setIsProcessing(false);
      
      // Clear cart
      localStorage.removeItem("cart");
      
      // Show success toast
      toast("Order placed successfully", {
        description: "Thank you for your purchase! Your order has been placed.",
      });
      
      // Redirect to order confirmation
      navigate("/order-confirmation");
    }, 2000);
  };

  const renderStepIndicator = (step: CheckoutStep, label: string, index: number) => {
    const steps: CheckoutStep[] = ["customer", "shipping", "payment", "review"];
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    
    const isActive = currentStep === step;
    const isCompleted = stepIndex < currentIndex;
    
    return (
      <div className="flex flex-col items-center">
        <div 
          className={cn(
            "flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium mb-1",
            isActive && "bg-primary text-primary-foreground",
            isCompleted && "bg-green-500 text-white",
            !isActive && !isCompleted && "bg-secondary text-muted-foreground"
          )}
        >
          {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
        </div>
        <span 
          className={cn(
            "text-xs",
            isActive && "text-primary font-medium",
            isCompleted && "text-green-500",
            !isActive && !isCompleted && "text-muted-foreground"
          )}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/cart")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Cart
            </Button>
            
            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center">
                {renderStepIndicator("customer", "Customer", 0)}
                <div className="w-10 h-0.5 bg-border mx-1" />
                {renderStepIndicator("shipping", "Shipping", 1)}
                <div className="w-10 h-0.5 bg-border mx-1" />
                {renderStepIndicator("payment", "Payment", 2)}
                <div className="w-10 h-0.5 bg-border mx-1" />
                {renderStepIndicator("review", "Review", 3)}
              </div>
            </div>
            
            <span className="text-sm text-muted-foreground md:hidden">
              Step {["customer", "shipping", "payment", "review"].indexOf(currentStep) + 1} of 4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === "customer" && "Customer Information"}
                    {currentStep === "shipping" && "Shipping Address"}
                    {currentStep === "payment" && "Payment Method"}
                    {currentStep === "review" && "Review Your Order"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === "customer" && "Enter your contact details"}
                    {currentStep === "shipping" && "Where should we send your order?"}
                    {currentStep === "payment" && "How would you like to pay?"}
                    {currentStep === "review" && "Please review your order details before placing it"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentStep === "customer" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(123) 456-7890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === "shipping" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            placeholder="123 Main St"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State / Province</Label>
                          <Input
                            id="state"
                            placeholder="NY"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                          <Input
                            id="zipCode"
                            placeholder="10001"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === "payment" && (
                    <div className="space-y-6">
                      <Tabs defaultValue="credit-card">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                          <TabsTrigger value="paypal">PayPal</TabsTrigger>
                          <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
                        </TabsList>
                        <TabsContent value="credit-card" className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="4111 1111 1111 1111"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                type="password"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-4">
                            <div className="flex gap-2">
                              <img 
                                src="https://raw.githubusercontent.com/stripe/press/master/payment-icon-resources/VisaCard.svg" 
                                alt="Visa" 
                                className="h-7" 
                              />
                              <img 
                                src="https://raw.githubusercontent.com/stripe/press/master/payment-icon-resources/MasterCard.svg" 
                                alt="Mastercard" 
                                className="h-7" 
                              />
                              <img 
                                src="https://raw.githubusercontent.com/stripe/press/master/payment-icon-resources/AmericanExpress.svg" 
                                alt="American Express" 
                                className="h-7" 
                              />
                              <img 
                                src="https://raw.githubusercontent.com/stripe/press/master/payment-icon-resources/Discover.svg" 
                                alt="Discover" 
                                className="h-7" 
                              />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="paypal" className="text-center py-8">
                          <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                              alt="PayPal"
                              className="h-8"
                            />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Pay with PayPal</h3>
                          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                          <Button>
                            Connect with PayPal
                          </Button>
                        </TabsContent>
                        <TabsContent value="apple-pay" className="text-center py-8">
                          <div className="bg-black rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png"
                              alt="Apple Pay"
                              className="h-8"
                            />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Pay with Apple Pay</h3>
                          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
                            Complete your purchase with Apple Pay for the fastest checkout experience.
                          </p>
                          <Button variant="outline" className="bg-black text-white border-black hover:bg-black/90 hover:text-white">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png"
                              alt="Apple"
                              className="h-4 mr-2"
                            />
                            Pay
                          </Button>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="bg-secondary/50 p-4 rounded-lg text-sm">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Your payment information is encrypted and secure.</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === "review" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Customer Information</h3>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <p><span className="font-medium">Name:</span> {firstName} {lastName}</p>
                          <p><span className="font-medium">Email:</span> {email}</p>
                          <p><span className="font-medium">Phone:</span> {phone}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Shipping Address</h3>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <p>{firstName} {lastName}</p>
                          <p>{address}</p>
                          <p>{city}, {state} {zipCode}</p>
                          <p>{country}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Payment Method</h3>
                        <div className="bg-secondary/50 p-4 rounded-lg flex items-center">
                          <img 
                            src="https://raw.githubusercontent.com/stripe/press/master/payment-icon-resources/VisaCard.svg" 
                            alt="Visa" 
                            className="h-6 mr-2" 
                          />
                          <span>•••• •••• •••• {cardNumber.slice(-4)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Order Items</h3>
                        <div className="bg-secondary/50 p-4 rounded-lg space-y-4">
                          {cartItems.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between">
                              <div className="flex">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {currentStep !== "customer" && (
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Back
                    </Button>
                  )}
                  
                  {currentStep !== "review" ? (
                    <Button
                      onClick={handleNextStep}
                      className="ml-auto"
                    >
                      Continue
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePlaceOrder}
                      className="ml-auto"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {cartItems.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (7%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 bg-secondary/50 p-4 rounded-lg text-sm space-y-2">
                <p className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Secure checkout</span>
                </p>
                <p className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Free shipping on orders over $50</span>
                </p>
                <p className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
