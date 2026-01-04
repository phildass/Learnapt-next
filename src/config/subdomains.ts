// Subdomain Configuration Registry
// This file contains the configuration for all subdomains in the iiskills.cloud ecosystem

export interface SubdomainConfig {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string; // Lucide icon name
  status: "active" | "development" | "maintenance";
  adminPath: string; // Path to the admin area for this subdomain
  category: "learning" | "admin" | "content" | "analytics";
}

// Central registry of all subdomains
export const SUBDOMAINS: SubdomainConfig[] = [
  {
    id: "learn-apt",
    name: "Learn Apt",
    url: "https://learn-apt.iiskills.cloud",
    description: "Comprehensive aptitude testing platform for learning preferences and problem-solving styles",
    icon: "Brain",
    status: "active",
    adminPath: "/admin",
    category: "learning",
  },
  // Add more subdomains as they are created
  // Example:
  // {
  //   id: "admin-central",
  //   name: "Central Admin",
  //   url: "https://admin.iiskills.cloud",
  //   description: "Central administration dashboard for all iiskills.cloud services",
  //   icon: "Settings",
  //   status: "development",
  //   adminPath: "/",
  //   category: "admin",
  // },
];

// Get subdomain configuration by ID
export function getSubdomainById(id: string): SubdomainConfig | undefined {
  return SUBDOMAINS.find(subdomain => subdomain.id === id);
}

// Get subdomain configuration by URL
export function getSubdomainByUrl(url: string): SubdomainConfig | undefined {
  return SUBDOMAINS.find(subdomain => subdomain.url === url);
}

// Get all subdomains by category
export function getSubdomainsByCategory(category: SubdomainConfig["category"]): SubdomainConfig[] {
  return SUBDOMAINS.filter(subdomain => subdomain.category === category);
}

// Get all active subdomains
export function getActiveSubdomains(): SubdomainConfig[] {
  return SUBDOMAINS.filter(subdomain => subdomain.status === "active");
}

// Check if current URL is a known subdomain
export function getCurrentSubdomain(): SubdomainConfig | undefined {
  if (typeof window === "undefined") return undefined;
  
  const currentUrl = window.location.origin;
  return getSubdomainByUrl(currentUrl);
}

// Get the admin URL for a specific subdomain
export function getAdminUrl(subdomainId: string): string | undefined {
  const subdomain = getSubdomainById(subdomainId);
  if (!subdomain) return undefined;
  
  return `${subdomain.url}${subdomain.adminPath}`;
}
