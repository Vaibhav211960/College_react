import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CATEGORIES, REVIEWS } from "@/lib/mockData";
import { FeatureBox } from "@/components/ui/feature-box";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Truck, Award, PenTool, ShieldCheck, Star } from "lucide-react";
import heroImage from "@assets/generated_images/elegant_living_room_with_hardwood_flooring.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={heroImage} 
          alt="Modern living room with hardwood flooring" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl px-4 animate-in fade-in zoom-in duration-1000">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Elevate Your Space
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Discover our premium collection of flooring solutions designed to bring timeless elegance and durability to your home.
          </p>
          <a href="#categories">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 border-none text-lg px-8 py-6 h-auto">
              Explore Flooring Options
            </Button>
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 container scroll-mt-16">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-medium mb-4 text-primary">Our Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our carefully curated categories to find the perfect foundation for your interior design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.id}`}>
              <div className="group cursor-pointer flex flex-col h-full">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 shadow-sm">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us / About */}
      <section id="about" className="py-20 bg-secondary/30 scroll-mt-16">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-primary">Why Choose Inscape Floors</h2>
            <div className="h-1 w-20 bg-primary/20 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureBox 
              icon={Award} 
              title="Premium Materials" 
              description="Sourced from the finest manufacturers worldwide to ensure lasting quality."
            />
            <FeatureBox 
              icon={ShieldCheck} 
              title="Affordable Pricing" 
              description="Direct-to-consumer pricing without compromising on quality or style."
            />
            <FeatureBox 
              icon={PenTool} 
              title="Installation Support" 
              description="Expert guidance and professional installation services available."
            />
            <FeatureBox 
              icon={Truck} 
              title="Nationwide Delivery" 
              description="Fast and secure shipping to anywhere in the country."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-primary">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-card p-8 rounded-xl shadow-sm border relative">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{review.text}"</p>
              <div className="font-medium font-serif text-lg">{review.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
            Contact us today for a free consultation and quote. Our experts are here to help you choose the perfect flooring.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button size="lg" variant="secondary" className="text-lg px-8">
               Get a Quote
             </Button>
             <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground">
               Contact Support
             </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
