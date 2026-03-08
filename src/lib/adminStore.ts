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
  instagram: string;
  youtube: string;
  category: string;
  followers: string;
  engagement: string;
  bio: string;
  photo: string;
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

const ADMIN_CREDENTIALS = { email: "gagantg0712@gmail.com", password: "@GAGANmanja7" };

// Auth
export const adminLogin = (email: string, password: string): boolean => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem("admin_auth", "true");
    return true;
  }
  return false;
};

export const adminLogout = () => localStorage.removeItem("admin_auth");
export const isAdminLoggedIn = () => localStorage.getItem("admin_auth") === "true";

// Generic helpers
const getItems = <T>(key: string): T[] => {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
};
const setItems = <T>(key: string, items: T[]) => localStorage.setItem(key, JSON.stringify(items));
const genId = () => Math.random().toString(36).slice(2, 10);

// Messages
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

// Applications
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
  // Update status
  setItems("admin_applications", apps.map(a => a.id === id ? { ...a, status: "approved" as const } : a));
  // Add to approved influencers
  const influencers = getApprovedInfluencers();
  influencers.unshift({
    id: genId(),
    name: app.name,
    email: app.email,
    platform: app.instagram ? "Instagram" : "YouTube",
    category: app.category,
    followers: app.followers,
    engagement: app.engagement,
    bio: app.bio,
    photo: app.photo,
    profileLink: app.instagram || app.youtube,
    date: new Date().toISOString(),
  });
  setItems("admin_influencers", influencers);
};
export const rejectApplication = (id: string) => {
  setItems("admin_applications", getApplications().map(a => a.id === id ? { ...a, status: "rejected" as const } : a));
};

// Approved Influencers
export const getApprovedInfluencers = () => getItems<ApprovedInfluencer>("admin_influencers");
export const addInfluencer = (inf: Omit<ApprovedInfluencer, "id" | "date">) => {
  const items = getApprovedInfluencers();
  items.unshift({ ...inf, id: genId(), date: new Date().toISOString() });
  setItems("admin_influencers", items);
};
export const deleteInfluencer = (id: string) => {
  setItems("admin_influencers", getApprovedInfluencers().filter(i => i.id !== id));
};
export const updateInfluencer = (id: string, data: Partial<ApprovedInfluencer>) => {
  setItems("admin_influencers", getApprovedInfluencers().map(i => i.id === id ? { ...i, ...data } : i));
};

// Campaign Requests
export const getCampaignRequests = () => getItems<CampaignRequest>("admin_campaigns");
export const addCampaignRequest = (req: Omit<CampaignRequest, "id" | "date" | "status">) => {
  const items = getCampaignRequests();
  items.unshift({ ...req, id: genId(), date: new Date().toISOString(), status: "new" });
  setItems("admin_campaigns", items);
};
