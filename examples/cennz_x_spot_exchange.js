///
/// This file includes Js API example functions that are related to the
/// Cennznet X spot exchange module.
///


/// Add some assets to the exchange reserve pool for the trade asset and Core asset.
/// You can some liquidity back in exchange.
/// If the reserve pool is empty (no liquidity), you will put asset_amount of trade asset and core_amount of core asset
/// If there are already liquidity in the reserve pool, the amount of asset to be committed will be calculated from the
/// core amount so the exchange rate is preserved.
async function addLiquidity(keyring, api, asset_id, asset_amount, core_amount) {
    const txHash = await api.tx.cennzxSpot
        .addLiquidity(asset_id, 0, asset_amount, core_amount)
        .signAndSend(keyring.alice);
    console.log(`Adding Liquidity: Trade asset:${asset_id} \nMax trade asset commited:${asset_amount} \nAmount or core asset:${core_amount}`);
}

/// Withdraw some liquidity from an exchange pool and get some trade and core asset back.
async function removeLiquidity(keyring, api, asset_id, amount, min_asset_amount, min_core_amount) {
    if(min_asset_amount == undefined){
        min_asset_amount = 0;
    }
    if(min_core_amount == undefined){
        min_core_amount = 0;
    }

    const txHash = await api.tx.cennzxSpot
        .addLiquidity(asset_id, 0, asset_amount, core_amount)
        .signAndSend(keyring.alice);
    console.log(`Adding Liquidity: Trade asset:${asset_id} \nMax trade asset commited:${asset_amount} \nAmount or core asset:${core_amount}`);
}

/// Get the value of liquidity owned by <account_id> held in <asset_id>'s exchange pool
async function liquidityValue(keyring, api, who, asset_id) {
    let account_id = GetAddress(keyring, who);
    const amount = await api.rpc.cennzx
        .liquidityValue(account_id, asset_id);
    console.log(`${who} for asset:${asset_id} has liquidity of: ${amount}`);
}

/// Get the cost to buy a certain amount of liquidity
async function liquidityPrice(keyring, api, asset_id, amount) {
    let [trade_price, core_price] = await api.rpc.cennzx
        .liquidityPrice(asset_id, amount);
    console.log(`Liquidity: ${amount} for asset ${asset_id} will cost: \n
                 Asset: ${trade_price} and core: ${core_price}`);
}

/// calculate the amount of "asset_to_sell" is required to buy "buy_amount" of "asset_to_buy"
/// Will only query for the price, no exchange will take place.
async function buyPrice(keyring, api, asset_to_buy, buy_amount, asset_to_sell) {
    const price = await api.rpc.cennzx
        .buyPrice(asset_to_buy, buy_amount, asset_to_sell);
    console.log(`Buying asset:${asset_to_buy} amount:${buy_amount} selling asset:${asset_to_sell}`);
    console.log(`The price will be: ${price}`);
}

/// calculate the amount of "asset_to_buy" you can buy by selling "sell_amount" of "asset_to_sell"
/// Will only query for the price, no exchange will take place.
async function sellPrice(keyring, api, asset_to_sell, sell_amount, asset_to_buy) {
    const price = await api.rpc.cennzx
        .sellPrice(asset_to_sell, sell_amount, asset_to_buy);
    console.log(`Selling asset:${asset_to_sell} amount:${sell_amount} buying asset:${asset_to_buy}`);
    console.log(`The price will be: ${price}`);
}

/// Buy buy_amount amount of trade asset:asset_to_buy, selling asset_to_sell.
/// Deposit the exchagned assets into "recipient"'s account
async function buyAsset(keyring, api, recipient, asset_to_sell, asset_to_buy, buy_amount ) {
    const account_id = GetAddress(keyring, recipient);
    await api.tx.cennzxSpot
        .buyAsset(account_id, asset_to_sell, asset_to_buy, buy_amount, 999999999999999);
    console.log(`Buying asset:${asset_to_buy}, amount:${buy_amount}`);
}

/// Sell sell_amount amount of trade asset:asset_to_sell, to buy asset_to_buy.
/// Deposit the exchagned assets into "recipient"'s account
async function sellAsset(keyring, api, recipient, asset_to_sell, asset_to_buy, sell_amount ) {
    const account_id = GetAddress(keyring, recipient);
    await api.tx.cennzxSpot
        .sellAsset(account_id, asset_to_sell, asset_to_buy, sell_amount, 0);
    console.log(`Selling asset:${asset_to_sell}, sell amount:${sell_amount}`);
}


function GetAddress(keyring, account) {
    //un-tested
    let target = keyring.alice.address;
    switch( account ) {
        case 'bob':
            target = keyring.bob.address;
            break;
        case 'charlie':
            target = keyring.charlie.address;
            break;
        case 'dave':
            target = keyring.dave.address;
            break;
        case 'eve':
            target = keyring.eve.address;
            break;
        case 'ferdie':
            target = keyring.ferdie.address;
            break;
        default:
            account = 'alice';
            break;
    }

    return target;
}

module.exports = {addLiquidity, removeLiquidity, liquidityValue, liquidityPrice, buyPrice, sellPrice, buyAsset, sellAsset}