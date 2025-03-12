import { mockServers } from "./mock-server.js";

function chainedFailover (servers) {
    if (!servers || servers.length === 0) {
        return null; 
      }
    for (let server of servers) {
        if (server.isAvailable) return server;
    }
    return null;  
}

console.log(chainedFailover(mockServers));