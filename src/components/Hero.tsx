import { MapPin, Clock, Play, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// Church images - Make sure these are high-resolution images
import heroConference from "@/assets/flpmi5.jpg";
import heroTent from "@/assets/PHOTO-2026-03-19-18-43-58.jpg";
import heroPrayer from "@/assets/flpmi6.jpg";
import heroMinistry from "@/assets/flpmi4.jpg";

interface HeroProps {
  isLive?: boolean;
}

const Hero = ({ isLive = false }: HeroProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Hero images with Ken Burns animation directions
  const slides = [
    {
      image: heroConference,
      alt: "Global conference worship",
      animation: "zoomIn",
      focusPoint: { x: 50, y: 30 }
    },
    {
      image: heroPrayer,
      alt: "Prayer meeting",
      animation: "panRight",
      focusPoint: { x: 40, y: 50 }
    },
    {
      image: heroTent,
      alt: "Prayer meeting",
      animation: "panRight",
      focusPoint: { x: 40, y: 50 }
    },
    {
      image: heroMinistry,
      alt: "Ministry service",
      animation: "zoomOut",
      focusPoint: { x: 50, y: 40 }
    },
  ];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Preload images and check if they're loaded
  useEffect(() => {
    const imagePromises = slides.map((slide, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(index));
          resolve(true);
        };
        img.onerror = () => resolve(false);
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('live-stream');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ken Burns animation variants with hardware acceleration
  const getAnimationStyle = (animation: string, isActive: boolean, focusPoint?: { x: number, y: number }) => {
    if (!isActive) return {};
    
    // Reduced scale range for better sharpness
    switch (animation) {
      case "zoomIn":
        return {
          initial: { scale: 1, x: 0, y: 0 },
          animate: { scale: 1.05, x: 0, y: 0 }, // Reduced from 1.08 to 1.05
        };
      case "zoomOut":
        return {
          initial: { scale: 1.05, x: 0, y: 0 },
          animate: { scale: 1, x: 0, y: 0 },
        };
      case "panRight":
        return {
          initial: { scale: 1.03, x: "-2%", y: 0 }, // Reduced scale
          animate: { scale: 1.03, x: "2%", y: 0 },
        };
      case "panLeft":
        return {
          initial: { scale: 1.03, x: "2%", y: 0 },
          animate: { scale: 1.03, x: "-2%", y: 0 },
        };
      default:
        return {
          initial: { scale: 1 },
          animate: { scale: 1.03 },
        };
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Loading State - Optional: Show a gradient while images load */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-prayer-blue to-divine-gold/80" />
      )}

      {/* Animated Image Background with Ken Burns Effect */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = currentSlide === index;
          const animStyle = getAnimationStyle(slide.animation, isActive, slide.focusPoint);
          const isThisImageLoaded = loadedImages.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isActive && isThisImageLoaded ? 1 : 0 
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
              // Force hardware acceleration
              style={{ 
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              <motion.img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full"
                style={{
                  // Use object-fit cover with custom positioning
                  objectFit: "cover",
                  objectPosition: slide.focusPoint 
                    ? `${slide.focusPoint.x}% ${slide.focusPoint.y}%` 
                    : '50% 50%',
                  // Force hardware acceleration and improve rendering
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: 1000,
                  imageRendering: "-webkit-optimize-contrast", // Improve sharpness in WebKit browsers
                }}
                initial={animStyle.initial}
                animate={isActive ? animStyle.animate : animStyle.initial}
                transition={{ 
                  duration: 12, // Slower animation = less motion blur
                  ease: "easeOut", // Ease out for smoother stops
                }}
                // Ensure image is loaded before showing
                onLoad={() => console.log(`Image ${index} loaded`)}
              />
            </motion.div>
          );
        })}
        
        {/* Gradient Overlay - This helps blend any potential pixelation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-prayer-blue/30 via-transparent to-divine-gold/20" />
        
        {/* Optional: Subtle noise texture to mask any imperfections */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
          <div className="w-full h-full bg-repeat" style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "100px 100px"
          }} />
        </div>
      </div>

      {/* Live Indicator */}
      <AnimatePresence>
        {isLive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 z-20"
          >
            <button
              onClick={scrollToContent}
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="font-semibold">We're Live Now — Watch Service</span>
              <Play className="w-4 h-4" fill="currentColor" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-divine-gold rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Welcome to Our Global Ministry</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Fountain of Light
            <span className="block text-divine-gold mt-2">Prayer Ministry</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Illuminating lives through prayer, faith, and divine connection. 
            Join our global community of believers across three continents.
          </motion.p>

          {/* Location Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              "New York, USA",
              "Lagos, Nigeria",
              "Akure, Nigeria (HQ)"
            ].map((location) => (
              <div 
                key={location}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
              >
                <MapPin className="w-4 h-4 text-divine-gold" />
                <span className="text-white/90 text-sm">{location}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => navigate("/about")}
            >
              Learn About Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg backdrop-blur-sm transition-all hover:scale-105"
              onClick={() => navigate("/prayer")}
            >
              Request Prayer
            </Button>
          </motion.div>

          {/* Next Service Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4"
          >
            <div className="p-2 bg-divine-gold/20 rounded-full">
              <Clock className="w-5 h-5 text-divine-gold" />
            </div>
            <div className="text-left">
              <p className="text-white/70 text-sm">Next Service</p>
              <p className="text-white font-semibold">Sunday 10:00 AM EST</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;