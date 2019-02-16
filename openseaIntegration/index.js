const OpenSeaAuction = require("./startAuctionOnOpenSea");
const express = require('express');

const app = express();
const port = 3000;

let instance = new OpenSeaAuction();

app.get('/auction/token/:id', async (req, res) => {
    try {
        const order = await instance.auction(id);
        res.json(order);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e)
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


