import { mockServers } from "./mock-server.js";

function lruLoadBalancer(servers) {
    if (!servers || servers.length === 0) {
        return null; 
      }
  let minLastUsed = Infinity;
  let selectedServer = null;

  for (const server of servers) {
    if (server.lastUsed < minLastUsed) {
      minLastUsed = server.lastUsed;
      selectedServer = server;
    }
  }

  selectedServer.lastUsed = Date.now();
  return selectedServer;
}


  console.log(lruLoadBalancer(mockServers));

