import React, { Fragment, useReducer } from 'react';

import { PlayingCard } from '../PlayingCard/PlayingCard';
import { Alert } from '../shared/Alert';

import { Deck, PlayerHand } from '../../game/game';
import { NEW_GAME, HIT, STAY, newGame, hit, stay } from '../../actions/actions';

import styles from './BlackJackHand.module.scss';

function init() {
    const deck = new Deck();
    return {
        deck: deck,
        hand: new PlayerHand(false, [deck.dealCard(), deck.dealCard()])
    };
}

function reducer(state, action) {
    switch (action.type) {
        case NEW_GAME:
            return init();
        case HIT:
            state.hand.addCard(state.deck.dealCard());
            return { ...state };
        case STAY:
            state.hand.stay();
            return { ...state };
        default:
            console.log('noop');
    }
}

const BlackJackHand = () => {
    const [state, dispatch] = useReducer(reducer, {}, init);

    return (
        <div className={styles.Container}>
            {state.hand.isBust && <Alert type="critical">Bust!</Alert>}
            {state.hand.isBlackJack && <Alert type="success">Black Jack!</Alert>}
            <div className={styles.Cards}>
                {state.hand.cards.map(card => (
                    <Fragment key={card.code}>
                        <PlayingCard card={card} />
                    </Fragment>
                ))}
            </div>
            <div className={styles.MenuContainer}>
                <div className={styles.Menu}>
                    <button type="button" onClick={() => dispatch(hit())} disabled={state.hand.isFinished}>
                        Hit
                    </button>
                    <button type="button" onClick={() => dispatch(stay())} disabled={state.hand.isFinished}>
                        Stay
                    </button>
                    <button type="button" onClick={() => dispatch(newGame())} disabled={!state.hand.isFinished}>
                        New Game
                    </button>
                </div>
                <strong>Score: {state.hand.score}</strong>
            </div>
        </div>
    );
};

export { BlackJackHand };
