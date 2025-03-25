
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, PackageOpen, ShoppingCart, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const UserOrders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  
  // Mock order data - in a real app, you'd fetch this from your API
  const orders: Order[] = [
    {
      id: "ORD-12345",
      date: "May 15, 2023",
      status: "processing",
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
      ]
    },
    {
      id: "ORD-12346",
      date: "May 1, 2023",
      status: "delivered",
      total: 129.99,
      items: [
        {
          id: 3,
          name: "Bluetooth Speaker",
          price: 129.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1547949003-9792a18a2645?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ]
    },
    {
      id: "ORD-12347",
      date: "May 10, 2023",
      status: "shipped",
      total: 349.99,
      items: [
        {
          id: 4,
          name: "Laptop Sleeve",
          price: 49.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          id: 5,
          name: "Wireless Mouse",
          price: 79.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          id: 6,
          name: "Mechanical Keyboard",
          price: 220.01,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ]
    },
    {
      id: "ORD-12348",
      date: "May 5, 2023",
      status: "pending",
      total: 199.99,
      items: [
        {
          id: 7,
          name: "Mobile Phone Stand",
          price: 19.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1603380380982-85e8b82cf485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          id: 8,
          name: "Wired Earbuds",
          price: 59.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1608156639585-b3a7a6e98d0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          id: 9,
          name: "Power Bank",
          price: 120.01,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1603539444875-76e7684265f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ]
    }
  ];

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate("/products")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track all your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by order number or product name"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter: {statusFilter === "all" ? "All Orders" : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      All Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                      Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("processing")}>
                      Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
                      Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
                      Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                      Cancelled
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <PackageOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all" 
                      ? "Try changing your filters or search term" 
                      : "You haven't placed any orders yet"}
                  </p>
                  <Button onClick={() => navigate("/products")}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-secondary/50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/order-tracking/${order.id}`)}
                          >
                            Track Order
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="space-y-4">
                          {order.items.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <div className="font-medium">${item.price.toFixed(2)}</div>
                            </div>
                          ))}
                          
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Total</p>
                            <p className="text-muted-foreground">{order.items.length} items</p>
                          </div>
                          <div className="text-xl font-medium">${order.total.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserOrders;
