import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../shared/Button/Button';

import styles from './PlayerControls.module.scss';

const PlayerControls = ({ name, isFinished, onHit, onStay }) => {
    return (
        <div className={styles.MenuContainer}>
            <div>
                <span className={styles.MenuTitle}>{name}</span>
            </div>
            <div className={styles.MenuButtonContainer}>
                <Button onClick={onHit} disabled={isFinished} classes={styles.HitButton}>
                    Hit
                </Button>
                <div className={styles.Spacer}></div>
                <Button onClick={onStay} disabled={isFinished} classes={styles.StayButton}>
                    Stay
                </Button>
            </div>
        </div>
    );
};

PlayerControls.propTypes = {
    name: PropTypes.string.isRequired,
    isFinished: PropTypes.bool.isRequired,
    onHit: PropTypes.func.isRequired,
    onStay: PropTypes.func.isRequired
};

export { PlayerControls };
