import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import ForBrands from "./pages/ForBrands";
import ForInfluencers from "./pages/ForInfluencers";
import JoinInfluencer from "./pages/JoinInfluencer";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminInfluencers from "./pages/admin/AdminInfluencers";
import AdminAddInfluencer from "./pages/admin/AdminAddInfluencer";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
            <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
            <Route path="/for-brands" element={<PublicLayout><ForBrands /></PublicLayout>} />
            <Route path="/for-influencers" element={<PublicLayout><ForInfluencers /></PublicLayout>} />
            <Route path="/join-influencer" element={<PublicLayout><JoinInfluencer /></PublicLayout>} />
            <Route path="/case-studies" element={<PublicLayout><CaseStudies /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

            {/* Admin login (no navbar/footer) */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Admin routes with sidebar layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="influencers" element={<AdminInfluencers />} />
              <Route path="add-influencer" element={<AdminAddInfluencer />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
