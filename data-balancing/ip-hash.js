import { mockServers, ipClients} from "./mock-server.js";

function ipHash(ip, servers) {
    const hash = ip.split('.').reduce((acc, num) => acc + Number(num), 0); 
    return servers[hash % servers.length];
}

function handleClientRequest(clientIP, servers) {
    const selectedServer = ipHash(clientIP, servers);

    if (selectedServer) {
        selectedServer.currentRequests++;
        console.log(`Client ${clientIP} connected to ${selectedServer.name}`);

        setTimeout(() => {
            selectedServer.currentRequests--;
            console.log(`Client ${clientIP} disconnected from ${selectedServer.name}`);
        }, Math.random() * 3000 + 2000);
    } else {
        console.log(`Client ${clientIP} cannot connect.`);
    }
}

function ipHashLoadBalancing(servers, clients) {
    if (!servers || servers.length === 0) {
        return null;
      }
    clients.forEach((client, index) => {
        setTimeout(() => handleClientRequest(client, servers), index * 500);
    });
}

ipHashLoadBalancing(mockServers, ipClients);
