import { mockServers } from "./mock-server.js";

function resourceBased(servers) {
    if (!servers || servers.length === 0) {
        return null; 
      }
  let minLoad = Infinity;
  let selectedServer = null;

  for (const server of servers) {
    const totalLoad = server.cpuUsage + server.ramUsage;
    if (totalLoad < minLoad) {
      minLoad = totalLoad;
      selectedServer = server;
    }
  }

  return selectedServer;
}

const selectedServer = resourceBased(mockServers);

if (selectedServer) {
  console.log("Server:", selectedServer.name);
  console.log("CPU:", selectedServer.cpuUsage);
  console.log("RAM:", selectedServer.ramUsage);

} else {
  console.log("No server");
}

