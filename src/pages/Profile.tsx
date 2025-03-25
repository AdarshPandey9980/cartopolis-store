
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, CreditCard, User, Lock, Bell, LogOut, ExternalLink } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    address: {
      street: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      country: "United States"
    }
  });
  
  // Mock recent orders
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: "ORD-8723",
      date: "2023-09-15",
      status: "delivered",
      total: 129.99
    },
    {
      id: "ORD-9056",
      date: "2023-10-02",
      status: "shipped",
      total: 79.50
    },
    {
      id: "ORD-9128",
      date: "2023-10-20",
      status: "processing",
      total: 245.75
    }
  ]);
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    newsletter: true,
  });
  
  // Form state for profile editing
  const [formData, setFormData] = useState({...userDetails});
  
  // Check if user is logged in (in a real app, this would use an auth system)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { state: { from: "/profile" } });
    }
  }, [navigate]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle notification toggle changes
  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Notification settings updated",
      description: `You've ${notificationSettings[key] ? 'disabled' : 'enabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} notifications.`,
    });
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUserDetails(formData);
      setIsEditing(false);
      setLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
    }, 1000);
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to home
    navigate("/");
  };
  
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-2">
                  <AvatarImage src={userDetails.avatar} alt={userDetails.name} />
                  <AvatarFallback>{getInitials(userDetails.name)}</AvatarFallback>
                </Avatar>
                <CardTitle>{userDetails.name}</CardTitle>
                <CardDescription className="text-sm truncate">
                  {userDetails.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="profile" orientation="vertical" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                  <TabsList className="w-full rounded-none justify-start flex-col h-auto p-0 bg-transparent">
                    <TabsTrigger 
                      value="profile" 
                      className="w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-secondary"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile Information
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      className="w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-secondary"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger 
                      value="payment" 
                      className="w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-secondary"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-secondary"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="w-full justify-start px-4 py-3 rounded-none data-[state=active]:bg-secondary"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </CardFooter>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your account details and preferences
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => {
                          setIsEditing(false);
                          setFormData({...userDetails});
                        }}>
                          Cancel
                        </Button>
                        <Button onClick={saveProfileChanges} disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Shipping Address</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input 
                            id="street" 
                            name="address.street" 
                            value={formData.address.street} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="address.city" 
                              value={formData.address.city} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input 
                              id="state" 
                              name="address.state" 
                              value={formData.address.state} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                            <Input 
                              id="zipCode" 
                              name="address.zipCode" 
                              value={formData.address.zipCode} 
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input 
                            id="country" 
                            name="address.country" 
                            value={formData.address.country} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View and track your recent orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                              <div className="mt-1">
                                <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(order.status))}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                              <Button 
                                variant="link" 
                                className="h-auto p-0 text-sm"
                                onClick={() => navigate(`/order-tracking/${order.id}`)}
                              >
                                View Details
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => navigate("/account/orders")}
                        >
                          View All Orders
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-4">
                          You haven't placed any orders with us yet.
                        </p>
                        <Button onClick={() => navigate("/products")}>
                          Start Shopping
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payment" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your saved payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No payment methods saved</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't saved any payment methods yet.
                      </p>
                      <Button>
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password" 
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password" 
                            placeholder="Enter your new password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            placeholder="Confirm your new password"
                          />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-muted-foreground">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Enable Two-Factor Authentication</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                      <p className="text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Customize how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Order Updates</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your order status and shipping updates
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.orderUpdates}
                          onCheckedChange={() => handleNotificationToggle('orderUpdates')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Promotions and Discounts</h4>
                          <p className="text-sm text-muted-foreground">
                            Be the first to know about exclusive deals and special offers
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.promotions}
                          onCheckedChange={() => handleNotificationToggle('promotions')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">New Product Announcements</h4>
                          <p className="text-sm text-muted-foreground">
                            Get updates when new products are added to our store
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.newProducts}
                          onCheckedChange={() => handleNotificationToggle('newProducts')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Weekly Newsletter</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive our weekly newsletter with curated content
                          </p>
                        </div>
                        <Switch 
                          checked={notificationSettings.newsletter}
                          onCheckedChange={() => handleNotificationToggle('newsletter')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
