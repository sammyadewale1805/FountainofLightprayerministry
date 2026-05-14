import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventsCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: "global-001",
      title: "Annual International Convention 2025",
      type: "global",
      category: "Conference",
      location: "Akure Headquarters",
      date: "August 2025",
      endDate: "August 2025",
      duration: "7: days",
      description: "7 days of powerful worship, teaching, and fellowship with believers from around the world.",
      attendees: "500+ Expected",
      isVirtual: false,
      isHighlight: true
    },
    {
      id: "lg-001",
      title: "Youth & Student Fellowship Conference",
      type: "local",
      category: "Youth Ministry",
      location: "Ikorodu, Lagos Branch",
      date: "Nov 2025",
      endDate: "Nov 2025",
      time: "12:00 PM WAT",
      description: "One-day conference empowering young people with purpose and practical ministry skills.",
      attendees: "300+ Students",
      isVirtual: false,
      isHighlight: true
    },
    {
      id: "ny-001",
      title: "Thanksgiving Community Outreach",
      type: "local",
      category: "Community Service",
      location: "New York Branch",
      date: "2024-11-24",
      time: "10:00 AM EST",
      description: "Annual Thanksgiving meal service for the local Manhattan community.",
      attendees: "200+ Volunteers",
      isVirtual: false,
      isHighlight: false
    },
    
    { 
      id: "global-002", 
      title: "Global Prayer Chain", 
      type: "global", 
      category: "Prayer", 
      location: "All Locations", 
      date: "Everyday",  // ✅ Just keep it descriptive
      time: "2 Hours", 
      description: "2-hour prayer coverage across all time zones focusing on global missions.", 
      attendees: "Global Participation", 
      isVirtual: true, 
      isHighlight: false 
    },

    {
      id: "hq-001",
      title: "Leadership Training & Ordination",
      type: "ministry",
      category: "Leadership",
      location: "Akure Headquarters",
      date: "08/12/2025",
      time: "8:00 AM WAT",
      description: "Intensive training for ministry leaders and pastoral ordination ceremony.",
      attendees: "Invitation Only",
      isVirtual: false,
      isHighlight: false
    },
    {
      id: "global-003",
      title: "International Women's Ministry Conference",
      type: "global",
      category: "Women's Ministry",
      location: "Virtual + All Locations",
      date: "08/12/2025",
      time: "Various Times",
      description: "Empowering women worldwide through biblical teaching and fellowship.",
      attendees: "Women Worldwide",
      isVirtual: true,
      isHighlight: false
    }
  ];

  const categories = [
    { code: "all", name: "All Events" },
    { code: "global", name: "Global" },
    { code: "local", name: "Local" },
    { code: "ministry", name: "Ministry" }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.type === selectedCategory);

  const formatDate = (dateStr, endDateStr) => {
    const date = new Date(dateStr);
    const formatted = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    if (endDateStr) {
      const endDate = new Date(endDateStr);
      const endFormatted = endDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
      return `${formatted} - ${endFormatted}`;
    }
    
    return formatted;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for transformative events and conferences across all locations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category.code}
              variant={selectedCategory === category.code ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.code)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
                event.isHighlight ? 'border-blue-200 bg-blue-50/50' : 'bg-white'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Date Section */}
                  <div className="flex-shrink-0">
                    <div className="text-center bg-white rounded-lg p-3 shadow-sm border min-w-[100px]">
                      <div className="text-sm font-medium text-blue-600 uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                      {event.isVirtual && (
                        <Badge variant="outline" className="text-xs">
                          Virtual
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.attendees}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button className="w-full md:w-auto">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;