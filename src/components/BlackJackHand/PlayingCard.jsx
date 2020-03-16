import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PlayingCard = ({ card, faceUp }) => {
    const [isFaceUp, setIsFaceUp] = useState(faceUp);

    return (
        <div onClick={() => setIsFaceUp(!isFaceUp)}>
            {isFaceUp ? (
                <img alt={card.toString()} src={`https://deckofcardsapi.com/static/img/${card.code}.png`} />
            ) : (
                <img alt={card.toString()} src={`https://deckofcardsapi.com/static/img/XX.png`} />
            )}
        </div>
    );
};

PlayingCard.defaultProps = {
    faceUp: true
};

PlayingCard.propTypes = {
    card: PropTypes.object.isRequired,
    faceUp: PropTypes.bool
};

export { PlayingCard };
