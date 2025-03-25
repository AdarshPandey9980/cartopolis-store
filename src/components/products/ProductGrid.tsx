
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

type SortOption = "featured" | "price-low" | "price-high" | "newest";

const ProductGrid = ({ products, title, subtitle }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories from products
  const categories = ["all", ...new Set(products.map(product => product.category))];

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return parseInt(b.id) - parseInt(a.id); // Assuming newer products have higher IDs
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center space-y-2 mb-8">
          {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
          {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={`md:block ${showFilters ? 'block' : 'hidden'} md:mb-0 mb-4`}>
        <ScrollArea className="w-full whitespace-nowrap">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex w-full justify-start">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setSortBy("featured");
            }}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
