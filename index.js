const { ApiPromise, WsProvider } = require('@polkadot/api');
const PlugRuntimeTypes = require('@plugnet/plug-api-types');
const testingPairs = require('@polkadot/keyring/testingPairs');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

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
  const provider = new WsProvider(address);
  const api = await ApiPromise.create({
    provider,
    types: {
      ...PlugRuntimeTypes.default,
      AttestationTopic: 'U256',
      AttestationValue: 'U256',
     }
  });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  // Get the testing pairs
  const keyring = testingPairs.default({ type: 'ed25519'});

  let [alice_balance, bob_balance] = await Promise.all([
    api.query.balances.account(keyring.alice.address),
    api.query.balances.account(keyring.bob.address),
  ]);

  console.log(`Alice's balance: ${alice_balance.free}`);
  console.log(`Bob's balance: ${bob_balance.free}`);

  console.log(`Alice is transferring 12345 to Bob`);

  console.log(keyring.alice.sign());

  // Sign and send a transfer from Alice to Bob
  // const txHash = await api.tx.attestation.setClaim(keyring.bob.address, '0x11', '65536')
  //   .signAndSend(keyring.alice);
  // // Sign and send a transfer from Alice to Bob
  // const txHash = await api.tx.balances
  //   .transfer(keyring.bob.address, 12345)
  //   .signAndSend(keyring.alice);

  // Show the hash
  //console.log(`Transaction submitted with hash ${txHash}`);

  // Retrieve the chain & node information information via rpc calls
  // [alice_balance, bob_balance] = await Promise.all([
  //   api.query.attestation.values(keyring.alice.address, keyring.bob.address, '0x0000000000000000000000000000000000000000000000000000000000000100'),
  //   api.query.balances.account(keyring.bob.address),
  // ]);

  console.log(`Alice's balance: ${alice_balance}`);
  console.log(`Bob's balance: ${bob_balance.free}`);
}

