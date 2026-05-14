import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import SermonLibrary from "@/components/SermonLibrary";
import Footer from "@/components/Footer";

const Sermons = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Sermon Library - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Access our comprehensive library of sermons, teachings, and spiritual messages from pastors across our global branches." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <SermonLibrary />
      </main>
      <Footer />
    </div>
  );
};

export default Sermons;