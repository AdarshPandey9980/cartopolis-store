
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, Truck, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/products/ProductCard";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";
import MOCK_PRODUCTS from "@/data/mockProducts";

const Index = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch from API
    setFeaturedProducts(MOCK_PRODUCTS.filter(product => product.featured).slice(0, 4));
  }, []);

  const features = [
    {
      icon: ShoppingBag,
      title: "Premium Selection",
      description: "Carefully curated products of exceptional quality",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free worldwide shipping on all orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "100% secure payment and data protection",
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-day money-back guarantee policy",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            heroLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Hero Background" 
            className="hidden" 
            onLoad={() => setHeroLoaded(true)}
          />
        </div>
        
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-xl space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h4 className="text-primary bg-white/10 backdrop-blur-md w-fit px-4 py-1 rounded-full text-sm font-medium">
                New Season Collection
              </h4>
              <h1 className="text-5xl sm:text-6xl font-bold text-white text-balance">
                Discover Your Perfect Style
              </h1>
              <p className="text-lg text-white/80 max-w-md">
                Explore our latest collection of premium products, designed for the modern lifestyle.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/products")}
                className="bg-white text-primary hover:bg-white/90 rounded-full"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/about")}
                className="text-white border-white hover:bg-white/10 rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">
                Discover our most popular items
              </p>
            </div>
            <Button 
              variant="link" 
              onClick={() => navigate("/products")}
              className="text-primary font-medium mt-4 md:mt-0"
            >
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Shop With Us</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              We're committed to providing the best shopping experience possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 max-w-2xl mx-auto text-balance">
            Join Our Community of Satisfied Customers
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Sign up now and get 10% off your first order, plus exclusive access to new arrivals and promotions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto rounded-full"
            >
              Create Account
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto text-white border-white hover:bg-white/10 rounded-full"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
