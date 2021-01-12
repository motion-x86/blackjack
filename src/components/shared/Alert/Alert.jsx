import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Alert.module.scss';

const Alert = ({ type, children }) => {
    const className = cx(
        styles.Container,
        type === 'success' && styles.success,
        type === 'critical' && styles.critical,
        type === 'default' && styles.default
    );

    return <div className={className}>{children}</div>;
};
Alert.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export { Alert };
