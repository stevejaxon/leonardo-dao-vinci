const Web3 =  require('web3');
const Opensea = require('opensea-js');

const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io');

const seaport = new Opensea.OpenSeaPort(provider, {
    networkName: Opensea.Network.Main
});

const tokenAddress = '0x100A1698c3fBb4a1F3B2ED74B5e39741aD233e89';
const startAmount = 100;
const endAmount = 0;

class OpenSeaAuction {

    async auction(tokenId) {
        // Expire this auction one day from now
        const expirationTime = (Date.now() / 1000 + 60 * 60 * 24);
        // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order.
        return await seaport.createSellOrder({ tokenId, tokenAddress, accountAddress, startAmount, endAmount, expirationTime });
    }
}

module.exports = OpenSeaAuction



