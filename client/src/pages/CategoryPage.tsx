import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRoute, Link } from "wouter";
import { CATEGORIES, PRODUCTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:category");
  
  if (!match) return null;
  
  const categoryId = params.category;
  const category = CATEGORIES.find(c => c.id === categoryId);
  const products = PRODUCTS.filter(p => p.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-secondary/30 py-12">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="mb-6 pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
            </Button>
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">{category.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="container py-12 flex-1">
        {/* Subcategories Filter Mock */}
        <div className="flex flex-wrap gap-2 mb-12">
          <Button variant="default" size="sm" className="rounded-full">All</Button>
          {category.subcategories.map(sub => (
            <Button key={sub} variant="outline" size="sm" className="rounded-full bg-transparent">
              {sub}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="group bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full bg-white text-black hover:bg-white/90">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">{product.subcategory}</div>
                  <h3 className="font-serif text-xl font-medium mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-medium text-lg">${product.price.toFixed(2)} <span className="text-sm text-muted-foreground font-normal">/ sq.ft</span></span>
                    <Button size="icon" variant="ghost">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>More products coming soon to this category.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
