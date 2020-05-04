//Parser for CLI commands

// Required imports
const ArgParse = require('argparse')

function constructBalancesParser(parser) {
    parser.addArgument(
        "asset_id",
        {
            nargs: `?`,
            type: Number,
            action: 'store',
            help: "The Asset ID of Balance to check"
        }
    );
}
//<amount> <asset_id>
function constructTransferParser(parser) {
    parser.addArgument(
        "amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The Amount to transfer"
        },
        "asset_id",
        {
            nargs: `?`,
            type: Number,
            action: 'store',
            help: "The Asset ID to transfer"
        }
    );
}


function help(){
    console.log();
}

function constructParser() {
    let parser = ArgParse.ArgumentParser();

    let subparser = parser.addSubparsers({dest: 'command', title:'Enter the command you want to call as arguments.\n' +
            'Supported Commands:\n' +
            'transfer <amount> <asset_id>: Alice will transfer some money to Bob\n' +
            'balances <asset_id>: Check current balances for Alice and Bob\n'});

    constructBalancesParser(subparser.addParser('balances',{addHelp: true,}));
    constructTransferParser(subparser.addParser('transfer',{addHelp: true,}));

    return parser;
}

function parseCli() {
    const parser = constructParser();
    return parser.parseArgs();
}

if (require.main === module) {
    settings = parseCli()
    console.log(settings)
} else {
    // Export modules for testing
    module.exports = {
        parseCli: parseCli
    }
}
