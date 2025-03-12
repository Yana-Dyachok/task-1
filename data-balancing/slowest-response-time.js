import { mockServers, clients } from "./mock-server.js";

function slowestResponseTime(servers, clients) {
    if (!servers || servers.length === 0) {
        return null; 
      }
    
      clients.forEach((client, index) => {
          setTimeout(() => handleRequest(client, servers), index * 500);
      });
  }

  function getServer(servers) {
    return servers.sort((a, b) => b.responseTime - a.responseTime)[0];
  }

  function handleRequest(client, servers) {
      const server = getServer(servers);
      console.log(`Client ${client} connect to  ${server.name}`);

      setTimeout(() => {
          console.log(`Client ${client} disconnect ${server.name}`);
      }, Math.random() * 3000 + 2000);
  }


slowestResponseTime(mockServers, clients);


 