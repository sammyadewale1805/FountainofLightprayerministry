import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Us - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Learn about Fountain of Light Prayer Ministry International's mission, vision, and global presence across New York, Lagos, and Akure." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;