
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft, Package, Truck, CheckCircle, Clock, HelpCircle } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const OrderTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  // Mock order data - in a real app, you'd fetch this from your API
  const order = {
    id: id || "ORD-12345",
    date: "May 15, 2023",
    status: "processing" as OrderStatus,
    total: 549.96,
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 249.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "Smart Watch Pro",
        price: 299.97,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    trackingNumber: "TRK-987654321",
    estimatedDelivery: "May 22, 2023"
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-indigo-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      case "cancelled":
        return <HelpCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Order Tracking</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/account/orders")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Orders
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(order.status)} text-white flex items-center gap-1.5`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">Order Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Items in Your Order</h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border">
                            <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            </div>
                            <div className="font-medium">${item.price.toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-4">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${(order.total * 0.07).toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${(order.total * 1.07).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="shipping" className="pt-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Shipping Address</h3>
                      <div className="p-4 rounded-lg border">
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Tracking Information</h3>
                      <div className="p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="font-medium">Tracking Number</p>
                            <p className="text-muted-foreground">{order.trackingNumber}</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => window.open("https://example.com/track", "_blank")}>
                            Track Package
                          </Button>
                        </div>
                        <p><span className="font-medium">Carrier:</span> Fast Shipping Co.</p>
                        <p><span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="pt-2">
                  <div className="space-y-4">
                    <div className="relative pl-8 pb-8 border-l-2 border-green-500">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-sm text-muted-foreground">May 15, 2023 - 9:42 AM</p>
                        <p className="text-sm mt-1">Your order has been received and is being processed.</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l-2 border-green-500">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">Payment Confirmed</p>
                        <p className="text-sm text-muted-foreground">May 15, 2023 - 9:45 AM</p>
                        <p className="text-sm mt-1">Your payment has been successfully processed.</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l-2 border-green-500">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-medium">Processing</p>
                        <p className="text-sm text-muted-foreground">May 15, 2023 - 2:30 PM</p>
                        <p className="text-sm mt-1">Your order is being prepared for shipping.</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 pb-8 border-l-2 border-gray-300">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                      <div>
                        <p className="font-medium">Shipped</p>
                        <p className="text-sm text-muted-foreground">Estimated: May 17, 2023</p>
                        <p className="text-sm mt-1">Your order will be handed to the shipping carrier.</p>
                      </div>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-gray-300">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300"></div>
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-muted-foreground">Estimated: May 22, 2023</p>
                        <p className="text-sm mt-1">Your order is expected to arrive on this date.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>Need help with your order?</AlertTitle>
                <AlertDescription>
                  If you have any questions or concerns about your order, please 
                  <Button variant="link" className="px-1 h-auto">contact our support team</Button>
                  for assistance.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderTracking;
