
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { cn } from "@/lib/utils";
import MOCK_PRODUCTS from "@/data/mockProducts";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    address: string;
  };
  paymentMethod: string;
  shippingMethod: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  // Generate mock orders
  useEffect(() => {
    const generateMockOrders = () => {
      setIsLoading(true);
      
      const statusOptions: Order["status"][] = ["Processing", "Shipped", "Delivered", "Cancelled"];
      const mockOrders: Order[] = [];
      
      for (let i = 1; i <= 10; i++) {
        const orderItems: OrderItem[] = [];
        const itemCount = Math.floor(Math.random() * 3) + 1;
        
        for (let j = 0; j < itemCount; j++) {
          const product = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
          const quantity = Math.floor(Math.random() * 3) + 1;
          
          orderItems.push({
            id: `item-${i}-${j}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image,
          });
        }
        
        const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        mockOrders.push({
          id: `ORD-${(100000 + i).toString()}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
          total,
          items: orderItems,
          customer: {
            name: `Customer ${i}`,
            email: `customer${i}@example.com`,
            address: `${Math.floor(Math.random() * 999) + 1} Main St, City, State, 12345`,
          },
          paymentMethod: Math.random() > 0.5 ? "Credit Card" : "PayPal",
          shippingMethod: Math.random() > 0.5 ? "Standard Shipping" : "Express Shipping",
        });
      }
      
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    };
    
    generateMockOrders();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = orders;
    
    if (searchTerm) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === filteredOrders.length
        ? []
        : filteredOrders.map(order => order.id)
    );
  };

  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleToggleExpand = (orderId: string) => {
    setExpandedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
    
    toast("Order status updated", {
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
    
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder({ ...currentOrder, status: newStatus });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-muted-foreground">
              View and manage customer orders
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Status: {statusFilter === "all" ? "All" : statusFilter}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedOrders.length > 0 && (
              <div className="flex items-center justify-between bg-secondary/50 py-2 px-4 rounded-md mb-4">
                <span className="text-sm">{selectedOrders.length} orders selected</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm">
                      Bulk Actions
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => toast("Export feature not implemented in this demo")}>
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast("Print feature not implemented in this demo")}>
                      Print Invoices
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast("Status updated for selected orders")}>
                      Mark as Shipped
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-md p-4 border border-border animate-pulse">
                    <div className="flex items-center">
                      <div className="h-4 w-4 bg-secondary rounded-sm mr-2" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-secondary rounded w-1/6" />
                        <div className="h-3 bg-secondary rounded w-1/4" />
                      </div>
                      <div className="h-6 w-20 bg-secondary rounded" />
                      <div className="h-8 w-8 bg-secondary rounded-full ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredOrders.length > 0 ? (
                  <div className="rounded-md border border-border">
                    <div className="grid grid-cols-8 px-4 py-3 text-xs font-medium text-muted-foreground bg-muted">
                      <div className="flex items-center col-span-1">
                        <Checkbox 
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </div>
                      <div>Order ID</div>
                      <div>Date</div>
                      <div>Customer</div>
                      <div>Total</div>
                      <div>Status</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    <div className="divide-y divide-border">
                      {filteredOrders.map((order) => (
                        <div key={order.id}>
                          <div 
                            className={cn(
                              "grid grid-cols-8 px-4 py-3 text-sm items-center",
                              selectedOrders.includes(order.id) && "bg-secondary/20"
                            )}
                          >
                            <div className="flex items-center col-span-1">
                              <Checkbox 
                                checked={selectedOrders.includes(order.id)}
                                onCheckedChange={() => handleSelectOrder(order.id)}
                              />
                            </div>
                            <div className="font-medium">{order.id}</div>
                            <div>{order.date}</div>
                            <div className="truncate max-w-[120px]" title={order.customer.name}>
                              {order.customer.name}
                            </div>
                            <div>${order.total.toFixed(2)}</div>
                            <div>
                              <Badge 
                                className={cn(
                                  order.status === "Delivered" && "bg-green-500 hover:bg-green-600",
                                  order.status === "Processing" && "bg-yellow-500 hover:bg-yellow-600",
                                  order.status === "Shipped" && "bg-blue-500 hover:bg-blue-600",
                                  order.status === "Cancelled" && "bg-red-500 hover:bg-red-600"
                                )}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <span>Update</span>
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Processing")}>
                                    <Clock className="mr-2 h-4 w-4" /> Processing
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Shipped")}>
                                    <Truck className="mr-2 h-4 w-4" /> Shipped
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Delivered")}>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Delivered
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Cancelled")}>
                                    <XCircle className="mr-2 h-4 w-4" /> Cancelled
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleToggleExpand(order.id)}
                              >
                                {expandedOrders.includes(order.id) ? 
                                  <ChevronDown className="h-4 w-4" /> : 
                                  <ChevronRight className="h-4 w-4" />
                                }
                              </Button>
                            </div>
                          </div>
                          
                          {expandedOrders.includes(order.id) && (
                            <div className="px-4 py-3 bg-secondary/10">
                              <div className="text-sm font-medium mb-2">Order Items</div>
                              <div className="space-y-2">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center">
                                    <div className="h-10 w-10 rounded-md overflow-hidden border border-border">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div className="ml-3 flex-1">
                                      <p className="font-medium line-clamp-1">{item.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        ${item.price.toFixed(2)} × {item.quantity}
                                      </p>
                                    </div>
                                    <div className="font-medium">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-border rounded-md">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="mt-4 text-lg font-medium">No Orders Found</h3>
                    <p className="text-muted-foreground mt-2">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filter to find what you're looking for."
                        : "There are no orders to display."}
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View complete information about this order
            </DialogDescription>
          </DialogHeader>
          
          {currentOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Order ID: {currentOrder.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on {currentOrder.date}
                  </p>
                </div>
                <Badge 
                  className={cn(
                    "px-3 py-1",
                    currentOrder.status === "Delivered" && "bg-green-500 hover:bg-green-600",
                    currentOrder.status === "Processing" && "bg-yellow-500 hover:bg-yellow-600",
                    currentOrder.status === "Shipped" && "bg-blue-500 hover:bg-blue-600",
                    currentOrder.status === "Cancelled" && "bg-red-500 hover:bg-red-600"
                  )}
                >
                  {currentOrder.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Customer Information</h4>
                  <p className="font-medium">{currentOrder.customer.name}</p>
                  <p>{currentOrder.customer.email}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Shipping Address</h4>
                  <p>{currentOrder.customer.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Payment Method</h4>
                  <p>{currentOrder.paymentMethod}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Shipping Method</h4>
                  <p>{currentOrder.shippingMethod}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Order Items</h4>
                <div className="rounded-md border border-border">
                  <div className="grid grid-cols-4 px-4 py-2 text-xs font-medium text-muted-foreground bg-muted">
                    <div className="col-span-2">Product</div>
                    <div>Quantity</div>
                    <div>Price</div>
                  </div>
                  <div className="divide-y divide-border">
                    {currentOrder.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-4 px-4 py-3 text-sm items-center">
                        <div className="col-span-2 flex items-center">
                          <div className="h-10 w-10 rounded-md overflow-hidden border border-border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium line-clamp-1">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                        <div>{item.quantity}</div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(currentOrder.total * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(currentOrder.total + currentOrder.total * 0.07).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Select 
                  value={currentOrder.status} 
                  onValueChange={(value) => updateOrderStatus(currentOrder.id, value as Order["status"])}
                >
                  <SelectTrigger className="w-[200px]">
                    <span>Update Status</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
