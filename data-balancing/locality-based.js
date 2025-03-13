import { mockServers, clients, ipClients, serverLocations } from "./mock-server.js";

function isIpInSubnet(ip, subnet) {
  const [subnetIp, subnetMask] = subnet.split("/");
  const ipParts = ip.split(".").map(Number);
  const subnetIpParts = subnetIp.split(".").map(Number);
  const mask = parseInt(subnetMask);

  let maskBits = 0;
  for (let i = 0; i < mask; i++) {
    maskBits = (maskBits << 1) | 1;
  }

  let networkIp = 0;
  let ipClients = 0;

  for (let i = 0; i < 4; i++) {
    networkIp = (networkIp << 8) | subnetIpParts[i];
    ipClients = (ipClients << 8) | ipParts[i];
  }

  const maskedNetworkIp = networkIp & maskBits;
  const maskedipClients = ipClients & maskBits;

  return maskedNetworkIp === maskedipClients;
}

function localityBasedLoadBalancing(ipClients, servers) {
  if (!servers || servers.length === 0) {
    return null;
  }

  clients.forEach((client, index) => {
    setTimeout(() => handleClientRequest(ipClients[index % ipClients.length], client, servers), index * 500);
  });
}

function getServers (ipClients, servers) {
  const availableServers = servers.filter((server) =>
    isIpInSubnet(ipClients, serverLocations[server.name])
  );

  if (availableServers.length > 0) {
    return availableServers[Math.floor(Math.random() * availableServers.length)];
  }

  return servers[Math.floor(Math.random() * servers.length)];
}

function handleClientRequest(ipClients, client, servers) {
  const selectedServer = getServers(ipClients, servers);

  if (selectedServer) {
    console.log(
      `Client ${client} (${ipClients}) connect to ${selectedServer.name}`
    );

    setTimeout(() => {
      console.log(`Client ${client} (${ipClients}) disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);
  } else {
    console.log(`Client ${client} (${ipClients}) cannot connect, no servers available.`);
  }
}

localityBasedLoadBalancing(ipClients, mockServers)