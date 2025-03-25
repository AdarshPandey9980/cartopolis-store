import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  PlusCircle,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { Product } from "@/components/products/ProductCard";
import MOCK_PRODUCTS from "@/data/mockProducts";
import { cn } from "@/lib/utils";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Product form state
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    inStock: true,
    featured: false,
  });

  useEffect(() => {
    // In a real app, this would be an API call
    const loadProducts = () => {
      setIsLoading(true);
      setTimeout(() => {
        setProducts(MOCK_PRODUCTS);
        setIsLoading(false);
      }, 800);
    };
    
    loadProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts(
      selectedProducts.length === filteredProducts.length
        ? []
        : filteredProducts.map(product => product.id)
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      // In a real app, this would be an API call
      setProducts(prev => prev.filter(product => product.id !== productToDelete));
      setSelectedProducts(prev => prev.filter(id => id !== productToDelete));
      
      toast("Product deleted successfully", {
        description: `The product "${product.name}" has been permanently deleted.`,
      });
    }
    
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteSelected = () => {
    // In a real app, this would be an API call
    setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
    
    toast(`${selectedProducts.length} products deleted`, {
      description: "The selected products have been successfully deleted.",
    });
    
    setSelectedProducts([]);
  };

  const openProductForm = (product?: Product) => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
        featured: product.featured || false,
      });
      setIsEditing(true);
    } else {
      setFormData({
        id: `product-${Date.now()}`,
        name: "",
        description: "",
        price: 0,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
        category: "",
        inStock: true,
        featured: false,
      });
      setIsEditing(false);
    }
    
    setIsProductDialogOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast("Validation error", {
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditing) {
      // Update existing product
      setProducts(prev =>
        prev.map(product =>
          product.id === formData.id ? { ...formData } : product
        )
      );
      
      toast("Product updated", {
        description: "The product has been successfully updated.",
      });
    } else {
      // Add new product
      setProducts(prev => [...prev, { ...formData, rating: 0 }]);
      
      toast("Product added", {
        description: "The product has been successfully added.",
      });
    }
    
    setIsProductDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Button onClick={() => openProductForm()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id="category" className="mr-2" />
                      <label htmlFor="category">Category</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="status" className="mr-2" />
                      <label htmlFor="status">Status</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="featured" className="mr-2" />
                      <label htmlFor="featured">Featured</label>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedProducts.length > 0 && (
              <div className="flex items-center justify-between bg-secondary/50 py-2 px-4 rounded-md mb-4">
                <span className="text-sm">{selectedProducts.length} products selected</span>
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
                      <div className="h-12 w-12 rounded-md bg-secondary" />
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
              <div className="rounded-md border border-border">
                <div className="grid grid-cols-8 px-4 py-3 text-xs font-medium text-muted-foreground bg-muted">
                  <div className="flex items-center col-span-1">
                    <Checkbox 
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </div>
                  <div className="col-span-3">Product</div>
                  <div>Category</div>
                  <div>Price</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y divide-border">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className={cn(
                          "grid grid-cols-8 px-4 py-3 text-sm items-center",
                          selectedProducts.includes(product.id) && "bg-secondary/20"
                        )}
                      >
                        <div className="flex items-center col-span-1">
                          <Checkbox 
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => handleSelectProduct(product.id)}
                          />
                        </div>
                        <div className="col-span-3 flex items-center">
                          <div className="h-10 w-10 rounded-md overflow-hidden border border-border">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium line-clamp-1">{product.name}</p>
                            {product.featured && (
                              <Badge className="mt-1" variant="outline">Featured</Badge>
                            )}
                          </div>
                        </div>
                        <div className="capitalize">{product.category}</div>
                        <div>${product.price.toFixed(2)}</div>
                        <div>
                          <Badge 
                            className={cn(
                              product.inStock 
                                ? "bg-green-500 hover:bg-green-600" 
                                : "bg-red-500 hover:bg-red-600"
                            )}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openProductForm(product)}
                          >
                            <Edit className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Package className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <h3 className="text-lg font-medium">No products found</h3>
                      <p className="text-muted-foreground">
                        {searchTerm 
                          ? `No products match "${searchTerm}"`
                          : "There are no products to display"}
                      </p>
                      <Button className="mt-4" onClick={() => openProductForm()}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                      </Button>
                    </div>
                  )}
                </div>
              </div>
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
              Are you sure you want to delete this product? This action cannot be undone.
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

      {/* Product Form Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the details of your product"
                : "Fill out the form to add a new product to your inventory"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name*</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price*</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL*</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsProductDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
