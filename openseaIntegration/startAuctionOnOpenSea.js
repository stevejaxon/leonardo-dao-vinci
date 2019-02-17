require('dotenv').config();
const opensea = require('opensea-js');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const MnemonicWalletSubprovider = require('@0x/subproviders').MnemonicWalletSubprovider;
const RPCSubprovider = require('web3-provider-engine/subproviders/rpc');
const Web3ProviderEngine = require('web3-provider-engine');
const MNEMONIC = process.env.MNENOMIC;
const INFURA_KEY = 'Iw4pUdWfzz9ZxddqpXrS';
const NETWORK = Network.Rinkeby;

const BASE_DERIVATION_PATH = `44'/60'/0'/0`;
const mnemonicWalletSubprovider = new MnemonicWalletSubprovider({ mnemonic: MNEMONIC, baseDerivationPath: BASE_DERIVATION_PATH});
const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: 'https://rinkeby.infura.io/' + INFURA_KEY,
});

const providerEngine = new Web3ProviderEngine()
providerEngine.addProvider(mnemonicWalletSubprovider)
providerEngine.addProvider(infuraRpcSubprovider)
providerEngine.start();

const seaport = new OpenSeaPort(providerEngine, {
    networkName: Network.Rinkeby
}, (arg) => console.log(arg));

const tokenAddress = '0x100a1698c3fbb4a1f3b2ed74b5e39741ad233e89';
const accountAddress = '0xf0f2077bc2361af6ae805609111c2b7f1594a74b';
const startAmount = 100;
const endAmount = 0;

class OpenSeaAuction {

    async auction(tokenId) {
        console.log('about to call createSellOrder')
        // Expire this auction one day from now
        const expirationTime = (Date.now() / 1000 + 60 * 60 * 24);
        // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order.
        return await seaport.createSellOrder({ tokenId, tokenAddress, accountAddress, startAmount, endAmount, expirationTime });
    }
}

module.exports = OpenSeaAuction;



