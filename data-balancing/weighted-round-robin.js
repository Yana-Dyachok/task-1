import { mockServers } from "./mock-server.js";

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

console.log(weightedRoundRobin(mockServers));

