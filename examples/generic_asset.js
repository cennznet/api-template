///
/// This file includes Js API example functions that are related to the 
/// Generic Asset module.
///

const Asset1 = 16000;
const Asset2 = 16001;

async function reportBalances(keyring, api, asset_id) {
	if(asset_id == undefined){
		asset_id = Asset1;
	}

	let [a, b] = await Promise.all([
		api.query.genericAsset.freeBalance(asset_id, keyring.alice.address),
		api.query.genericAsset.freeBalance(asset_id, keyring.bob.address),
	]);

	console.log(`Asset:${asset_id}: A: ${a}, B:${b}`);

}

async function transfer(keyring, api, amount, asset_id) {
	if(amount == undefined){
		amount = 1_500_000_000;
	}
	if(asset_id == undefined){
		asset_id = Asset1;
	}
	const txHash = await api.tx.genericAsset
		.transfer(asset_id, keyring.bob.address, amount)
		.signAndSend(keyring.alice);
	console.log(`Transfer: A -> B for ${amount}, Asset:${asset_id}`);
}

module.exports = {reportBalances, transfer}