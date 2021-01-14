import React from 'react';
import PropTypes from 'prop-types';

import styles from './PlayingCard.module.scss';

const PlayingCard = ({ card, faceUp }) => {
    const imgSrc = faceUp
        ? `https://deckofcardsapi.com/static/img/${card.code}.png`
        : 'https://i.pinimg.com/originals/09/a5/8d/09a58d561b2a7b92bd506c83414ef1ab.png';

    return (
        <div className={styles.Card}>
            <img className={styles.CardImg} alt={card.toString()} src={imgSrc} />
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
