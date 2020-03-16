export const PLAYER_ONE = 'PlayerOne';
export const DEALER = 'Dealer';
export const PUSH = 'Push';

const suits = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

export class Card {
    _suit;
    _rank;

    constructor(suit, rank) {
        this._suit = suit;
        this._rank = rank;
    }

    get rank() {
        return this._rank;
    }

    get suit() {
        return this._suit;
    }

    get code() {
        const rankCode = this._rank === 10 ? '0' : this._rank.toString()[0];
        const suitCode = this._suit[0];
        return `${rankCode}${suitCode}`;
    }

    value() {
        if (['Jack', 'Queen', 'King'].includes(this._rank)) {
            return [10];
        } else if (this._rank === 'Ace') {
            return [1, 11];
        } else {
            return [this._rank];
        }
    }

    valueOf() {
        if (['Jack', 'Queen', 'King'].includes(this._rank)) {
            return 10;
        } else if (this._rank === 'Ace') {
            return 11;
        } else {
            return this._rank;
        }
    }

    toString() {
        return `${this._rank} of ${this._suit}`;
    }
}

export class Deck {
    _deck = [];

    constructor() {
        for (let suit in suits) {
            for (let rank in ranks) {
                this._deck.push(new Card(suits[suit], ranks[rank]));
            }
        }
        this._shuffle();
    }

    cardsLeft() {
        return this._deck.length;
    }

    dealCard() {
        return this._deck.pop();
    }

    _shuffle() {
        const deck = this._deck;
        let m = deck.length,
            i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            [deck[m], deck[i]] = [deck[i], deck[m]];
        }
    }
}

export class PlayerHand {
    _cards;
    _isDealer;
    _isFinished = false;
    _isBlackJack = false;
    _isBust = false;
    _score = 0;

    constructor(isDealer, initialCards) {
        this._isDealer = isDealer;
        this._cards = [].concat(initialCards);
        this._isFinished = false;
        this._scoreHand();

        if (this._score === 21) {
            this._isBlackJack = true;
            this._isFinished = true;
        }
    }

    get cards() {
        return this._cards;
    }

    get isDealer() {
        return this._isDealer;
    }

    get isBlackJack() {
        return this._isBlackJack;
    }

    get isBust() {
        return this._isBust;
    }

    get isFinished() {
        return this._isFinished;
    }

    get score() {
        return this._score;
    }

    stay() {
        this._isFinished = true;
    }

    addCard(card) {
        this._cards.push(card);
        this._scoreHand();
    }

    _scoreHand() {
        this._score = 0;

        let cards = this._cards.slice(0).sort((a, b) => {
            return a.valueOf() - b.valueOf();
        });

        cards.forEach(card => {
            let cardValues = card.value();

            if (cardValues.length === 1) {
                this._score += cardValues[0];
            } else {
                if (this._score + cardValues[1] <= 21) {
                    this._score += cardValues[1];
                } else {
                    this._score += cardValues[0];
                }
            }
        });

        if (this._isDealer && this._score > 16) {
            this._isFinished = true;
        }

        if (this._score > 21) {
            this._isBust = true;
            this._isFinished = true;
        }
    }
}

export class BlackJack {
    static calculateWinner(playerOne, dealer) {
        if (!playerOne.isFinished) {
            return null;
        }

        if (playerOne.isBust) {
            return DEALER;
        }

        if (playerOne.isBlackJack && !dealer.isBlackJack) {
            return PLAYER_ONE;
        }

        if (!playerOne.isBust && dealer.isBust) {
            return PLAYER_ONE;
        }

        if (!dealer.isFinished) {
            return null;
        }

        if (playerOne.score > dealer.score) {
            return PLAYER_ONE;
        } else if (playerOne.score === dealer.score) {
            return PUSH;
        } else {
            return DEALER;
        }
    }
}
