import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import LocationsSection from "@/components/LocationsSection";
import LocationsMap from "@/components/LocationsMap";
import Footer from "@/components/Footer";

const Locations = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Our Locations - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Find our ministry locations across New York USA, Lagos Nigeria, and our headquarters in Akure, Ondo State." />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Interactive Map Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-ministry text-3xl md:text-4xl font-bold text-prayer-blue mb-4">
                Find Us Worldwide
              </h2>
              <p className="font-content text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our global ministry locations with our interactive map. 
                Click on markers to view detailed information about each branch.
              </p>
            </div>
            <LocationsMap />
          </div>
        </section>
        
        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Locations;