import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../shared/Button/Button';
import { Alert } from '../shared/Alert/Alert';
import { PLAYER_ONE, DEALER, PUSH } from '../../game/game';

import styles from './WinnerBanner.module.scss';

const WinnerBanner = ({ winner, onNewHandClick }) => {
    function getDetails(winner) {
        switch (winner) {
            case DEALER:
                return { type: 'critical', text: 'Dealer Wins' };
            case PLAYER_ONE:
                return { type: 'success', text: 'Player Wins' };
            case PUSH:
                return { type: 'default', text: 'Push', buttonClass: styles.PushButton };
        }
    }

    const details = getDetails(winner);

    return (
        <Alert type={details.type}>
            <div>{details.text}</div>
            <div>
                <Button onClick={onNewHandClick} classes={details.buttonClass}>
                    New Hand
                </Button>
            </div>
        </Alert>
    );
};

WinnerBanner.propTypes = {
    winner: PropTypes.string.isRequired,
    onNewHandClick: PropTypes.func.isRequired
};

export { WinnerBanner };
