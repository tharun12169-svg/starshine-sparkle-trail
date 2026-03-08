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
import BrandRegister from "./pages/BrandRegister";
import BrandLogin from "./pages/BrandLogin";
import InfluencerLogin from "./pages/InfluencerLogin";
import AdminLayout from "./components/AdminLayout";
import BrandLayout from "./components/BrandLayout";
import InfluencerDashboardLayout from "./components/InfluencerDashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminInfluencers from "./pages/admin/AdminInfluencers";
import AdminAddInfluencer from "./pages/admin/AdminAddInfluencer";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminSettings from "./pages/admin/AdminSettings";
import BrandDashboard from "./pages/brand/BrandDashboard";
import BrandDiscover from "./pages/brand/BrandDiscover";
import BrandSaved from "./pages/brand/BrandSaved";
import BrandCampaigns from "./pages/brand/BrandCampaigns";
import BrandMessages from "./pages/brand/BrandMessages";
import BrandAnalytics from "./pages/brand/BrandAnalytics";
import InfluencerDashboard from "./pages/influencer/InfluencerDashboard";
import InfluencerCampaigns from "./pages/influencer/InfluencerCampaigns";
import InfluencerMessages from "./pages/influencer/InfluencerMessages";
import InfluencerSettings from "./pages/influencer/InfluencerSettings";
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

            {/* Auth pages (no navbar/footer) */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/brand-register" element={<BrandRegister />} />
            <Route path="/brand-login" element={<BrandLogin />} />
            <Route path="/influencer-login" element={<InfluencerLogin />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="influencers" element={<AdminInfluencers />} />
              <Route path="add-influencer" element={<AdminAddInfluencer />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Brand routes */}
            <Route path="/brand" element={<BrandLayout />}>
              <Route path="dashboard" element={<BrandDashboard />} />
              <Route path="discover" element={<BrandDiscover />} />
              <Route path="saved" element={<BrandSaved />} />
              <Route path="campaigns" element={<BrandCampaigns />} />
              <Route path="messages" element={<BrandMessages />} />
              <Route path="analytics" element={<BrandAnalytics />} />
            </Route>

            {/* Influencer routes */}
            <Route path="/influencer" element={<InfluencerDashboardLayout />}>
              <Route path="dashboard" element={<InfluencerDashboard />} />
              <Route path="campaigns" element={<InfluencerCampaigns />} />
              <Route path="messages" element={<InfluencerMessages />} />
            </Route>

            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
