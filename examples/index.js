//Imports functions from other files
const { reportBalances, transfer } = require('./generic_asset.js');

const { Api } = require('@cennznet/api');
const testingPairs = require('@polkadot/keyring/testingPairs');
const keyring = testingPairs.default({ type: 'sr25519'});

if (require.main === module) {
  run("ws://localhost:9944")
    .then(result => process.exit(result))
    .catch(fail => {
    console.error(`Error:`, fail);
    process.exit(fail[0]);
  });
}


function help(){
	console.log(`Enter the command you want to call as arguments.\n
	Supported Commands:
	transfer <amount> <asset_id>: Alice will transfer some money to Bob
	balances <asset_id>: Check current balances for Alice and Bob
	`);
}
async function parseCommand(argv, api){
	const cmd = argv[2];
	console.log(`>>>${cmd}`);
	switch(cmd) {
		case `transfer`:
			await transfer(keyring, api, argv[3], argv[4]);
			break;
		case `balances`:
			await reportBalances(keyring, api, argv[3]);
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
	
	var keepGoing = true;

	const getWord = () => {
		return new Promise(resolve => {
		  rl.question(">>>", function(cmd) {
			  resolve(answer.split(''));
		  });
		});
	  }

	const argv = process.argv;
	await parseCommand(argv, api);

}

