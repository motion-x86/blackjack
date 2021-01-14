import React from 'react';
import PropTypes from 'prop-types';

import { PlayingCard } from '../PlayingCard/PlayingCard';

import styles from './BlackJackHand.module.scss';

const isFaceUp = (player, showFirstCard, index) => !(player.isDealer && index === 0 && !showFirstCard);
const scoreVal = (player, showFirstCard) => (player.isDealer ? (showFirstCard ? player.score : 'XX') : player.score);

const BlackJackHand = ({ player, showFirstCard, dispatch }) => {
    return (
        <div className={styles.HandContainer}>
            <div className={styles.ScoreContainer}>
                <div className={styles.Score}>
                    {scoreVal(player, showFirstCard)}
                    <span></span>
                </div>
            </div>
            <div className={styles.Cards}>
                {player.cards.map((card, index) => (
                    <div key={card.code} className={styles.Card}>
                        <PlayingCard card={card} faceUp={isFaceUp(player, showFirstCard, index)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

BlackJackHand.defaultProps = {
    showFirstCard: true
};

BlackJackHand.propTypes = {
    player: PropTypes.object.isRequired,
    showFirstCard: PropTypes.bool.isRequired,
    dispatch: PropTypes.func
};

export { BlackJackHand };
