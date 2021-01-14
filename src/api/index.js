import axios from 'axios';

const getScore = () => {
    return axios.get('/api/score').then(res => {
        return res.data;
    });
};

const gameOutcomes = {
    playerWins: 'player',
    dealerWins: 'dealer',
    push: 'push'
}

const postScore = (outcome) => {
    return axios.post('/api/score', {result: outcome}).then(res => {
        return res.data;
    });
};

export { getScore, postScore, gameOutcomes};
