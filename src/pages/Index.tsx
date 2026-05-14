import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, BookOpen, Heart, Users, HandHeart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LiveStreamSection from "@/components/LiveStreamSection";
import { LIVE_STREAM_CONFIG } from "@/lib/youtube";

const Index = () => {
  // In production, this would come from an API or real-time check
  const [isLive] = useState(LIVE_STREAM_CONFIG.isLive);

  const quickLinks = [
    {
      icon: MapPin,
      title: "Find a Location",
      description: "Visit us in New York, Lagos, or Akure",
      link: "/locations"
    },
    {
      icon: Calendar,
      title: "Upcoming Events",
      description: "Join our prayer meetings and conventions",
      link: "/events"
    },
    {
      icon: BookOpen,
      title: "Watch Sermons",
      description: "Inspiring messages from our pastors",
      link: "/sermons"
    },
    {
      icon: Heart,
      title: "Request Prayer",
      description: "Submit to our 24/7 prayer chain",
      link: "/prayer"
    },
    {
      icon: Users,
      title: "Our Leadership",
      description: "Meet our pastoral team",
      link: "/leadership"
    },
    {
      icon: HandHeart,
      title: "Give Online",
      description: "Support our global ministry",
      link: "/giving"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Fountain of Light Prayer Ministry International - Global Prayer & Faith Community</title>
        <meta name="description" content="Join our global prayer ministry with locations in New York, Lagos, and Akure. Experience divine connection through prayer, worship, and community fellowship." />
        <meta name="keywords" content="prayer ministry, international church, Fountain of Light, Nigeria church, New York church, prayer, faith, worship" />
      </Helmet>
      
      <Header isLive={isLive} />
      
      <main>
        <Hero isLive={isLive} />
        
        {/* Live Stream / Video Section */}
        <LiveStreamSection isLive={isLive} />
        
        {/* Quick Access Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-medium text-primary">Get Connected</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                How Can We Serve You?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the many ways you can connect with our global ministry family
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={item.link}>
                    <Card className="h-full border-0 shadow-md card-hover group cursor-pointer overflow-hidden">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-divine-gold group-hover:text-primary transition-colors">
                          Learn more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement / About Section */}
        <section className="section-padding bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-divine-gold rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Our Mission is to
                  <span className="text-divine-gold block mt-2">Illuminate Lives</span>
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  Through prayer, faith, and divine connection, we are building a global community 
                  of believers committed to spreading God's light across nations. From New York to 
                  Lagos to Akure, we are one family united in purpose.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/about">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8"
                    >
                      Learn Our Story
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/giving">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                    >
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Times Section */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Join Us for Worship
              </h2>
              <p className="text-lg text-muted-foreground">
                Service times across our global locations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  location: "New York, USA",
                  flag: "🇺🇸",
                  times: [
                    { day: "Sunday", time: "10:00 AM EST" },
                    { day: "Wednesday", time: "7:00 PM EST" },
                  ]
                },
                {
                  location: "Lagos, Nigeria",
                  flag: "🇳🇬",
                  times: [
                    { day: "Sunday", time: "9:00 AM WAT" },
                    { day: "Friday", time: "6:00 PM WAT" },
                  ]
                },
                {
                  location: "Akure, Nigeria (HQ)",
                  flag: "🇳🇬",
                  times: [
                    { day: "Sunday", time: "8:00 AM WAT" },
                    { day: "Daily Prayer", time: "5:00 AM WAT" },
                  ]
                },
              ].map((branch, index) => (
                <motion.div
                  key={branch.location}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-md text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{branch.flag}</div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        {branch.location}
                      </h3>
                      <div className="space-y-2">
                        {branch.times.map((service) => (
                          <div key={service.day} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{service.day}</span>
                            <span className="font-medium text-divine-gold">{service.time}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/locations" className="block mt-4">
                        <Button variant="outline" size="sm" className="w-full rounded-full">
                          Get Directions
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
