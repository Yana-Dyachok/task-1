import { mockServers, clients } from "./mock-server.js";

function chainedFailover(servers) {
  if (!servers || servers.length === 0) {
    return null;
  }

  clients.forEach((client, index) => {
    setTimeout(() => {
      const availableServers = getServers(servers);
      handleRequest(client, [...availableServers]); 
    }, index * 500);
  });
}

function getServers(servers) {
    return servers.filter((el) => el.isAvailable && el.currentRequests < el.maxRequests);
  }

  function handleRequest(client, availableServers) {
    if (availableServers.length === 0) {
      console.log(`Client ${client} cannot connect, no servers available.`);
      return;
    }

    const server = availableServers.shift(); 

    if (server) {
      server.currentRequests++;
      console.log(`Client ${client} connect to ${server.name}`);

      setTimeout(() => {
        server.currentRequests--;
        console.log(`Client ${client} disconnect ${server.name}`);
      }, Math.random() * 3000 + 2000);

      if (availableServers.length > 0) {
        setTimeout(() => handleRequest(client, availableServers), Math.random() * 1000 + 500);
      }
    } else {
      console.log(`Client ${client} cannot connect, no servers available.`);
    }
  }

chainedFailover(mockServers);