import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ disabled, children, classes, onClick }) => {
    const className = cx(styles.Base, classes);

    return (
        <button type="button" className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
Button.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    classes: PropTypes.string,
    onClick: PropTypes.func
};

export { Button };
