import { Card, Deck, PlayerHand, BlackJack, PLAYER_ONE, DEALER, PUSH } from './game';

test('Ace value() returns 1 and 11', () => {
    const card = new Card('SPADES', 'Ace');
    const value = card.value();
    expect(value[0]).toBe(1);
    expect(value[1]).toBe(11);
});

test('Face cards value() returns 10', () => {
    const jack = new Card('SPADES', 'Jack');
    const queen = new Card('SPADES', 'Queen');
    const king = new Card('SPADES', 'King');

    expect(jack.value()[0]).toBe(10);
    expect(queen.value()[0]).toBe(10);
    expect(king.value()[0]).toBe(10);
});

test('New deck should contain all cards', () => {
    const deck = new Deck();
    expect(deck.cardsLeft()).toBe(52);
});

test('Dealing a card should decrease the deck size by 1', () => {
    const deck = new Deck();
    deck.dealCard();
    expect(deck.cardsLeft()).toBe(51);
});

test('Player hand detects black jack', () => {
    const ace = new Card('SPADES', 'Ace');
    const ten = new Card('HEARTS', 10);
    let hand = new PlayerHand(false, [ace, ten]);
    expect(hand.isBlackJack).toBe(true);

    const king = new Card('HEARTS', 'King');
    hand = new PlayerHand(false, [king, ace]);
    expect(hand.isBlackJack).toBe(true);

    hand = new PlayerHand(false, [ten, king]);
    expect(hand.isBlackJack).toBe(false);
});

test('Player hand detects bust', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const king = new Card('HEARTS', 'King');

    let hand = new PlayerHand(false, [nine, ten]);
    expect(hand.isBust).toBe(false);
    hand.addCard(king);
    expect(hand.isBust).toBe(true);
});

test('Player hand detects isFinished when black jack', () => {
    const ace = new Card('SPADES', 'Ace');
    const ten = new Card('HEARTS', 10);
    const king = new Card('HEARTS', 'King');

    let hand = new PlayerHand(false, [ace, ten]);
    expect(hand.isBlackJack).toBe(true);
    expect(hand.isFinished).toBe(true);

    hand = new PlayerHand(false, [ten, king]);
    expect(hand.isFinished).toBe(false);
});

test('Player hand detects isFinished when bust', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const king = new Card('HEARTS', 'King');

    let hand = new PlayerHand(false, [nine, ten]);
    expect(hand.isFinished).toBe(false);
    hand.addCard(king);
    expect(hand.isBust).toBe(true);
    expect(hand.isFinished).toBe(true);
});

test('Player hand detects isFinished when stay', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);

    let hand = new PlayerHand(false, [nine, ten]);
    expect(hand.isFinished).toBe(false);
    hand.stay();
    expect(hand.isFinished).toBe(true);
});

test('Dealer hand detects isFinished when >= 17', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const six = new Card('CLUBS', 6);
    const five = new Card('CLUBS', 5);
    const two = new Card('SPADES', 2);

    let hand = new PlayerHand(true, [nine, ten]);
    expect(hand.isFinished).toBe(true);

    hand = new PlayerHand(true, [nine, six]);
    expect(hand.isFinished).toBe(false);
    hand.addCard(five);
    expect(hand.isFinished).toBe(true);

    hand = new PlayerHand(true, [ten, five]);
    expect(hand.isFinished).toBe(false);
    hand.addCard(two);
    expect(hand.isFinished).toBe(true);
});

test('Player hand scores correctly', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const king = new Card('HEARTS', 'King');

    let hand = new PlayerHand(false, [nine, ten]);

    expect(hand.score).toBe(19);

    hand.addCard(king);
    expect(hand.score).toBe(29);
});

test('Player hand scores aces correctly', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const ace = new Card('CLUBS', 'Ace');

    let hand = new PlayerHand(false, [nine, ace]);

    expect(hand.score).toBe(20);

    hand.addCard(ten);
    expect(hand.score).toBe(20);

    hand.addCard(ace);
    expect(hand.score).toBe(21);
});

test('Player ones loses if they bust', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const jack = new Card('SPADES', 'Jack');
    const ace = new Card('CLUBS', 'Ace');
    const eight = new Card('CLUBS', 8);

    const playerOne = new PlayerHand(false, [nine, jack]);
    const dealer = new PlayerHand(true, [eight, ace]);
    playerOne.addCard(ten);
    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(DEALER);
});

test('Player ones wins if they blackjack', () => {
    const ten = new Card('HEARTS', 10);
    const jack = new Card('SPADES', 'Jack');
    const ace = new Card('CLUBS', 'Ace');
    const eight = new Card('CLUBS', 8);

    const playerOne = new PlayerHand(false, [ace, jack]);
    const dealer = new PlayerHand(true, [eight, jack]);
    playerOne.addCard(ten);
    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(PLAYER_ONE);
});

test('Push if both player one and dealer blackjack', () => {
    const ten = new Card('HEARTS', 10);
    const jack = new Card('SPADES', 'Jack');
    const ace = new Card('CLUBS', 'Ace');

    const playerOne = new PlayerHand(false, [ace, jack]);
    const dealer = new PlayerHand(true, [ace, ten]);

    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(PUSH);
});

test('Player one wins with higher score than dealer', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const jack = new Card('SPADES', 'Jack');
    const eight = new Card('CLUBS', 8);

    const playerOne = new PlayerHand(false, [nine, jack]);
    const dealer = new PlayerHand(true, [eight, ten]);

    playerOne.stay();

    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(PLAYER_ONE);
});

test('Player one wins if dealer busts', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const jack = new Card('SPADES', 'Jack');
    const eight = new Card('CLUBS', 8);
    const four = new Card('HEARTS', 4);

    const playerOne = new PlayerHand(false, [nine, jack]);
    const dealer = new PlayerHand(true, [four, ten]);

    playerOne.stay();
    dealer.addCard(eight);

    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(PLAYER_ONE);
});

test('Dealer wins with higher score than player one', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const jack = new Card('SPADES', 'Jack');
    const eight = new Card('CLUBS', 8);

    const playerOne = new PlayerHand(false, [eight, jack]);
    const dealer = new PlayerHand(true, [nine, ten]);

    playerOne.stay();

    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(DEALER);
});

test('Push if player one is equal to dealer', () => {
    const nine = new Card('CLUBS', 9);
    const ten = new Card('HEARTS', 10);
    const ace = new Card('SPADES', 'Ace');
    const eight = new Card('CLUBS', 8);

    const playerOne = new PlayerHand(false, [nine, ten]);
    const dealer = new PlayerHand(true, [eight, ace]);

    playerOne.stay();

    expect(BlackJack.calculateWinner(playerOne, dealer)).toBe(PUSH);
});
