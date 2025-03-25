
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  inStock: boolean;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real app, this would dispatch to a state manager
    // For now, we'll just use localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: { id: string }) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    toast("Added to cart", {
      description: `${product.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => {
          window.location.href = "/cart";
        },
      },
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: isFavorite 
        ? `${product.name} has been removed from your favorites.`
        : `${product.name} has been added to your favorites.`,
    });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        "group relative flex flex-col rounded-lg overflow-hidden bg-white border border-border transition-all duration-300",
        isHovered && "shadow-lg transform -translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        {product.featured && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full"
          onClick={handleToggleFavorite}
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            )} 
          />
        </Button>
        
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            "image-fade-in",
            imageLoaded && "loaded",
            isHovered && "scale-105"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
        />
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground mt-1 line-clamp-1">
            {product.name}
          </h3>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
          
          <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary rounded-full p-0 w-8 h-8"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
        
        {!product.inStock && (
          <p className="text-xs text-destructive mt-2">Out of stock</p>
        )}
      </div>
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 transform translate-y-full transition-transform",
          isHovered && "translate-y-0"
        )}
      >
        <span className="text-sm font-medium">View Details</span>
      </div>
    </Link>
  );
};

export default ProductCard;
