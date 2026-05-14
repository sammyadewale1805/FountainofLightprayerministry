import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Radio } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ministryLogo from "@/assets/ministry-logo.png";

interface HeaderProps {
  isLive?: boolean;
}

const Header = ({ isLive = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/sermons", label: "Sermons" },
    { path: "/bible-study", label: "Bible Plans" },
    { path: "/events", label: "Events" },
    { path: "/locations", label: "Locations" },
    { path: "/giving", label: "Give" },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100"
      >
        {/* Live Banner */}
        <AnimatePresence>
          {isLive && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-600 text-white overflow-hidden"
            >
              <Link 
                to="/#live-stream" 
                className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="font-semibold text-sm">LIVE NOW</span>
                <span className="text-sm text-white/90">— Join us for Sunday Service</span>
                <Radio className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src={ministryLogo} 
                alt="Fountain of Light Prayer Ministry" 
                className="w-12 h-12 rounded-full shadow-lg ring-2 ring-gray-100"
              />
              <div className="hidden sm:block">
                <h1 className="font-ministry text-lg font-bold leading-tight text-slate-800">
                  Fountain of Light
                </h1>
                <p className="text-xs text-gray-500">
                  Prayer Ministry International
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive(link.path) 
                  ? "text-primary bg-primary/5" 
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Live Indicator (Desktop) */}
              {isLive && (
                <Link 
                  to="/#live-stream"
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors ml-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  LIVE
                </Link>
              )}
              
              <Link to="/contact" className="ml-4">
                <Button 
                  className="rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              {isLive && (
                <Link 
                  to="/#live-stream"
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white rounded-full text-xs font-medium"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  LIVE
                </Link>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-slate-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        to={link.path} 
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive(link.path) 
                            ? "text-primary bg-primary/5" 
                            : "text-foreground hover:text-primary hover:bg-muted"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-2 mt-2 border-t border-gray-100"
                  >
                    <Link 
                      to="/prayer" 
                      className="block px-4 py-3 rounded-xl text-base font-medium text-divine-gold hover:bg-accent/10 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Request Prayer
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.05 }}
                    className="pt-4"
                  >
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold">
                        Contact Us
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;
