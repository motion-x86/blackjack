import React from 'react';
import PropTypes from 'prop-types';

import styles from './ScoreBoard.module.scss';

const ScoreItem = ({ label, value }) => (
    <div className={styles.ScoreItem}>
        <span className={styles.ScoreItemLabel}>{label}:</span>
        <span className={styles.ScoreItemValue}>{value}</span>
    </div>
);

const ScoreBoard = ({ win, loose, push }) => {
    return (
        <div className={styles.Container}>
            <ScoreItem label="Win" value={win} />
            <ScoreItem label="Loose" value={loose} />
            <ScoreItem label="Push" value={push} />
        </div>
    );
};

ScoreBoard.defaultProps = {
    win: 0,
    loose: 0,
    push: 0
};

ScoreBoard.propTypes = {
    win: PropTypes.number.isRequired,
    loose: PropTypes.number.isRequired,
    push: PropTypes.number.isRequired
};

export { ScoreBoard };
