import { type Influencer } from "@/components/InfluencerCard";

export const influencers: Influencer[] = [
  { name: "Sarah Chen", niche: "Fashion", followers: "1.2M", engagement: "4.8%", avatar: "", platform: "Instagram" },
  { name: "Alex Rivera", niche: "Tech", followers: "890K", engagement: "5.2%", avatar: "", platform: "YouTube" },
  { name: "Emma Wilson", niche: "Fitness", followers: "2.1M", engagement: "6.1%", avatar: "", platform: "Instagram" },
  { name: "Jordan Lee", niche: "Gaming", followers: "3.5M", engagement: "7.3%", avatar: "", platform: "YouTube" },
  { name: "Mia Johnson", niche: "Beauty", followers: "1.8M", engagement: "5.5%", avatar: "", platform: "Instagram" },
  { name: "Noah Kim", niche: "Travel", followers: "950K", engagement: "4.2%", avatar: "", platform: "YouTube" },
  { name: "Olivia Park", niche: "Fashion", followers: "1.5M", engagement: "5.9%", avatar: "", platform: "Instagram" },
  { name: "Liam Carter", niche: "Fitness", followers: "750K", engagement: "6.8%", avatar: "", platform: "Instagram" },
  { name: "Sophia Davis", niche: "Beauty", followers: "2.3M", engagement: "4.5%", avatar: "", platform: "Instagram" },
  { name: "Lucas Wright", niche: "Tech", followers: "1.1M", engagement: "5.0%", avatar: "", platform: "YouTube" },
  { name: "Ava Martinez", niche: "Travel", followers: "680K", engagement: "7.1%", avatar: "", platform: "Instagram" },
  { name: "Ethan Brown", niche: "Gaming", followers: "4.2M", engagement: "8.2%", avatar: "", platform: "YouTube" },
];

export const testimonials = [
  { name: "Michael Torres", role: "CMO, TechVibe", quote: "InfluenceHub helped us achieve a 340% ROI on our latest campaign. The platform's data-driven approach is unmatched." },
  { name: "Lisa Chang", role: "Brand Manager, Luxora", quote: "Finding the right influencers used to take weeks. With InfluenceHub, we launched our campaign in 3 days." },
  { name: "David Kim", role: "Founder, FitPro", quote: "The campaign management tools and analytics are incredibly powerful. Our engagement rates have doubled." },
];

export const trustedBrands = ["Nike", "Spotify", "Adobe", "Shopify", "Stripe", "Notion"];

export const caseStudies = [
  {
    title: "Luxora Fashion Launch",
    brand: "Luxora",
    description: "How we helped Luxora achieve 5M+ impressions with micro-influencers during their seasonal collection launch.",
    reach: "5.2M",
    roi: "340%",
    engagement: "6.8%",
    category: "Fashion",
  },
  {
    title: "TechVibe Product Launch",
    brand: "TechVibe",
    description: "Strategic influencer partnerships that drove 50K+ pre-orders for TechVibe's latest gadget.",
    reach: "8.1M",
    roi: "520%",
    engagement: "4.2%",
    category: "Tech",
  },
  {
    title: "FitPro App Campaign",
    brand: "FitPro",
    description: "A 30-day fitness challenge campaign that generated 200K app downloads and massive social buzz.",
    reach: "12M",
    roi: "280%",
    engagement: "9.1%",
    category: "Fitness",
  },
  {
    title: "GlowUp Beauty Series",
    brand: "GlowUp",
    description: "Tutorial-style content series that boosted product sales by 180% in the first month.",
    reach: "3.8M",
    roi: "420%",
    engagement: "7.5%",
    category: "Beauty",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for small brands getting started with influencer marketing.",
    features: ["Up to 5 influencer connections", "Basic analytics dashboard", "Campaign management", "Email support", "1 active campaign"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,299",
    period: "/month",
    description: "Scale your influencer marketing with advanced tools and analytics.",
    features: ["Up to 25 influencer connections", "Advanced analytics & ROI tracking", "Multi-campaign management", "Priority support", "5 active campaigns", "A/B testing tools", "Custom reporting"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-service solution for large brands and agencies.",
    features: ["Unlimited influencer connections", "Enterprise analytics suite", "Dedicated account manager", "24/7 support", "Unlimited campaigns", "API access", "White-label options", "Custom integrations"],
    popular: false,
  },
];

export const teamMembers = [
  { name: "Rachel Foster", role: "CEO & Founder", bio: "Former VP of Marketing at a Fortune 500 company." },
  { name: "James Chen", role: "CTO", bio: "Ex-Google engineer with 15 years in ad tech." },
  { name: "Amara Okafor", role: "Head of Partnerships", bio: "Built influencer networks spanning 50+ countries." },
  { name: "Marcus Reeves", role: "Creative Director", bio: "Award-winning creative with brands like Nike and Apple." },
];
