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
    maxRequests: Math.floor(Math.random() * 10) + 5, 
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