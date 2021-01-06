import axios from 'axios';

const getScore = () => {
    return axios.get('/api/score').then(res => {
        return res.data;
    });
};

export { getScore };
