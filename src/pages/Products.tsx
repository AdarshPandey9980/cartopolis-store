
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProductGrid from "@/components/products/ProductGrid";
import { Product } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import MOCK_PRODUCTS from "@/data/mockProducts";

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Parse category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.search]);

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesCategory && matchesPrice;
  });

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  return (
    <MainLayout>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold">Shop All Products</h1>
            <p className="text-muted-foreground mt-2">
              Discover our collection of premium products
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden animate-pulse">
                  <div className="bg-secondary aspect-square" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-6 bg-secondary rounded w-1/2" />
                    <div className="h-4 bg-secondary rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
                <div className="flex items-center justify-between mb-6 py-2 px-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">Active filters:</span>
                    {selectedCategories.map(category => (
                      <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {category}
                      </span>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    <FilterX className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}

              <ProductGrid 
                products={filteredProducts} 
              />
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Products;
