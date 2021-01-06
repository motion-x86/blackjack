import React, { useEffect } from 'react';
import { BlackJackHand } from './components/BlackJackHand/BlackJackHand';

import { getScore } from './api';

function App() {
    useEffect(() => {
        getScore().then(score => {
            console.log(score);
        });
    }, []);

    return (
        <div>
            <BlackJackHand />
        </div>
    );
}

export default App;
