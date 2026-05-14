import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll respond within 24 hours.",
    });
    setFormData({ name: "", email: "", location: "", subject: "", message: "" });
  };

  const locations = [
    {
      name: "Headquarters - Akure",
      country: "Nigeria",
      address: "Akure, Ondo State, Nigeria",
      phone: "+234 803 810 8585",
      email: "headquarters@fountainoflight.org",
      services: "Sunday: 7:00 AM & 5:00 PM WAT",
      prayer: "Daily: 5:00 AM & 9:00 PM WAT"
    },
    {
      name: "New York Branch",
      country: "United States",
      address: "546 Liberty Avenue, Brooklyn, NY 11207",
      phone: "+1 718 812 9816",
      email: "newyork@fountainoflight.org",
      services: "Sunday: 10:00 AM & 6:00 PM EST",
      prayer: "Wednesday: 7:00 PM EST"
    },
    {
      name: "Ikorodu, Lagos Branch",
      country: "Nigeria",
      address: "Ikorodu, Lagos State, Nigeria",
      phone: "+234 803 478 8324",
      email: "lagos@fountainoflight.org",
      services: "Sunday: 9:00 AM WAT",
      prayer: "Thursday: 8:00 AM - 10:00 AM WAT"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Get in touch with Fountain of Light Prayer Ministry International. Contact our branches in New York, Lagos, and Akure." />
      </Helmet>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-divine py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-ministry text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Our Global Ministry
            </h1>
            <p className="font-content text-xl text-white/90 max-w-2xl mx-auto">
              Reach out to any of our international branches. We're here to serve and pray with you.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-prayer">
                <CardHeader>
                  <CardTitle className="font-ministry text-2xl text-prayer-blue">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Branch</label>
                        <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="headquarters">Akure Headquarters</SelectItem>
                            <SelectItem value="newyork">New York Branch</SelectItem>
                            <SelectItem value="ikorodu">Ikorodu Branch</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          placeholder="Brief subject"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" variant="divine" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Contact Info */}
              <div className="space-y-6">
                <Card className="shadow-prayer">
                  <CardHeader>
                    <CardTitle className="font-ministry text-xl text-prayer-blue flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Global Ministry Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-divine-gold mt-1" />
                      <div>
                        <p className="font-medium">General Email</p>
                        <p className="text-muted-foreground">info@fountainoflight.org</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-divine-gold mt-1" />
                      <div>
                        <p className="font-medium">24/7 Prayer Line</p>
                        <p className="text-muted-foreground">+234 803 810 8585 (Akure HQ)</p>
                        <p className="text-muted-foreground">+234 803 478 8324 (Lagos)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-prayer">
                  <CardHeader>
                    <CardTitle className="font-ministry text-xl text-prayer-blue flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Emergency Prayer Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Need urgent prayer? Our global prayer chain is available 24/7 across all time zones.
                    </p>
                    <Button variant="outline" className="w-full">
                      Request Emergency Prayer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-ministry text-3xl font-bold text-prayer-blue mb-4">
                Visit Our Locations
              </h2>
              <p className="font-content text-muted-foreground max-w-2xl mx-auto">
                Find the branch nearest to you and join our global family in worship and fellowship.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <Card key={index} className={`shadow-prayer transition-all duration-300 hover:shadow-prayer-lg ${index === 0 ? 'ring-2 ring-divine-gold' : ''}`}>
                  <CardHeader>
                    <CardTitle className="font-ministry text-xl text-prayer-blue flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-divine-gold" />
                      {location.name}
                      {index === 0 && <span className="text-xs bg-divine-gold text-white px-2 py-1 rounded">HQ</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground">{location.address}</p>
                      <p className="text-sm text-muted-foreground">{location.country}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-divine-gold" />
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-divine-gold" />
                        <span>{location.email}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm font-medium text-prayer-blue mb-1">Service Times</p>
                      <p className="text-sm text-muted-foreground">{location.services}</p>
                      <p className="text-sm font-medium text-prayer-blue mt-2 mb-1">Prayer Meetings</p>
                      <p className="text-sm text-muted-foreground">{location.prayer}</p>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;