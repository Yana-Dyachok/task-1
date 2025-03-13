import { mockServers, clients, ipClients, serverRegions, clientRegions} from "./mock-server.js";

function globalServerLoadBalancing(clientIp, servers) {
  if (!servers || servers.length === 0) {
    return null;
  }

  clients.forEach((client, index) => {
    setTimeout(() => handleClientRequest(ipClients[index % ipClients.length], client, servers), index * 500);
  });
}

function getServers (clientIp, servers) {
    const clientRegion = clientRegions[clientIp];

  if (!clientRegion) {
    return servers[Math.floor(Math.random() * servers.length)];
  }

  const availableServers = servers.filter(
    (server) => serverRegions[server.name] === clientRegion
  );

  if (availableServers.length > 0) {
    return availableServers[Math.floor(Math.random() * availableServers.length)];
  }

  return servers[Math.floor(Math.random() * servers.length)];
}

function handleClientRequest(clientIp, client, servers) {
  const selectedServer = getServers(clientIp, servers);

  if (selectedServer) {
    console.log(
      `Client ${client} (${clientIp}) connect to ${selectedServer.name} (GSLB)`
    );
    setTimeout(() => {
      console.log(`Client ${client} (${clientIp}) disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);
  } else {
    console.log(`Client ${client} (${clientIp}) cannot connect, no servers available.`);
  }
}

globalServerLoadBalancing(ipClients, mockServers)