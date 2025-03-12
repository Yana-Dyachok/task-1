import { mockServers } from "./mock-server.js";

function priorityBasedLD (servers) {
    if (!servers || servers.length === 0) {
        return null; 
      }
    return servers.sort((a, b) => b.priority - a.priority)[0]; 
}

console.log(priorityBasedLD(mockServers));