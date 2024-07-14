import os from 'node:os';

const deviceLocalIp = Object.values(os.networkInterfaces())
  .flatMap(networkInterface => networkInterface || [])
  .filter(networkAddress => networkAddress.family === 'IPv4' && !networkAddress.internal)[0].address || null;

export default {
  extra: {
    backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL || `http://${deviceLocalIp}:4000`
  },
};
