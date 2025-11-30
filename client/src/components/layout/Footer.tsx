import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Inscape Floors</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Bringing premium quality flooring solutions to your doorstep. 
              Elegant, durable, and affordable.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#categories" className="hover:text-white transition-colors">Categories</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">My Account</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Design District, Floor City, FC 90210</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@inscapefloors.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Inscape Floors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
