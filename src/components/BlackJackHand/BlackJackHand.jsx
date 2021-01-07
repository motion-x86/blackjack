import React, { useReducer } from 'react';

import { PlayingCard } from '../PlayingCard/PlayingCard';
import { WinnerBanner } from '../WinnerBanner/WinnerBanner';
import { Button } from '../shared/Button/Button';

import { Deck, PlayerHand, BlackJack } from '../../game/game';
import { NEW_GAME, HIT, STAY, newGame, hit, stay } from '../../actions/actions';

import styles from './BlackJackHand.module.scss';

function init() {
    const deck = new Deck();
    const playerCards = [];
    const dealerCards = [];

    playerCards.push(deck.dealCard());
    dealerCards.push(deck.dealCard());
    playerCards.push(deck.dealCard());
    dealerCards.push(deck.dealCard());

    const player = new PlayerHand(false, playerCards);
    const dealer = new PlayerHand(true, dealerCards);

    const initialState = {
        deck: deck,
        player: player,
        dealer: dealer,
        winner: null
    };

    calculateWinner(initialState);
    return initialState;
}

function calculateWinner(state) {
    if (state.player.isFinished) {
        if (!state.player.isBust) {
            while (!state.dealer.isFinished) {
                state.dealer.addCard(state.deck.dealCard());
            }
            console.log(`Dealer score: ${state.dealer.score}`);
        }

        state.winner = BlackJack.calculateWinner(state.player, state.dealer);
    }
}

function reducer(state, action) {
    switch (action.type) {
        case NEW_GAME:
            return init();
        case HIT:
            state.player.addCard(state.deck.dealCard());
            calculateWinner(state);
            return { ...state };
        case STAY:
            state.player.stay();
            calculateWinner(state);
            return { ...state };
        default:
            console.log('noop');
    }
}

const BlackJackHand = () => {
    const [state, dispatch] = useReducer(reducer, {}, init);

    return (
        <div className={styles.Container}>
            {state.winner && (
                <div className={styles.WinnerBannerContainer}>
                    <WinnerBanner winner={state.winner} onNewHandClick={() => dispatch(newGame())}></WinnerBanner>
                </div>
            )}
            <div className={styles.ScoreContainer}>
                <div className={styles.Score}>
                    {state.player.score}
                    <span></span>
                </div>
            </div>
            <div className={styles.Cards}>
                {state.player.cards.map((card, index) => (
                    <div key={card.code} className={styles.Card}>
                        <PlayingCard card={card} />
                    </div>
                ))}
            </div>
            <div className={styles.MenuContainer}>
                <div>
                    <Button
                        onClick={() => dispatch(hit())}
                        disabled={state.player.isFinished}
                        classes={styles.HitButton}
                    >
                        Hit
                    </Button>
                    <div className={styles.Spacer}></div>
                    <Button
                        onClick={() => dispatch(stay())}
                        disabled={state.player.isFinished}
                        classes={styles.StayButton}
                    >
                        Stay
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { BlackJackHand };
