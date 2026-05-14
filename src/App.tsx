import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Giving from "./pages/Giving";
import Leadership from "./pages/Leadership";
import Prayer from "./pages/Prayer";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import BibleStudy from "./pages/BibleStudy";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminDonors from "./pages/admin/AdminDonors";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bible-study" element={<BibleStudy />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="donors" element={<AdminDonors />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
