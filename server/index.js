const express = require('express');
const app = express();

app.use(express.json());

let score = {
    player: 0,
    dealer: 0,
    push: 0
};

app.get('/api/score', (req, res) => {
    res.json(score);
});

app.post('/api/score', (req, res) => {
    const body = req.body;

    if (!body.result) {
        throw new Error(`Expected 'result'`);
    }

    switch (body.result) {
        case 'player':
            score.player++;
            break;
        case 'dealer':
            score.dealer++;
            break;
        case 'push':
            score.push++;
            break;
        default:
            throw new Error(`Expected result to be one of player, dealer or push`);
    }

    res.json(score);
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('App is listening on port ' + port);
