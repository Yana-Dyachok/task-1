import { mockServers, clients } from "./mock-server.js"; 

function weightedRoundRobin(servers) {
  if (!servers || servers.length === 0) {
    return null;
  }

  let totalWeight = servers.reduce((sum, server) => sum + server.weight, 0);
  let rand = Math.random() * totalWeight;

  let weightSum = 0;
  for (let server of servers) {
    weightSum += server.weight;
    if (rand < weightSum) {
      return server;
    }
  }

  return null;
}

function handleClientRequest(client) {
  const selectedServer = weightedRoundRobin(mockServers);

  if (selectedServer) {
    selectedServer.currentRequests++;
    console.log(`Client ${client} connect to ${selectedServer.name} (weight: ${selectedServer.weight})`);

    setTimeout(() => {
      selectedServer.currentRequests--;
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);

  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

clients.forEach((client, index) => {
  setTimeout(() => handleClientRequest(client), index * 500);
});

weightedRoundRobin(mockServers);

