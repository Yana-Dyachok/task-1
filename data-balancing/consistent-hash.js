import { mockServers, urls } from "./mock-server.js";

function consistentHash(servers, urls) {
  if (!servers || servers.length === 0) {
    return null;
  }

  urls.forEach((client, index) => {
    setTimeout(() => handleClientRequest(client, servers), index * 500);
  });
}


const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
    }
    return h;
  };

function getServers (key, servers, virtualNodes = 3) {
    
      const virtualNodesList = [];
      servers.forEach((server) => {
        for (let i = 0; i < virtualNodes; i++) {
          virtualNodesList.push({
            server,
            hash: hash(`${server.name}-vnode-${i}`),
          });
        }
      });
    
      virtualNodesList.sort((a, b) => a.hash - b.hash);
    
      const keyHash = hash(key);
    
      for (const { server, hash: serverHash } of virtualNodesList) {
        if (keyHash <= serverHash) {
          return server;
        }
      }
    
      return virtualNodesList[0].server;
}

function handleClientRequest(client, servers) {
  const selectedServer = getServers(client, servers);
  if (selectedServer) {
    console.log(`Client ${client} connect to ${selectedServer.name}`);
    setTimeout(() => {
      console.log(`Client ${client} disconnect ${selectedServer.name}`);
    }, Math.random() * 3000 + 2000);
  } else {
    console.log(`Client ${client} cannot connect, no servers available.`);
  }
}

consistentHash(mockServers, urls)