import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Send, Globe, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    request: "",
    isPrivate: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle prayer request submission
    toast({
      title: "Prayer Request Submitted",
      description: "Your prayer request has been received. Our prayer team will intercede for you.",
    });
    setFormData({ name: "", email: "", location: "", request: "", isPrivate: false });
  };

  return (
    <section id="prayer" className="py-20 bg-gradient-spiritual">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-divine-gold/10 backdrop-blur-sm border border-divine-gold/20 rounded-full px-6 py-2 mb-6">
              <Heart className="w-4 h-4 text-divine-gold" />
              <span className="font-content text-divine-gold text-sm">Global Prayer Chain</span>
            </div>
            
            <h2 className="font-ministry text-4xl md:text-5xl font-bold text-white mb-4">
              Submit Your Prayer Request
            </h2>
            <p className="font-content text-lg text-white/90 max-w-2xl mx-auto">
              Join our global prayer network. Your request will be prayed for by believers 
              across all our locations worldwide.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Prayer Request Form */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-divine">
              <CardHeader>
                <CardTitle className="font-ministry text-2xl text-prayer-blue flex items-center gap-3">
                  <Send className="w-6 h-6 text-divine-gold" />
                  Prayer Request Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="font-content text-sm font-medium text-foreground mb-2 block">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="font-content"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-content text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-content"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="font-content text-sm font-medium text-foreground mb-2 block">
                      Your Location
                    </label>
                    <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your nearest branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-york">New York, USA</SelectItem>
                        <SelectItem value="lagos">Ikorodu, Lagos, Nigeria</SelectItem>
                        <SelectItem value="akure">Akure, Nigeria (HQ)</SelectItem>
                        <SelectItem value="other">Other Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prayer Request */}
                  <div>
                    <label className="font-content text-sm font-medium text-foreground mb-2 block">
                      Prayer Request
                    </label>
                    <Textarea
                      placeholder="Share your prayer request with us..."
                      value={formData.request}
                      onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                      className="font-content min-h-32"
                      required
                    />
                  </div>

                  {/* Privacy Option */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="private"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                      className="w-4 h-4 text-prayer-blue"
                    />
                    <label htmlFor="private" className="font-content text-sm text-foreground flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Keep this prayer request private
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="divine" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Prayer Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Prayer Guidelines */}
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="font-ministry text-xl text-white flex items-center gap-3">
                    <Globe className="w-5 h-5 text-divine-gold" />
                    Global Prayer Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-4">
                  <p className="font-content text-sm">
                    Your prayer request will be shared with our prayer teams across:
                  </p>
                  <ul className="font-content text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-divine-gold rounded-full" />
                      New York Branch Prayer Team
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-divine-gold rounded-full" />
                      Ikorodu, Lagos Prayer Warriors
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-divine-gold rounded-full" />
                      Akure Headquarters Intercessors
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="font-ministry text-xl text-white flex items-center gap-3">
                    <Heart className="w-5 h-5 text-divine-gold" />
                    Prayer Times
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/90 space-y-3">
                  <div>
                    <p className="font-content text-sm font-semibold">Daily Prayer Hours:</p>
                    <p className="font-content text-sm">5:00 AM - 6:00 AM (All Locations)</p>
                    <p className="font-content text-sm">9:00 PM - 10:00 PM (All Locations)</p>
                  </div>
                  <div>
                    <p className="font-content text-sm font-semibold">Special Prayer Meetings:</p>
                    <p className="font-content text-sm">Wednesday 7:00 PM (New York)</p>
                    <p className="font-content text-sm">Tuesday & Thursday 6:00 PM (Lagos)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-divine-gold/10 backdrop-blur-sm border-divine-gold/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Heart className="w-12 h-12 text-divine-gold mx-auto mb-4" />
                    <p className="font-ministry text-lg text-white mb-2">
                      "The prayer of a righteous person is powerful and effective."
                    </p>
                    <p className="font-content text-sm text-white/80">James 5:16</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerRequest;