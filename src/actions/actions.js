export const NEW_GAME = 'NEW_GAME';
export const HIT = 'HIT';
export const STAY = 'STAY';

export function newGame() {
    return { type: NEW_GAME };
}

export function hit(hand) {
    return { type: HIT, hand };
}

export function stay(hand) {
    return { type: STAY, hand };
}
