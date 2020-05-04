const { Api } = require('@cennznet/api');
const testingPairs = require('@polkadot/keyring/testingPairs');

if (require.main === module) {
  run("ws://localhost:9944")
    .then(result => process.exit(result))
    .catch(fail => {
    console.error(`Error:`, fail);
    process.exit(fail[0]);
  });
}

async function run(address) {
  // Initialise the provider to connect to the local node
  console.log(`Connecting to ${address}`);

  // Create the API and wait until ready
  const api = await Api.create({
    provider: address
  });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

