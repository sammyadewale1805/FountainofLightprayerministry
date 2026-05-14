import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import EventsCalendar from "@/components/EventsCalendar";
import Footer from "@/components/Footer";

const Events = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Events & Calendar - Fountain of Light Prayer Ministry International</title>
        <meta name="description" content="Stay updated with our global events, services, and special programs across New York, Lagos, and Akure branches." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <EventsCalendar />
      </main>
      <Footer />
    </div>
  );
};

export default Events;