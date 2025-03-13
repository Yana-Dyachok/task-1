import { mockServers, clients } from "./mock-server.js";

function antColonyOptimization(servers) {
  if (!servers || servers.length === 0) {
    return null;
  }

  const pheromone = servers.map(() => 1.0); 

  const alpha = 1.0; 
  const beta = 2.0;
  const evaporationRate = 0.5; 

  const iterations = 10; 

  for (let iteration = 0; iteration < iterations; iteration++) {
    const probabilities = servers.map((server, index) => {
      const heuristic = 1.0 / (server.currentRequests + 1); 
      return Math.pow(pheromone[index], alpha) * Math.pow(heuristic, beta);
    });

    const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);

    const normalizedProbabilities = probabilities.map((p) => p / totalProbability);

    let cumulativeProbability = 0;
    const randomValue = Math.random();

    let selectedServerIndex = 0;
    for (let i = 0; i < normalizedProbabilities.length; i++) {
      cumulativeProbability += normalizedProbabilities[i];
      if (randomValue <= cumulativeProbability) {
        selectedServerIndex = i;
        break;
      }
    }

    pheromone[selectedServerIndex] += 1.0;

    for (let i = 0; i < pheromone.length; i++) {
      pheromone[i] *= (1 - evaporationRate);
    }
  }

  let bestServerIndex = 0;
  for (let i = 1; i < pheromone.length; i++) {
    if (pheromone[i] > pheromone[bestServerIndex]) {
      bestServerIndex = i;
    }
  }

  return servers[bestServerIndex];
}

function handleClientRequest(client) {
  const selectedServer = antColonyOptimization(mockServers, client);

  if (selectedServer) {
    console.log(`Client ${client} connect to ${selectedServer.name} (ACO)`);
    selectedServer.currentRequests++; 

    setTimeout(() => {
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
      selectedServer.currentRequests--; 
    }, Math.random() * 3000 + 2000);
  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

clients.forEach((client, index) => {
  setTimeout(() => handleClientRequest(client), index * 500);
});