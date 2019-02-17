const OpenSeaAuction = require("./startAuctionOnOpenSea");
const express = require('express');

const app = express();
const port = 3001;

let instance = new OpenSeaAuction();

app.get('/auction/token/:id', async (req, res) => {
    try {
        const order = await instance.main(req.params.id);
        res.json(order);
    } catch (e) {
        res.status(500).send({ error: 'something blew up' });
        console.log(e);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


