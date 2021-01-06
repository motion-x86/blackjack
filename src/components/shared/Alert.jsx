import React from 'react';
import cx from 'classnames';

import styles from './Alert.module.scss';

const Alert = ({ type, children }) => {
    const className = cx(
        styles.Container,
        type === 'success' && styles.success,
        type === 'critical' && styles.critical
    );

    return <div className={className}>{children}</div>;
};

export { Alert };
