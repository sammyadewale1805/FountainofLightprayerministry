import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import GivingPlatform from "@/components/GivingPlatform";
import Footer from "@/components/Footer";

const Giving = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Give & Support - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Support God's work through secure online giving. Help us expand our ministry across New York, Lagos, and Akure." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <GivingPlatform />
      </main>
      <Footer />
    </div>
  );
};

export default Giving;