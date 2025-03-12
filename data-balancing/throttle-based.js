import { mockServers, clients } from "./mock-server.js";

function throttleBasedLoadBalancing(servers, clients) {
    if (!servers || servers.length === 0) {
        return null;
      }

      clients.forEach((client, index) => {
        setTimeout(() => handleClientRequest(client, servers), index * 500);
      });
  
}

function getServers (servers) {
    return servers.filter((server) => server.currentRequests < server.maxRequests);
}

function handleClientRequest(client, servers) {
  const availableServers = getServers(servers);

  if (availableServers.length === 0) {
    console.log(`Client ${client} cannot connect, all servers are busy.`);
    return;
  }

  const serverIndex = Math.floor(Math.random() * availableServers.length); 
  const selectedServer = availableServers[serverIndex];

  selectedServer.currentRequests++;
  console.log(`Client ${client} connect to ${selectedServer.name} (current: ${selectedServer.currentRequests}, max: ${selectedServer.maxRequests})`);

  setTimeout(() => {
    selectedServer.currentRequests--;
    console.log(`Client ${client} disconnect ${selectedServer.name}`);
  }, Math.random() * 3000 + 2000);
}

throttleBasedLoadBalancing(mockServers, clients) 