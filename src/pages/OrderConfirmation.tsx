
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, ChevronRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const orderDetails = {
    orderId: "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
    date: new Date().toLocaleDateString(),
    items: 3,
    total: 149.97,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  };

  return (
    <MainLayout>
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="bg-primary/10 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-medium">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date</span>
                  <span>{orderDetails.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">${orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>Credit Card (•••• 1234)</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Address</span>
                  <p className="font-medium">123 Main Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-muted-foreground">Shipping Method</span>
                  <span>Standard Shipping</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-lg p-6 shadow-sm mb-10">
            <h2 className="text-lg font-medium mb-4">Order Timeline</h2>
            
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-6 mt-3 mb-3 w-0.5 bg-primary/20"></div>
              
              <div className="relative flex items-start mb-6 animate-fade-in" style={{ animationDelay: "0ms" }}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Order Confirmed</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{orderDetails.date}</span>
                    <Clock className="h-3 w-3 ml-2 mr-1" />
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order has been received and is being processed.
                  </p>
                </div>
              </div>
              
              <div className="relative flex items-start mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-muted-foreground">
                  <Package className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Processing</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order is being prepared for shipping.
                  </p>
                </div>
              </div>
              
              <div className="relative flex items-start animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-muted-foreground">
                  <Package className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Estimated Delivery</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{orderDetails.estimatedDelivery}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order is expected to arrive by this date.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/products")}
              size="lg"
              className="rounded-full"
            >
              Continue Shopping
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <div className="flex justify-center">
              <Button 
                variant="link" 
                className="text-primary" 
                onClick={() => navigate("/orders")}
              >
                View All Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmation;
