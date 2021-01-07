import React from 'react';
import PropTypes from 'prop-types';

const PlayingCard = ({ card, faceUp }) => {
    const code = faceUp ? card.code : 'XX';

    return (
        <div>
            <img alt={card.toString()} src={`https://deckofcardsapi.com/static/img/${code}.png`} />
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
