import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, MapPin, Mail, Phone, Users, Globe } from "lucide-react";

const LeadershipSection = () => {
  const leadership = [
    {
      id: "general-overseer",
      name: "Pastor Durojaiye and Funmi Olorunlana",
      title: "General Overseer",
      location: "New York, Headquarters",
      flag: "🇺🇸",
      imageUrl: "https://res.cloudinary.com/dnkkgqn1w/image/upload/v1756676866/daddyandmummy_cuuha6.jpg",
      bio: "Founding Pastors and Spiritual Leaders, Pastor Durojaiye and Pastor (Mrs.) Funmi Olorunlana. More than three decades ago, God entrusted them with a divine vision and mandate to raise a praying people and establish a house of light for the nations. In obedience to this call, Fountain of Light Prayer Ministry International was officially founded on March 30th, 2010, with its headquarters in New York. Today, the ministry has grown beyond borders, with branches in Lagos and Akure, Nigeria, making its presence felt across two nations and two continents - the United States and Africa. Under their faithful leadership, the church continues to impact lives globally with prayer, the Word, and the power of the Holy Spirit.",
      specialties: [
        "Global Vision",
        "Prayer & Intercession",
        "Leadership Development",
        "Church Planting"
      ],
      contact: {
        email: "info@fountainoflight.org",
        phone: "+1 718 812 9816"
      },
      isHeadquarters: true,
      experience: "30+ Years Ministry"
    },
    {
      id: "lagos-pastor",
      name: "Pastor Ayokunle Chris Ashogbon",
      title: "Pastor - Lagos Branch",
      location: "Lagos, Nigeria",
      flag: "🇳🇬",
      imageUrl: "https://res.cloudinary.com/dnkkgqn1w/image/upload/v1778723889/PHOTO-2026-05-08-20-07-47_cme3za.jpg",
      bio: "Ayokunle Christopher Ashogbon is the pastor of Fountain of light prayer ministries, Lagos branch. He has over two decades experience in evangelical outreach ministry as a clergyman and a decade profile in public speaking. He serves as the former Lagos State Chairman of an NGO, Speak Africa International, Centre for Human Development & presently the lead director of DreamHouse Global  Innnovations. Where he focuses on raising champions through potential development and life coaching. He is also a member of BSN Toastmasters International, a public speaking and leadership organisation. Ayokunle Christopher Ashogbon holds a Higher National Diploma in Microbiology and also a Diploma in Biblical studies. He is motivated to seeing people discover, develop and deploy the champions in them through potential enhancement and great service to humanity. An author of books and articles with the mandate of raising champions in every sphere of life. He is married to an amazing lady, Kikelomo Ashogbon with a lovely daughter.",
      specialties: ["Pastoral Care", "Biblical Teaching", "Prayer Ministry", "Community Outreach"],
      contact: {
        email: "",
        phone: "+234 803 478 8324"
      },
      isHeadquarters: false,
      experience: "Ministry Leader"
    },
    {
      id: "akure-pastor",
      name: "Pastor Promise Ajetunmobi",
      title: "Pastor - Akure Branch",
      location: "Akure, Ondo State",
      flag: "🇳🇬",
      imageUrl: "https://res.cloudinary.com/dnkkgqn1w/image/upload/v1778724273/IMG_2883_dnozbk.jpg",
      bio: "Pastor Promise Ajetunmobi faithfully leads the Akure branch of Fountain of Light Prayer Ministry. With a heart for marketplace ministry and community transformation, he works tirelessly to bring the light of the Gospel to Akure and its environs. His ministry focuses on raising disciples, empowering believers, and creating an atmosphere of prayer and worship that draws people closer to God.",
      specialties: ["Marketplace Ministry", "Discipleship", "Youth Empowerment", "Evangelism"],
      contact: {
        email: "",
        phone: "+234 803 810 8585"
      },
      isHeadquarters: false,
      experience: "Ministry Leader"
    }
  ];

  const ministryDepartments = [
    {
      name: "Global Missions Department",
      head: "Pastor Durojaiye Olorunlana",
      description: "Coordinating international outreach and church planting initiatives",
      locations: "All Branches"
    },
    {
      name: "Youth & Young Adults",
      head: "Pastor Ayokunle Chris Ashogbon",
      description: "Empowering the next generation across all locations",
      locations: "Global Coordination"
    },
    {
      name: "Women's Fellowship International",
      head: "Pastor (Mrs.) Funmi Olorunlana",
      description: "Women's ministry and empowerment programs worldwide",
      locations: "All Branches"
    },
    {
      name: "Men's Fellowship Network",
      head: "Pastor Promise Ajetunmobi",
      description: "Men's discipleship and leadership development",
      locations: "Global Network"
    },
    {
      name: "Prayer & Intercession",
      head: "pastor Durojaiye Olorunlana",
      description: "24/7 prayer coverage and intercessory ministry",
      locations: "All Locations"
    },
    {
      name: "Community Outreach",
      head: "pastor Ayokunle Chris Ashogbon",
      description: "Local community service and humanitarian efforts",
      locations: "Location-Specific"
    }
  ];

  // Function to generate Cloudinary transformation URL for optimized images
  const getOptimizedImageUrl = (imageUrl, transformations = "w_400,h_300,c_fill,g_face,f_auto,q_auto") => {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
      return imageUrl;
    }
    
    // Insert transformations into Cloudinary URL
    return imageUrl.replace('/upload/', `/upload/${transformations}/`);
  };

  return (
    <section id="leadership" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-6 py-2 mb-6">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Global Ministry Leadership</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Spiritual Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the ordained ministers who shepherd our global congregation with wisdom, 
            prayer, and dedication to advancing God's kingdom across three nations.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {leadership.map((leader) => (
            <Card 
              key={leader.id} 
              className={`shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 ${
                leader.isHeadquarters 
                  ? 'ring-2 ring-primary bg-white' 
                  : 'bg-white'
              }`}
            >
              {leader.isHeadquarters && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-10">
                  General Overseer
                </div>
              )}
              
              {/* Pastor Photo */}
              <div className="relative">
                <div className="w-full h-64 overflow-hidden rounded-t-lg bg-gray-100">
                  {leader.imageUrl ? (
                    <img
                      src={getOptimizedImageUrl(leader.imageUrl, "w_400,h_300,c_fill,g_face,f_auto,q_auto")}
                      alt={`${leader.name} - ${leader.title}`}
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const img = e.target;
                        const fallback = (img as HTMLImageElement).parentElement?.querySelector('.fallback-bg');
                        if (fallback) {
                          (img as HTMLImageElement).style.display = 'none';
                          (fallback as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback background */}
                  <div className="fallback-bg w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center" style={{ display: leader.imageUrl ? 'none' : 'flex' }}>
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                      <Crown className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Country flag overlay */}
                <div className="absolute top-4 left-4 text-3xl bg-white/90 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                  {leader.flag}
                </div>

                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>

              <CardHeader className="pb-4">
                <div className="text-center mb-4">
                  <CardTitle className="text-xl text-slate-800 mb-1">
                    {leader.name}
                  </CardTitle>
                  <p className="text-sm font-semibold text-primary mb-2">
                    {leader.title}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{leader.location}</span>
                  </div>
                </div>

                <div className="text-center py-3 border-t border-b border-gray-100">
                  <p className="text-sm font-semibold text-primary">{leader.experience}</p>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {leader.bio}
                </p>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Ministry Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {leader.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="bg-primary/5 text-primary px-2 py-1 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="w-3 h-3" />
                    <span>{leader.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3 h-3" />
                    <span>{leader.contact.phone}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Pastor
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ministry Departments */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Ministry Departments</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our global ministry is organized into specialized departments that serve 
              our congregation across all locations with excellence and dedication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministryDepartments.map((department, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-divine-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {department.name}
                    </h4>
                    <p className="text-sm text-divine-gold">
                      Led by {department.head}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-white/80 mb-3 leading-relaxed">
                  {department.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-divine-gold" />
                  <span className="text-xs text-white/70">{department.locations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Contact */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto shadow-md border border-gray-200">
            <CardContent className="p-8">
              <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Connect with Our Leadership
              </h3>
              <p className="text-gray-600 mb-6">
                Our pastoral team is available for spiritual guidance, counseling, and prayer. 
                Reach out to any of our locations for ministry support.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Mail className="w-4 h-4 mr-2" />
                  General Ministry Contact
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300 text-slate-700 hover:bg-gray-50">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;