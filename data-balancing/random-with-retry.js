import { mockServers, clients } from "./mock-server.js";

function randomWithRetry(clients, servers) {
    if (!servers || servers.length === 0) {
        return null;
      }
    clients.forEach((client, index) => {
        setTimeout(() => handleClientRequest(client, servers), index * 500);
    });
}

function getServers (servers, maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
        const randomIndex = Math.floor(Math.random() * servers.length);
        const server = servers[randomIndex];

        if (server.currentRequests < server.maxRequests) {
            return server;
        }

        retries++;
    }

    return null;
}

function handleClientRequest(client, servers) {
    const selectedServer = getServers (servers);

    if (selectedServer) {
        console.log(`Client ${client} connect to ${selectedServer.name} (Random with Retry)`);
        selectedServer.currentRequests++;

        setTimeout(() => {
            console.log(`Client ${client} disconnect ${selectedServer.name}`);
            selectedServer.currentRequests--;
        }, Math.random() * 3000 + 2000);
    } else {
        console.log(`Client ${client} cannot connect, all servers are busy.`);
    }
}

randomWithRetry(clients, mockServers)