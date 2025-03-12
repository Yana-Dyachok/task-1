import { mockServers, clients, domains } from "./mock-server.js"; 

function dnsBasedLoadBalancing(servers, clients, domains) {
    clients.forEach((client, index) => {
        const domain = domains[index % domains.length]; 
        setTimeout(() => handleClientRequest(client, domain, servers), index * 500);
      });
}

function resolveDNS(domain) {
  const dnsRecords = {
    "example.com": "Server-1",
    "api.example.com": "Server-3",
    "static.example.com": "Server-5",
  };

  return dnsRecords[domain] || null;
}

function getServers (domain, servers) {
    const serverName = resolveDNS(domain);

    if (!serverName) {
      return null;
    }
  
    const selectedServer = servers.find(s => s.name === serverName);
  
    return selectedServer || null;
 }

function handleClientRequest(client, domain, servers) {
  const selectedServer = getServers (domain, servers);

  if (selectedServer) {
    selectedServer.currentRequests++;
    console.log(`Client ${client} connect to ${selectedServer.name} (DNS: ${domain})`);

    setTimeout(() => {
      selectedServer.currentRequests--;
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);

  } else {
    console.log(`Client ${client} cannot connect, domain ${domain} not found.`);
  }
}


dnsBasedLoadBalancing(mockServers, clients, domains);

