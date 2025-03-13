import { mockServers, urls } from "./mock-server.js";

function urlHash(url, servers) {
    const hash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0); 
    return servers[hash % servers.length]; 
}

function handleRequest(url, servers) {
    const selectedServer = urlHash(url, servers);

    if (selectedServer) {
        selectedServer.currentRequests++;
        console.log(`Request for ${url} handled by ${selectedServer.name}`);

        setTimeout(() => {
            selectedServer.currentRequests--;
            console.log(`Request for ${url} completed on ${selectedServer.name}`);
        }, Math.random() * 3000 + 2000);
    } else {
        console.log(`No server available for ${url}`);
    }
}

function urlHashLoadBalancing(servers, urls) {
    urls.forEach((url, index) => {
        setTimeout(() => handleRequest(url, servers), index * 500);
    });
}

urlHashLoadBalancing(mockServers, urls);
