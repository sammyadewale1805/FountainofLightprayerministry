import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Home, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Page Not Found - Fountain of Light Prayer Ministry</title>
        <meta name="description" content="The page you're looking for could not be found. Return to our homepage to continue your spiritual journey with us." />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen flex items-center justify-center bg-gradient-spiritual pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Divine Light Animation */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-divine-gold/20 rounded-full blur-3xl mx-auto animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-16 h-16 text-divine-gold" />
              </div>
            </div>
            
            {/* Error Message */}
            <h1 className="font-ministry text-6xl md:text-8xl font-bold text-white mb-6">
              404
            </h1>
            <h2 className="font-ministry text-2xl md:text-3xl font-semibold text-divine-gold mb-4">
              Page Not Found
            </h2>
            <p className="font-content text-lg text-white/90 mb-8 leading-relaxed">
              The page you're seeking seems to have wandered from our path. 
              Let us guide you back to the light and continue your spiritual journey with us.
            </p>
            
            {/* Navigation Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button variant="divine" size="lg" className="min-w-48">
                  <Home className="w-5 h-5 mr-2" />
                  Return Home
                </Button>
              </Link>
              <Link to="/prayer">
                <Button variant="ministry" size="lg" className="min-w-48">
                  <Heart className="w-5 h-5 mr-2" />
                  Submit Prayer Request
                </Button>
              </Link>
            </div>
            
            {/* Scripture Verse */}
            <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <p className="font-ministry text-lg text-white mb-2">
                "Your word is a lamp for my feet, a light on my path."
              </p>
              <p className="font-content text-sm text-white/80">Psalm 119:105</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
