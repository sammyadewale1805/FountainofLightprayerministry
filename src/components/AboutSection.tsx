import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, Lightbulb } from "lucide-react";
import bgImage from "@/assets/PHOTO-2026-03-19-18-43-58.jpg";

const AboutSection = () => {
  const visionPoints = [
    {
      icon: Heart,
      title: "Prayer & Spiritual Growth",
      description: "Deepening relationship with God through consistent prayer and biblical study across all nations."
    },
    {
      icon: Globe,
      title: "Global Evangelism",
      description: "Spreading the Gospel of Jesus Christ to every corner of the world through strategic ministry placement."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Transforming communities through practical Christianity, social outreach, and compassionate service."
    },
    {
      icon: Lightbulb,
      title: "Divine Illumination",
      description: "Bringing the light of God's truth and wisdom to individuals, families, and entire communities."
    }
  ];

  return (
    <section
      id="about"
      className="py-20 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay so text remains readable */}
      <div className="absolute inset-0 bg-black/60" />

      {/* All content sits above the overlay */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-divine-gold/10 backdrop-blur-sm border border-divine-gold/20 rounded-full px-6 py-2 mb-6">
            <Lightbulb className="w-4 h-4 text-divine-gold" />
            <span className="font-content text-divine-gold text-sm">Our Divine Mission</span>
          </div>

          <h2 className="font-ministry text-4xl md:text-5xl font-bold text-white mb-6">
            Fountain of Light Prayer Ministry International
          </h2>
          <p className="font-content text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
            Called to illuminate lives through prayer, faith, and divine connection. Established to serve as a
            beacon of hope, spiritual growth, and transformation across three strategic global locations.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-prayer-blue/80 to-divine-blue/80 backdrop-blur-sm p-8 rounded-xl shadow-divine mb-16 text-center">
          <h3 className="font-ministry text-2xl md:text-3xl font-bold text-white mb-4">
            "Illuminating Lives Through Prayer, Faith, and Divine Connection"
          </h3>
          <p className="font-content text-white/90 text-lg max-w-3xl mx-auto">
            Our mission spans continents, touching lives in New York, Lagos, and our headquarters in Akure.
            We are committed to spreading the light of Christ through passionate worship, fervent prayer,
            and practical ministry that transforms communities.
          </p>
        </div>

        {/* Vision Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {visionPoints.map((point, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-prayer hover:shadow-divine transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-divine-gold to-prayer-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-ministry text-lg font-bold text-white mb-3">
                  {point.title}
                </h4>
                <p className="font-content text-sm text-white/70 leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ministry Heritage */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-ministry text-3xl font-bold text-white mb-6">
              Our Heritage of Faith
            </h3>
            <div className="space-y-4">
              <p className="font-content text-white/80 leading-relaxed">
                Founded in Akure, Ondo State, Nigeria, Fountain of Light Prayer Ministry International
                has grown from a local congregation to a global movement. Our journey began with a divine
                vision to establish prayer centers that would serve as fountains of spiritual refreshing
                in key cities around the world.
              </p>
              <p className="font-content text-white/80 leading-relaxed">
                Today, we serve three strategic locations: our headquarters in Akure where it all began,
                our vibrant Lagos branch serving Nigeria's commercial hub, and our New York branch
                reaching the diaspora and American communities.
              </p>
              <p className="font-content text-white/80 leading-relaxed">
                Each location maintains the core ministry values while adapting to serve their unique
                communities, creating a truly global yet locally relevant ministry presence.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-white">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h4 className="font-ministry text-2xl font-bold mb-2">Our Core Values</h4>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-divine-gold rounded-full flex-shrink-0" />
                <span className="font-content">Prayer-Centered Ministry</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-divine-gold rounded-full flex-shrink-0" />
                <span className="font-content">Biblical Truth & Sound Doctrine</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-divine-gold rounded-full flex-shrink-0" />
                <span className="font-content">Global Vision, Local Impact</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-divine-gold rounded-full flex-shrink-0" />
                <span className="font-content">Community Transformation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-divine-gold rounded-full flex-shrink-0" />
                <span className="font-content">Cultural Sensitivity & Unity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;