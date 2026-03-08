// localStorage-based admin store

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface InfluencerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  youtube: string;
  category: string;
  followers: string;
  engagement: string;
  bio: string;
  photo: string;
  password: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export interface ApprovedInfluencer {
  id: string;
  name: string;
  email: string;
  platform: string;
  category: string;
  followers: string;
  engagement: string;
  bio: string;
  photo: string;
  profileLink: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export interface BrandAccount {
  id: string;
  brandName: string;
  email: string;
  password: string;
  website: string;
  industry: string;
  date: string;
}

export interface Campaign {
  id: string;
  brandId: string;
  brandName: string;
  influencerId: string;
  influencerName: string;
  campaignName: string;
  budget: string;
  deliverables: string;
  deadline: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: "brand" | "influencer";
  receiverId: string;
  message: string;
  date: string;
}

export interface SavedInfluencer {
  brandId: string;
  influencerId: string;
}

export interface CampaignRequest {
  id: string;
  brand: string;
  email: string;
  budget: string;
  description: string;
  date: string;
  status: "new" | "reviewed";
}

// Generic helpers
const getItems = <T>(key: string): T[] => {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
};
const setItems = <T>(key: string, items: T[]) => localStorage.setItem(key, JSON.stringify(items));
const genId = () => Math.random().toString(36).slice(2, 10);

// ─── Admin Auth ───
const ADMIN_SESSION_KEY = "admin_logged_in";
export const adminLogin = (email: string, password: string): boolean => {
  if (email.trim() && password.trim()) {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    return true;
  }
  return false;
};
export const adminLogout = () => { localStorage.removeItem(ADMIN_SESSION_KEY); };
export const isAdminLoggedIn = (): boolean => localStorage.getItem(ADMIN_SESSION_KEY) === "true";

// ─── Brand Auth ───
export const getBrands = () => getItems<BrandAccount>("brands");
export const registerBrand = (data: Omit<BrandAccount, "id" | "date">): BrandAccount | null => {
  const brands = getBrands();
  if (brands.find(b => b.email === data.email)) return null;
  const brand: BrandAccount = { ...data, id: genId(), date: new Date().toISOString() };
  brands.push(brand);
  setItems("brands", brands);
  return brand;
};
export const brandLogin = (email: string, password: string): BrandAccount | null => {
  const brand = getBrands().find(b => b.email === email && b.password === password);
  if (brand) {
    localStorage.setItem("brand_session", JSON.stringify(brand));
    return brand;
  }
  return null;
};
export const getBrandSession = (): BrandAccount | null => {
  try { return JSON.parse(localStorage.getItem("brand_session") || "null"); } catch { return null; }
};
export const brandLogout = () => { localStorage.removeItem("brand_session"); };

// ─── Influencer Auth ───
export const influencerLogin = (email: string, password: string): ApprovedInfluencer | null => {
  // Check applications for approved with matching credentials
  const apps = getApplications();
  const app = apps.find(a => a.email === email && a.password === password && a.status === "approved");
  if (app) {
    const inf = getApprovedInfluencers().find(i => i.email === email);
    if (inf) {
      localStorage.setItem("influencer_session", JSON.stringify(inf));
      return inf;
    }
  }
  return null;
};
export const getInfluencerSession = (): ApprovedInfluencer | null => {
  try { return JSON.parse(localStorage.getItem("influencer_session") || "null"); } catch { return null; }
};
export const influencerLogout = () => { localStorage.removeItem("influencer_session"); };

// ─── Messages (admin contact form) ───
export const getMessages = () => getItems<AdminMessage>("admin_messages");
export const addMessage = (msg: Omit<AdminMessage, "id" | "date" | "read">) => {
  const items = getMessages();
  items.unshift({ ...msg, id: genId(), date: new Date().toISOString(), read: false });
  setItems("admin_messages", items);
};
export const markMessageRead = (id: string) => {
  const items = getMessages().map(m => m.id === id ? { ...m, read: true } : m);
  setItems("admin_messages", items);
};
export const deleteMessage = (id: string) => {
  setItems("admin_messages", getMessages().filter(m => m.id !== id));
};

// ─── Applications ───
export const getApplications = () => getItems<InfluencerApplication>("admin_applications");
export const addApplication = (app: Omit<InfluencerApplication, "id" | "date" | "status">) => {
  const items = getApplications();
  items.unshift({ ...app, id: genId(), date: new Date().toISOString(), status: "pending" });
  setItems("admin_applications", items);
};
export const approveApplication = (id: string) => {
  const apps = getApplications();
  const app = apps.find(a => a.id === id);
  if (!app) return;
  setItems("admin_applications", apps.map(a => a.id === id ? { ...a, status: "approved" as const } : a));
  const influencers = getApprovedInfluencers();
  influencers.unshift({
    id: genId(),
    name: app.name,
    email: app.email,
    platform: app.youtube ? "YouTube" : "Other",
    category: app.category,
    followers: app.followers,
    engagement: app.engagement,
    bio: app.bio,
    photo: app.photo,
    profileLink: app.youtube,
    date: new Date().toISOString(),
    status: "approved" as const,
  });
  setItems("admin_influencers", influencers);
};
export const rejectApplication = (id: string) => {
  setItems("admin_applications", getApplications().map(a => a.id === id ? { ...a, status: "rejected" as const } : a));
};

// ─── Approved Influencers ───
export const getApprovedInfluencers = () => getItems<ApprovedInfluencer>("admin_influencers");
export const addInfluencer = (inf: Omit<ApprovedInfluencer, "id" | "date" | "status">) => {
  const items = getApprovedInfluencers();
  items.unshift({ ...inf, id: genId(), date: new Date().toISOString(), status: "pending" });
  setItems("admin_influencers", items);
};
export const getPublicInfluencers = () => getApprovedInfluencers().filter(i => i.status === "approved");
export const deleteInfluencer = (id: string) => {
  setItems("admin_influencers", getApprovedInfluencers().filter(i => i.id !== id));
};
export const updateInfluencer = (id: string, data: Partial<ApprovedInfluencer>) => {
  setItems("admin_influencers", getApprovedInfluencers().map(i => i.id === id ? { ...i, ...data } : i));
};

// ─── Campaign Requests (public form) ───
export const getCampaignRequests = () => getItems<CampaignRequest>("admin_campaigns");
export const addCampaignRequest = (req: Omit<CampaignRequest, "id" | "date" | "status">) => {
  const items = getCampaignRequests();
  items.unshift({ ...req, id: genId(), date: new Date().toISOString(), status: "new" });
  setItems("admin_campaigns", items);
};

// ─── Campaigns (brand → influencer) ───
export const getCampaigns = () => getItems<Campaign>("campaigns");
export const addCampaign = (c: Omit<Campaign, "id" | "date" | "status">): Campaign => {
  const items = getCampaigns();
  const campaign: Campaign = { ...c, id: genId(), date: new Date().toISOString(), status: "pending" };
  items.unshift(campaign);
  setItems("campaigns", items);
  return campaign;
};
export const updateCampaignStatus = (id: string, status: Campaign["status"]) => {
  setItems("campaigns", getCampaigns().map(c => c.id === id ? { ...c, status } : c));
};
export const getBrandCampaigns = (brandId: string) => getCampaigns().filter(c => c.brandId === brandId);
export const getInfluencerCampaigns = (influencerId: string) => getCampaigns().filter(c => c.influencerId === influencerId);

// ─── Chat Messages ───
export const getChatMessages = () => getItems<ChatMessage>("chat_messages");
export const addChatMessage = (msg: Omit<ChatMessage, "id" | "date">) => {
  const items = getChatMessages();
  items.push({ ...msg, id: genId(), date: new Date().toISOString() });
  setItems("chat_messages", items);
};
export const getConversation = (userId1: string, userId2: string) =>
  getChatMessages().filter(m =>
    (m.senderId === userId1 && m.receiverId === userId2) ||
    (m.senderId === userId2 && m.receiverId === userId1)
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getConversationPartners = (userId: string) => {
  const msgs = getChatMessages().filter(m => m.senderId === userId || m.receiverId === userId);
  const partnerIds = new Set<string>();
  msgs.forEach(m => {
    if (m.senderId === userId) partnerIds.add(m.receiverId);
    else partnerIds.add(m.senderId);
  });
  return Array.from(partnerIds);
};

// ─── Saved Influencers ───
export const getSavedInfluencers = (brandId: string) => getItems<SavedInfluencer>("saved_influencers").filter(s => s.brandId === brandId);
export const saveInfluencer = (brandId: string, influencerId: string) => {
  const items = getItems<SavedInfluencer>("saved_influencers");
  if (!items.find(s => s.brandId === brandId && s.influencerId === influencerId)) {
    items.push({ brandId, influencerId });
    setItems("saved_influencers", items);
  }
};
export const unsaveInfluencer = (brandId: string, influencerId: string) => {
  setItems("saved_influencers", getItems<SavedInfluencer>("saved_influencers").filter(s => !(s.brandId === brandId && s.influencerId === influencerId)));
};
export const isInfluencerSaved = (brandId: string, influencerId: string) =>
  getItems<SavedInfluencer>("saved_influencers").some(s => s.brandId === brandId && s.influencerId === influencerId);
