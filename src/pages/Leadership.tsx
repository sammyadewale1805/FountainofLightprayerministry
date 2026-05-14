import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import LeadershipSection from "@/components/LeadershipSection";
import Footer from "@/components/Footer";

const Leadership = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Leadership Team - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Meet our global leadership team including the General Overseer and branch pastors across our international ministry." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <LeadershipSection />
      </main>
      <Footer />
    </div>
  );
};

export default Leadership;