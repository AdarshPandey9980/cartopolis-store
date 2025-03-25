
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart, Line } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  ChevronRight
} from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import { cn } from "@/lib/utils";
import MOCK_PRODUCTS from "@/data/mockProducts";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
  { name: "Aug", sales: 6500 },
];

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Home", value: 150 },
  { name: "Beauty", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

const AdminDashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Recent orders data
  const recentOrders = [
    {
      id: "ORD-001234",
      customer: "John Doe",
      date: "2023-06-15",
      total: 129.99,
      status: "Delivered",
    },
    {
      id: "ORD-001233",
      customer: "Jane Smith",
      date: "2023-06-14",
      total: 89.95,
      status: "Processing",
    },
    {
      id: "ORD-001232",
      customer: "Michael Johnson",
      date: "2023-06-14",
      total: 245.50,
      status: "Shipped",
    },
    {
      id: "ORD-001231",
      customer: "Sarah Williams",
      date: "2023-06-13",
      total: 32.99,
      status: "Delivered",
    },
    {
      id: "ORD-001230",
      customer: "David Brown",
      date: "2023-06-12",
      total: 178.25,
      status: "Delivered",
    },
  ];

  useEffect(() => {
    // Calculate totals - in a real app, this would be from API
    setTotalSales(24890.75);
    setTotalOrders(187);
    setTotalCustomers(842);
    setTotalProducts(MOCK_PRODUCTS.length);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
              <div className="flex items-center pt-1 text-xs">
                <Badge className="rounded-sm bg-green-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12.5%
                </Badge>
                <span className="ml-2 text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <div className="flex items-center pt-1 text-xs">
                <Badge className="rounded-sm bg-green-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  8.2%
                </Badge>
                <span className="ml-2 text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
              <div className="flex items-center pt-1 text-xs">
                <Badge className="rounded-sm bg-green-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  5.3%
                </Badge>
                <span className="ml-2 text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <div className="flex items-center pt-1 text-xs">
                <Badge className="rounded-sm bg-red-500 text-white">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  2.1%
                </Badge>
                <span className="ml-2 text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "white", 
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e2e8f0",
                      }} 
                    />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Revenue distribution by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "white", 
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e2e8f0",
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border">
                <div className="grid grid-cols-5 px-4 py-3 text-xs font-medium text-muted-foreground bg-muted">
                  <div>Order ID</div>
                  <div>Customer</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <div className="divide-y divide-border">
                  {recentOrders.map((order, i) => (
                    <div key={i} className="grid grid-cols-5 px-4 py-3 text-sm items-center">
                      <div className="font-medium">{order.id}</div>
                      <div>{order.customer}</div>
                      <div>{order.date}</div>
                      <div>${order.total.toFixed(2)}</div>
                      <div>
                        <Badge 
                          className={cn(
                            "rounded-sm",
                            order.status === "Delivered" && "bg-green-500 hover:bg-green-600",
                            order.status === "Processing" && "bg-yellow-500 hover:bg-yellow-600",
                            order.status === "Shipped" && "bg-blue-500 hover:bg-blue-600"
                          )}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <a 
                  href="/admin/orders" 
                  className="text-xs text-primary flex items-center hover:underline"
                >
                  View all orders
                  <ChevronRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_PRODUCTS.slice(0, 5).map((product, i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-10 w-10 rounded overflow-hidden border border-border">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <span className="text-xs text-muted-foreground">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="text-xs font-medium">
                      {Math.floor(Math.random() * 100) + 1} sales
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <a 
                  href="/admin/products" 
                  className="text-xs text-primary flex items-center hover:underline"
                >
                  View all products
                  <ChevronRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
