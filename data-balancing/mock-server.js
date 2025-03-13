function createMockServer(name, weight = 1) {
  return {
    name: name,
    weight: weight,
    connections: Math.floor(Math.random() * 10),
    responseTime: Math.random() * 100,
    timeRemaining: Math.random() * 50,
    isAvailable: Boolean(Math.round(Math.random())),
    priority: Math.floor(Math.random() * 10),
    cpuUsage: Math.floor(Math.random() * 100), 
    ramUsage: Math.floor(Math.random() * 100), 
    maxRequests: Math.floor(Math.random() * 10) + 2, 
    currentRequests: 0,
    lastUsed: new Date(Date.now() - Math.floor(Math.random() * 1000000000)), 
  };
}

export const mockServers = [
  createMockServer("Server-1", 2),
  createMockServer("Server-2", 1),
  createMockServer("Server-3", 3),
  createMockServer("Server-4", 5),
  createMockServer("Server-5", 3),
];

export const clients =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const domains = ["example.com", "api.example.com", "static.example.com"];

export  const ipClients = [
  "172.16.0.4",
  "192.168.1.100",
  "10.0.0.200",
  "172.16.0.150",
  "192.168.1.100",
  "10.0.0.50",
  "172.16.0.10",
  "192.168.1.150",
  "10.0.0.100",
];

export const urls = [
  "/home",
  "/about",
  "/contact",
  "/products",
  "/services",
  "/blog",
  "/faq",
  "/support",
  "/dashboard",
];

export const serverLocations = {
  "Server-1": "192.168.1.0/24",
  "Server-2": "192.168.1.0/24",
  "Server-3": "10.0.0.0/24",
  "Server-4": "10.0.0.0/24",
  "Server-5": "172.16.0.0/24",
};

export const serverRegions = {
  "Server-1": "US",
  "Server-2": "US",
  "Server-3": "EU",
  "Server-4": "EU",
  "Server-5": "ASIA",
};

export const clientRegions = {
  "192.168.1.100": "US",
  "10.0.0.50": "EU",
  "172.16.0.10": "ASIA",
  "192.168.1.150": "US",
  "10.0.0.100": "EU",
};
