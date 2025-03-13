import { mockServers, clients } from "./mock-server.js";

function leastTimeRemaining(servers, clients) {
  if (!servers || servers.length === 0) {
    console.log("No servers available.");
    return;
  }
  if (!clients || clients.length === 0) {
    console.log("No clients available.");
    return;
  }
  clients.forEach((client, index) => {
    setTimeout(() => handleRequest(client, servers), index * 500);
  });
}

function getServer(servers) {
  if (!servers || servers.length === 0) {
    return null;
  }
  return servers.sort((a, b) => a.timeRemaining - b.timeRemaining)[0];
}

function handleRequest(client, servers) {
  const server = getServer(servers);
  if (server) {
    console.log(`Client ${client} connect to ${server.name} (Least Time Remaining)`);

    setTimeout(() => {
      console.log(`Client ${client} disconnect ${server.name}`);
    }, Math.random() * 3000 + 2000);
  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

leastTimeRemaining(mockServers, clients);