import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Filter,
  RefreshCw,
  MoreHorizontal,
  Mail,
  Edit,
  Trash2,
  UserPlus,
  PlusCircle,
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Admin";
  status: "Active" | "Inactive";
  lastLogin: string;
  orders: number;
  avatar: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // User form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "Customer" as User["role"],
    status: "Active" as User["status"],
  });

  // Generate mock users
  useEffect(() => {
    const generateMockUsers = () => {
      setIsLoading(true);
      
      const mockUsers: User[] = [];
      
      // Admin user
      mockUsers.push({
        id: "user-1",
        name: "Admin User",
        email: "admin@example.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2023-06-15",
        orders: 0,
        avatar: `https://ui-avatars.com/api/?name=Admin+User&background=random`,
      });
      
      // Customer users
      for (let i = 2; i <= 10; i++) {
        const firstName = ["John", "Jane", "Mike", "Emma", "David", "Sarah"][Math.floor(Math.random() * 6)];
        const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Davis"][Math.floor(Math.random() * 6)];
        const name = `${firstName} ${lastName}`;
        
        mockUsers.push({
          id: `user-${i}`,
          name,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          role: "Customer",
          status: Math.random() > 0.2 ? "Active" : "Inactive",
          lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          orders: Math.floor(Math.random() * 10),
          avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
        });
      }
      
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    };
    
    generateMockUsers();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = users;
    
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(user => user.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    if (roleFilter !== "all") {
      result = result.filter(user => user.role.toLowerCase() === roleFilter.toLowerCase());
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, statusFilter, roleFilter]);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length
        ? []
        : filteredUsers.map(user => user.id)
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      // In a real app, this would be an API call
      setUsers(prev => prev.filter(user => user.id !== userToDelete));
      setSelectedUsers(prev => prev.filter(id => id !== userToDelete));
      
      toast("User deleted successfully", {
        description: `The user "${user.email}" has been permanently deleted.`,
      });
    }
    
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteSelected = () => {
    // In a real app, this would be an API call
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    
    toast(`${selectedUsers.length} users deleted`, {
      description: "The selected users have been successfully deleted.",
    });
    
    setSelectedUsers([]);
  };

  const openUserForm = (user?: User) => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      setIsEditing(true);
    } else {
      setFormData({
        id: `user-${Date.now()}`,
        name: "",
        email: "",
        role: "Customer",
        status: "Active",
      });
      setIsEditing(false);
    }
    
    setIsUserDialogOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email) {
      toast("Validation error", {
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditing) {
      // Update existing user
      setUsers(prev =>
        prev.map(user =>
          user.id === formData.id 
            ? { 
                ...user, 
                name: formData.name, 
                email: formData.email, 
                role: formData.role, 
                status: formData.status 
              } 
            : user
        )
      );
      
      toast("User updated", {
        description: "The user has been successfully updated.",
      });
    } else {
      // Add new user
      const firstName = formData.name.split(' ')[0];
      const lastName = formData.name.split(' ').slice(1).join(' ');
      
      setUsers(prev => [
        ...prev, 
        {
          ...formData,
          lastLogin: "Never",
          orders: 0,
          avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
        }
      ]);
      
      toast("User added", {
        description: "The user has been successfully added.",
      });
    }
    
    setIsUserDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-muted-foreground">
              Manage your customers and admin users
            </p>
          </div>
          <Button onClick={() => openUserForm()}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center truncate">
                      <span>Status: {statusFilter === "all" ? "All" : statusFilter}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center truncate">
                      <span>Role: {roleFilter === "all" ? "All" : roleFilter}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setRoleFilter("all");
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedUsers.length > 0 && (
              <div className="flex items-center justify-between bg-secondary/50 py-2 px-4 rounded-md mb-4">
                <span className="text-sm">{selectedUsers.length} users selected</span>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            )}
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-md p-4 border border-border animate-pulse">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-secondary" />
                      <div className="ml-4 space-y-2 flex-1">
                        <div className="h-4 bg-secondary rounded w-1/3" />
                        <div className="h-3 bg-secondary rounded w-1/4" />
                      </div>
                      <div className="h-8 w-20 bg-secondary rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredUsers.length > 0 ? (
                  <div className="rounded-md border border-border">
                    <div className="grid grid-cols-8 px-4 py-3 text-xs font-medium text-muted-foreground bg-muted">
                      <div className="flex items-center col-span-1">
                        <Checkbox 
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </div>
                      <div className="col-span-2">User</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div>Last Login</div>
                      <div>Orders</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y divide-border">
                      {filteredUsers.map((user) => (
                        <div 
                          key={user.id} 
                          className={cn(
                            "grid grid-cols-8 px-4 py-3 text-sm items-center",
                            selectedUsers.includes(user.id) && "bg-secondary/20"
                          )}
                        >
                          <div className="flex items-center col-span-1">
                            <Checkbox 
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={() => handleSelectUser(user.id)}
                            />
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden border border-border">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div>
                            <Badge 
                              variant={user.role === "Admin" ? "default" : "outline"}
                            >
                              {user.role}
                            </Badge>
                          </div>
                          <div>
                            <Badge 
                              className={cn(
                                "rounded-full",
                                user.status === "Active" 
                                  ? "bg-green-500 hover:bg-green-600" 
                                  : "bg-yellow-500 hover:bg-yellow-600"
                              )}
                            >
                              {user.status}
                            </Badge>
                          </div>
                          <div>{user.lastLogin}</div>
                          <div>{user.orders}</div>
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openUserForm(user)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast("Email sent to user")}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-border rounded-md">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="mt-4 text-lg font-medium">No Users Found</h3>
                    <p className="text-muted-foreground mt-2">
                      {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "There are no users to display."}
                    </p>
                    <Button 
                      className="mt-4"
                      onClick={() => openUserForm()}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Form Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the user's information"
                : "Fill out the form to add a new user"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value as User["role"] })}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as User["status"] })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUserDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update User" : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;

