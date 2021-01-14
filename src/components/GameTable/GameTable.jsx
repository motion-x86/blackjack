import React, { useReducer, useEffect } from 'react';

import { WinnerBanner } from '../WinnerBanner/WinnerBanner';
import { BlackJackHand } from '../BlackJackHand/BlackJackHand';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { PlayerControls } from '../PlayerControls/PlayerControls';
import { Deck, PlayerHand, BlackJack, PLAYER_ONE, DEALER, PUSH } from '../../game/game';
import { NEW_GAME, HIT, STAY, UPDATE_SCORE_BOARD, hit, stay, newGame, updateScoreBoard } from '../../actions/actions';

import { getScore, postScore, gameOutcomes } from '../../api';

import styles from './GameTable.module.scss';
import { number } from 'prop-types';

function init(scoreBoard) {
    const deck = new Deck();
    const playerCards = [];
    const dealerCards = [];

    playerCards.push(deck.dealCard());
    const dealerFirstCard = deck.dealCard();
    dealerFirstCard.faceUp = true;
    console.log(`Dealer is showing ${dealerFirstCard}`);
    dealerCards.push(dealerFirstCard);
    playerCards.push(deck.dealCard());
    dealerCards.push(deck.dealCard());

    const player = new PlayerHand(false, playerCards);
    const dealer = new PlayerHand(true, dealerCards);

    const initialState = {
        deck: deck,
        player: player,
        dealer: dealer,
        showDealerFirstCard: false,
        winner: null,
        scoreBoard
    };

    calculateWinner(initialState);

    return initialState;
}

function calculateWinner(state) {
    if (state.player.isFinished) {
        // show dealers card when player is done.
        state.showDealerFirstCard = true;

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
            return init(state.scoreBoard);
        case HIT:
            state.player.addCard(state.deck.dealCard());
            calculateWinner(state);
            return { ...state };
        case STAY:
            state.player.stay();
            calculateWinner(state);
            return { ...state };
        case UPDATE_SCORE_BOARD:
            return { ...state, scoreBoard: { ...action.score } };
        default:
            console.log('noop');
    }
}

const saveScore = (winner, dispatch) => {
    if (winner) {
        let payload = null;
        switch (winner) {
            case PLAYER_ONE:
                payload = gameOutcomes.playerWins;
                break;
            case DEALER:
                payload = gameOutcomes.dealerWins;
                break;
            case PUSH:
                payload = gameOutcomes.push;
                break;
            default:
                console.log('Unknown Winner');
        }

        if (payload) {
            postScore(payload).then(resp =>
                dispatch(updateScoreBoard({ win: resp.player, loose: resp.dealer, push: resp.push }))
            );
        }
    }
    console.log('saving score, winner is:', winner);
};

const loadScores = dispatch => {
    getScore().then(score => {
        console.log('ScoreBoard:', score);
        if (score) {
            dispatch(updateScoreBoard({ win: score.player, loose: score.dealer, push: score.push }));
        }
    });
};

const GameTable = () => {
    const [state, dispatch] = useReducer(reducer, {}, init);

    useEffect(() => loadScores(dispatch), []);

    useEffect(() => saveScore(state.winner, dispatch), [state.winner]);

    return (
        <div className={styles.Container}>
            {state.winner && (
                <div className={styles.WinnerBannerContainer}>
                    <WinnerBanner winner={state.winner} onNewHandClick={() => dispatch(newGame())}></WinnerBanner>
                </div>
            )}
            <div className={styles.ScoreBoardContainer}>
                <ScoreBoard {...state.scoreBoard} />
            </div>
            <div className={styles.HandsContainer}>
                <BlackJackHand player={state.dealer} showFirstCard={state.showDealerFirstCard} />
                <div className={styles.CardSpacer} />
                <BlackJackHand player={state.player} dispatch={dispatch} />
            </div>
            <div className={styles.ControlsContainer}>
                <PlayerControls
                    name={'PLAYER 1'}
                    isFinished={state.player.isFinished}
                    onHit={() => dispatch(hit())}
                    onStay={() => dispatch(stay())}
                />
            </div>
        </div>
    );
};

export { GameTable };
