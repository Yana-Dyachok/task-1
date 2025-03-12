import { mockServers, clients } from "./mock-server.js"; 

function lruLoadBalancer(servers,clients) {
  if (!servers || servers.length === 0) {
    return null;
  }

  clients.forEach((client, index) => {
    setTimeout(() => handleClientRequest(client, servers), index * 500);
  });
}

function getServers(servers) {
    let minLastUsed = Infinity;
    let selectedServer = null;
  
    for (const server of servers) {
      if (server.lastUsed < minLastUsed) {
        minLastUsed = server.lastUsed;
        selectedServer = server;
      }
    }
  
    if (selectedServer) {
      selectedServer.lastUsed = Date.now();
    }
    return selectedServer;
 }

 function handleClientRequest(client, servers) {
    const selectedServer = getServers(servers);
  
    if (selectedServer) {
      selectedServer.currentRequests++;
      console.log(`Client ${client} connect to ${selectedServer.name}`);
  
      setTimeout(() => {
        selectedServer.currentRequests--;
        console.log(`Client ${client} disconnect ${selectedServer.name}`);
      }, Math.random() * 3000 + 2000);
  
    } else {
      console.log(`Client ${client} cannot connect, no servers available.`);
    }
  }

lruLoadBalancer(mockServers, clients);


