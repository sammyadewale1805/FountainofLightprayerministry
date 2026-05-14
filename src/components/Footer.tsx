import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Youtube, Facebook, Instagram, Twitter, Send, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ministryLogo from "@/assets/ministry-logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In production, this would call an API
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Sermons", path: "/sermons" },
    { label: "Events", path: "/events" },
    { label: "Locations", path: "/locations" },
    { label: "Contact", path: "/contact" },
  ];

  const ministryLinks = [
    { label: "Prayer Request", path: "/prayer" },
    { label: "Give Online", path: "/giving" },
    { label: "Leadership", path: "/leadership" },
    { label: "Watch Live", path: "/#live-stream" },
  ];

  const socialLinks = [
    { icon: Youtube, href: "https://youtube.com/@FountainOfLightMinistry", label: "YouTube" },
    { icon: Facebook, href: "https://facebook.com/FountainOfLightMinistry", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/folpministry", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/folpministry", label: "Twitter" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-white/80">Get updates on services, events, and inspiring messages</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-5 min-w-[250px]"
                required
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
                {!isSubscribed && <Send className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src={ministryLogo} 
                alt="Fountain of Light" 
                className="w-14 h-14 rounded-full ring-2 ring-divine-gold/30"
              />
              <div>
                <h3 className="font-bold text-lg text-divine-gold">Fountain of Light</h3>
                <p className="text-sm text-white/70">Prayer Ministry Int'l</p>
              </div>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Illuminating lives through prayer, faith, and divine connection across 
              New York, Lagos, and Akure.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-divine-gold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-divine-gold transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry */}
          <div>
            <h4 className="font-semibold text-divine-gold mb-5">Ministry</h4>
            <ul className="space-y-3">
              {ministryLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-divine-gold transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-divine-gold mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-divine-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Headquarters</p>
                  <p className="text-white/70 text-sm">Akure, Ondo State, Nigeria</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-divine-gold shrink-0" />
                <div>
                  <p className="text-sm">Akure HQ: +234 803 810 8585</p>
                  <p className="text-sm text-white/70">Lagos: +234 803 478 8324</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-divine-gold shrink-0" />
                <a href="mailto:info@fountainoflight.org" className="text-sm hover:text-divine-gold transition-colors">
                  info@fountainoflight.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Fountain of Light Prayer Ministry International. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-divine-gold fill-divine-gold" />
              <span>for His glory</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
