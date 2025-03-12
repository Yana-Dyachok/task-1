import { mockServers, clients } from "./mock-server.js"; 

function resourceBased(servers, clients) {
  if (!servers || servers.length === 0) {
    return null;
  }

  clients.forEach((client, index) => {
    setTimeout(() => handleClientRequest(client, servers), index * 500);
  });
}

function getServer (servers) {
    let minLoad = Infinity;
    let selectedServer = null;
  
    for (const server of servers) {
      const totalLoad = server.cpuUsage + server.ramUsage;
      if (totalLoad < minLoad) {
        minLoad = totalLoad;
        selectedServer = server;
      }
    }
  
    return selectedServer;
}

function handleClientRequest(client, servers) {
  const selectedServer = getServer(servers);

  if (selectedServer) {
    console.log(`Client ${client} connect to ${selectedServer.name} CPU=${selectedServer.cpuUsage}, RAM=${selectedServer.ramUsage}`);
    selectedServer.currentRequests++;

    setTimeout(() => {
      selectedServer.currentRequests--;
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);

  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

resourceBased(mockServers, clients)