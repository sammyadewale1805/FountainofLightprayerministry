import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BiblePlans from "@/components/BiblePlans";

const BibleStudy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bible Reading Plans - Fountain of Light Prayer Ministry</title>
        <meta name="description" content="Grow in God's Word with our curated Bible reading plans. Start your journey today with daily devotions, book studies, and more." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bible Reading Plans
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Transform your spiritual life through consistent time in God's Word.
              Choose a plan and start your journey today.
            </p>
          </div>
        </section>

        {/* Bible Plans Section */}
        <BiblePlans />
      </main>
      
      <Footer />
    </div>
  );
};

export default BibleStudy;
