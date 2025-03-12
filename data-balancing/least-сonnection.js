import { mockServers } from "./mock-server.js";

function leastConnection (servers) {
  if (!servers || servers.length === 0) {
    return null; 
  }
    let minConnections = Infinity;
    let selectedServer = null;
  
    for (const server of servers) {
      if (server.connections < minConnections) {
        minConnections = server.connections;
        selectedServer = server;
      }
    }
  
    return selectedServer;
  }

  console.log(leastConnection(mockServers));


 