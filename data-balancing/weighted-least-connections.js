import { mockServers, clients } from "./mock-server.js"; 

function weightedLeastConection(servers, clients) {
  if (!servers || servers.length === 0) {
    return null;
  }
  clients.forEach((client, index) => {
    setTimeout(() => handleClientRequest(client, servers), index * 500);
  });
}

function getServers(servers) {
    
    let minRatio = Infinity;
    let selectedServer = null;
  
    for (const server of servers) {
      const ratio = server.connections / server.weight;
      if (ratio < minRatio) {
        minRatio = ratio;
        selectedServer = server;
      }
    }
  
    return selectedServer;
}

function handleClientRequest(client, servers) {
  const selectedServer =  getServers (servers);

  if (selectedServer) {
    selectedServer.connections++;
    console.log(`Client ${client} connect to ${selectedServer.name} (weight: ${selectedServer.weight})`);

    setTimeout(() => {
      selectedServer.connections--;
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);

  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

weightedLeastConection(mockServers, clients);

