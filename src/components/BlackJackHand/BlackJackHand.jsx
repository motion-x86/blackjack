import React, { Fragment, useReducer } from 'react';
import styled from '@emotion/styled';

import { PlayingCard } from './PlayingCard';
import { Spacer } from '../Shared/Spacer';

import { Deck, PlayerHand } from '../../game/game';
import { NEW_GAME, HIT, STAY, newGame, hit, stay } from '../../actions/actions';

const Container = styled('div')({
    display: 'inline-block'
});

const MenuContainer = styled('div')({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const Menu = styled('div')({
    display: 'flex',
    button: {
        width: '100px',
        padding: '8px 12px'
    }
});

const Cards = styled('div')({
    padding: '16px 0',
    display: 'flex'
});

const Score = styled('div')({
    fontWeight: 600
});

const Alert = styled('div')(props => ({
    padding: '16px 0',
    margin: '0 16px',
    fontWeight: 600,
    fontSize: '24px',
    textAlign: 'center',
    backgroundColor: props.bgColor,
    color: 'white'
}));

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
        <Container>
            {state.hand.isBust && <Alert bgColor="red">Bust!</Alert>}
            {state.hand.isBlackJack && <Alert bgColor="green">Black Jack!</Alert>}
            <Cards>
                <Spacer />
                {state.hand.cards.map(card => (
                    <Fragment key={card.code}>
                        <PlayingCard card={card} />
                        <Spacer />
                    </Fragment>
                ))}
            </Cards>
            <MenuContainer>
                <Menu>
                    <button type="button" onClick={() => dispatch(hit())} disabled={state.hand.isFinished}>
                        Hit
                    </button>
                    <Spacer />
                    <button type="button" onClick={() => dispatch(stay())} disabled={state.hand.isFinished}>
                        Stay
                    </button>
                    <Spacer />
                    <button type="button" onClick={() => dispatch(newGame())} disabled={!state.hand.isFinished}>
                        New Game
                    </button>
                </Menu>
                <Score>Score: {state.hand.score}</Score>
            </MenuContainer>
        </Container>
    );
};

export { BlackJackHand };
