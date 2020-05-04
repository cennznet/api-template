//Imports functions from other files
const { reportBalances, transfer } = require('./generic_asset.js');

const { Api } = require('@cennznet/api');
const testingPairs = require('@polkadot/keyring/testingPairs');
const keyring = testingPairs.default({ type: 'sr25519'});
const cli = require('./cli.js');

if (require.main === module) {
  run("ws://localhost:9944")
    .then(result => process.exit(result))
    .catch(fail => {
    console.error(`Error:`, fail);
    process.exit(fail[0]);
  });
}

async function parseCommand(settings, api){
	console.log(`${settings}`);
	switch(settings.command) {
		case `transfer`:
			await transfer(keyring, api, settings.amount, settings.asset_id);
			break;
		case `balances`:
			await reportBalances(keyring, api, settings.asset_id);
			break;
		default:
			help();
	}
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
	
	const settings = cli.parseCli();

	await parseCommand(settings, api);

}

