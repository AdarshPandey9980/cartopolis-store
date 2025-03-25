
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronRight, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  Star,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard, { Product } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import MOCK_PRODUCTS from "@/data/mockProducts";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  // Dummy product images (in a real app these would come from the API)
  const productImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1699&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
  ];

  useEffect(() => {
    // In a real app, fetch product data from API
    const fetchProduct = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);
        setProduct(foundProduct || null);
        
        if (foundProduct) {
          // Get related products from the same category
          const related = MOCK_PRODUCTS
            .filter(p => p.category === foundProduct.category && p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        
        setIsLoading(false);
      }, 500);
    };
    
    fetchProduct();
  }, [id]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // In a real app, this would dispatch to a state manager
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: { id: string }) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    toast("Added to cart", {
      description: `${product.name} (${quantity}) has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => {
          navigate("/cart");
        },
      },
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (product) {
      toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
        description: isFavorite 
          ? `${product.name} has been removed from your favorites.`
          : `${product.name} has been added to your favorites.`,
      });
    }
  };

  const shareProduct = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .catch(error => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard", {
        description: "You can now share this product with others.",
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container px-4 py-16 mx-auto animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-secondary rounded-lg" />
            <div className="space-y-6">
              <div className="h-6 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-8 bg-secondary rounded w-1/4" />
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-full" />
                <div className="h-4 bg-secondary rounded w-full" />
                <div className="h-4 bg-secondary rounded w-2/3" />
              </div>
              <div className="h-12 bg-secondary rounded w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container px-4 py-16 mx-auto text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            variant="default" 
            className="mt-6"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/")}>
            Home
          </Button>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/products")}>
            Products
          </Button>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={() => navigate(`/products?category=${product.category}`)}
          >
            {product.category}
          </Button>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-border">
              <img 
                src={productImages[activeImage] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "aspect-square rounded-md overflow-hidden border",
                    activeImage === index 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {product.featured && (
                <Badge className="mb-2">Featured</Badge>
              )}
              
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-4 w-4", 
                        i < (product.rating || 0) 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-muted-foreground"
                      )} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} (24 reviews)
                  </span>
                </div>
                
                <Separator orientation="vertical" className="h-4" />
                
                <span className="text-sm text-muted-foreground">
                  Category: <span className="text-foreground capitalize">{product.category}</span>
                </span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center">
                <h2 className="text-3xl font-bold">${product.price.toFixed(2)}</h2>
                {product.inStock ? (
                  <Badge className="ml-4 bg-green-500 hover:bg-green-600">In Stock</Badge>
                ) : (
                  <Badge className="ml-4 bg-destructive hover:bg-destructive/90">Out of Stock</Badge>
                )}
              </div>
              
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>
            
            <Separator />
            
            {product.inStock && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center border border-border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-9 rounded-r-none"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={incrementQuantity}
                      className="h-9 rounded-l-none"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg"
                    className="flex-1 min-w-[150px]"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-full"
                    onClick={toggleFavorite}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4",
                        isFavorite && "fill-red-500 text-red-500"
                      )} 
                    />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-full"
                    onClick={shareProduct}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-3 bg-secondary/50 p-4 rounded-lg">
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center text-sm">
                <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Secure checkout using industry-standard encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <p className="text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
                <p className="text-muted-foreground">
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <p className="text-sm text-muted-foreground">
                    10 x 5 x 2 inches
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Weight</h3>
                  <p className="text-sm text-muted-foreground">
                    0.5 lbs
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Materials</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium quality materials
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Warranty</h3>
                  <p className="text-sm text-muted-foreground">
                    1 year limited warranty
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-border pb-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-medium">John Doe</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, j) => (
                              <Star 
                                key={j} 
                                className={cn(
                                  "h-3 w-3", 
                                  j < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                                )} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great product! Exactly as described and shipped quickly.
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="text-primary mx-auto block">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="py-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                  <p className="text-muted-foreground">
                    We ship to all locations within the United States and to select international destinations. Standard shipping takes 3-5 business days, while express shipping delivers your order in 1-2 business days.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Returns & Refunds</h3>
                  <p className="text-muted-foreground">
                    If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. Items must be unused and in their original packaging. Please note that shipping costs are non-refundable.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
