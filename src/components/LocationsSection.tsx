import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Globe } from "lucide-react";

const LocationsSection = () => {
  const locations = [
    {
      id: "new-york",
      name: "New York Branch",
      country: "United States",
      flag: "🇺🇸",
      address: "546 Liberty Avenue, brooklyn, NY 11207",
      phone: "+1 7188129816",
      timezone: "EST",
      services: {
        sunday: "10:00 AM",
        prayer: "Wednesday 7:30 PM"
      },
      pastor: "Pastor Durojaiye and funmi olorunlana",
      ministries: ["Youth Outreach", "Community Service", "Bible Study"],
      currency: "USD",
      isHeadquarters: true
    },
    {
      id: "lagos",
      name: "Ikorodu, Lagos Branch",
      country: "Nigeria",
      flag: "🇳🇬",
      address: "Ikorodu, Lagos State, Nigeria",
      phone: "+234 803 478 8324",
      timezone: "WAT",
      services: {
        sunday: "9:00 AM",
        prayer: "Thursday 8:00 am - 10:00 am"
      },
      pastor: "Pastor Ayokunle Ashogbon",
      ministries: ["Market Evangelism", "Student Fellowship", "impartation service"],
      currency: "NGN",
      isHeadquarters: false
    },
    {
      id: "akure",
      name: "Akure Headquarters",
      country: "Nigeria",
      flag: "🇳🇬",
      address: "Akure, Ondo State, Nigeria",
      phone: "+234 803 810 8585",
      timezone: "WAT",
      services: {
        sunday: "8:00 AM",
        prayer: "Friday 6:00 PM - 8:00 PM"
      },
      pastor: "pastor ajetunmobi joshua",
      ministries: ["Leadership Training", "Annual Conventions", "Missions"],
      currency: "NGN",
      isHeadquarters: false
    }
  ];

  return (
    <section id="locations" className="py-20 bg-gradient-holy">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-ministry text-4xl md:text-5xl font-bold text-prayer-blue mb-4">
            Our Global Presence
          </h2>
          <p className="font-content text-lg text-muted-foreground max-w-3xl mx-auto">
            Serving communities across three strategic locations, bringing the light of prayer 
            and fellowship to believers worldwide.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {locations.map((location) => (
            <Card 
              key={location.id} 
              className={`relative overflow-hidden shadow-prayer hover:shadow-divine transition-all duration-300 hover:-translate-y-2 ${
                location.isHeadquarters 
                  ? 'ring-2 ring-divine-gold bg-gradient-to-br from-holy-light to-white' 
                  : 'bg-white'
              }`}
            >
              {location.isHeadquarters && (
                <div className="absolute top-4 right-4 bg-divine-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Headquarters
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{location.flag}</span>
                  <div>
                    <CardTitle className="font-ministry text-xl text-prayer-blue">
                      {location.name}
                    </CardTitle>
                    <p className="font-content text-sm text-muted-foreground">
                      {location.country}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-divine-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-content text-sm text-foreground">
                      {location.address}
                    </p>
                    <p className="font-content text-xs text-muted-foreground">
                      {location.phone}
                    </p>
                  </div>
                </div>

                {/* Service Times */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-prayer-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-content text-sm text-foreground mb-1">
                      <span className="font-semibold">Sunday Services:</span> {location.services.sunday} {location.timezone}
                    </p>
                    <p className="font-content text-sm text-foreground">
                      <span className="font-semibold">Prayer Meeting:</span> {location.services.prayer} {location.timezone}
                    </p>
                  </div>
                </div>

                {/* Pastor */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-prayer-blue rounded-full mt-0.5 flex-shrink-0" />
                  <p className="font-content text-sm text-foreground">
                    <span className="font-semibold">Pastor:</span> {location.pastor}
                  </p>
                </div>

                {/* Ministries */}
                <div className="pt-2">
                  <p className="font-content text-xs text-muted-foreground mb-2">Key Ministries:</p>
                  <div className="flex flex-wrap gap-1">
                    {location.ministries.map((ministry, index) => (
                      <span 
                        key={index}
                        className="bg-holy-light text-prayer-blue px-2 py-1 rounded-full text-xs font-content"
                      >
                        {ministry}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="prayer" size="sm" className="flex-1">
                    Contact
                  </Button>
                  <Button variant="holy" size="sm" className="flex-1">
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Ministry Stats */}
        <div className="bg-white rounded-xl shadow-prayer p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Globe className="w-8 h-8 text-divine-gold mx-auto mb-2" />
              <h3 className="font-ministry text-2xl font-bold text-prayer-blue">3</h3>
              <p className="font-content text-sm text-muted-foreground">Countries</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-divine-gold mx-auto mb-2" />
              <h3 className="font-ministry text-2xl font-bold text-prayer-blue">3</h3>
              <p className="font-content text-sm text-muted-foreground">Locations</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-divine-gold mx-auto mb-2" />
              <h3 className="font-ministry text-2xl font-bold text-prayer-blue">15+</h3>
              <p className="font-content text-sm text-muted-foreground">Weekly Services</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-divine-gold rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white text-sm font-bold">∞</span>
              </div>
              <h3 className="font-ministry text-2xl font-bold text-prayer-blue">24/7</h3>
              <p className="font-content text-sm text-muted-foreground">Prayer Coverage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;