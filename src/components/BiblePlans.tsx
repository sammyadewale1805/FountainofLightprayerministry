import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Clock, Calendar, ExternalLink, CheckCircle, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BiblePlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Specific YouVersion plan URLs
  const plans = [
    {
      id: "daily-devotion",
      title: "Daily Devotion",
      description: "Start each day with Scripture and prayer. Perfect for beginners.",
      duration: "365 days",
      dailyTime: "10-15 min",
      difficulty: "Beginner",
      youversionUrl: "https://www.bible.com/reading-plans/1-bible-in-one-year"
    },
    {
      id: "gospel-john",
      title: "Gospel of John",
      description: "Discover the life and teachings of Jesus in 21 days.",
      duration: "21 days",
      dailyTime: "15-20 min",
      difficulty: "Beginner",
      youversionUrl: "https://www.bible.com/reading-plans/23-gospel-of-john"
    },
    {
      id: "psalms-prayers",
      title: "Psalms & Prayers",
      description: "30 days of psalms to deepen your prayer life.",
      duration: "30 days",
      dailyTime: "10-15 min",
      difficulty: "All Levels",
      youversionUrl: "https://www.bible.com/reading-plans/2083-psalms-in-30-days"
    },
    {
      id: "new-believer",
      title: "New Believer's Guide",
      description: "Essential teachings for those new to the Christian faith.",
      duration: "14 days",
      dailyTime: "10-15 min",
      difficulty: "Beginner",
      youversionUrl: "https://www.bible.com/reading-plans/77-new-believers"
    },
    {
      id: "whole-bible",
      title: "Bible in a Year",
      description: "Journey through the entire Bible with daily readings.",
      duration: "365 days",
      dailyTime: "25-30 min",
      difficulty: "Committed",
      youversionUrl: "https://www.bible.com/reading-plans/1-bible-in-one-year"
    },
    {
      id: "proverbs-wisdom",
      title: "Proverbs: Daily Wisdom",
      description: "One chapter of Proverbs each day for practical godly wisdom.",
      duration: "31 days",
      dailyTime: "10 min",
      difficulty: "Beginner",
      youversionUrl: "https://www.bible.com/reading-plans/2147-proverbs-31"
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bible Reading Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Grow in God's Word
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a reading plan and let Scripture transform your daily walk with God.
            Start today and build a consistent Bible reading habit.
          </p>
        </motion.div>

        {/* Plans Grid - Clean Design */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Book className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-divine-gold bg-accent/10 px-2 py-1 rounded-full">
                      {plan.difficulty}
                    </span>
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{plan.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {plan.description}
                  </p>
                  
                  {/* Plan Details */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{plan.dailyTime}</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <a 
                    href={plan.youversionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline"
                      className="w-full border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/30 rounded-lg"
                    >
                      Start This Plan
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* YouVersion CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-0 overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Access 2,500+ Bible Versions
                </h3>
                <p className="text-white/80 mb-6">
                  Download the YouVersion Bible App for free access to thousands of reading plans,
                  audio Bibles, and Scripture in over 1,700 languages.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="https://www.bible.com/app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                      Download Bible App
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a 
                    href="https://www.bible.com/reading-plans"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
                      Browse All Plans
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BiblePlans;
