import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import PrayerRequest from "@/components/PrayerRequest";
import Footer from "@/components/Footer";

const Prayer = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Prayer Request - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Submit your prayer requests to our global prayer chain. Experience the power of united prayer across our international ministry." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <PrayerRequest />
      </main>
      <Footer />
    </div>
  );
};

export default Prayer;