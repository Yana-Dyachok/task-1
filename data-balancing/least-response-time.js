import { mockServers, clients } from "./mock-server.js";

function leastResponseTime(clients, servers) {
  if (!servers || servers.length === 0) {
    console.log("No servers available.");
    return;
  }

  clients.forEach((client, index) => {
    setTimeout(() => handleClientRequest(client, servers), index * 500);
  });
}

function getServers(servers) {
  if (!servers || servers.length === 0) {
    return null;
  }

  return servers.reduce((minServer, server) => {
    if (!minServer.responseTime || !minServer.currentRequests) {
      return server; 
    }
    if (!server.responseTime || !server.currentRequests) {
      return minServer; 
    }

    const minScore = minServer.responseTime + minServer.currentRequests;
    const serverScore = server.responseTime + server.currentRequests;

    return serverScore < minScore ? server : minServer;
  });
}

function handleClientRequest(client, servers) {
  const selectedServer = getServers(servers);

  if (selectedServer) {
    console.log(`Client ${client} connect to ${selectedServer.name}`);
    selectedServer.currentRequests++;

    setTimeout(() => {
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
      selectedServer.currentRequests--;
    }, Math.random() * 3000 + 2000);
  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

leastResponseTime(clients, mockServers);