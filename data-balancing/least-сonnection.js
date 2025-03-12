import { mockServers, clients } from "./mock-server.js";

function leastConnection(servers, clients) {

  function getServer() {
    return servers.sort((a, b) => a.connections - b.connections)[0];
  }

  function handleRequest(client) {
      const server = getServer();
      console.log(`Client ${client} connect to  ${server.name} (conctions: ${server.connections})`);
      server.connections++;

      setTimeout(() => {
          server.connections--;
          console.log(`Client ${client} disconnect ${server.name}`);
      }, Math.random() * 3000 + 2000);
  }

  clients.forEach((client, index) => {
      setTimeout(() => handleRequest(client), index * 500);
  });
}


leastConnection(mockServers, clients);
