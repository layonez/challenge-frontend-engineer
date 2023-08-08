import cx from 'classnames';
import React, { PropsWithChildren } from 'react';
import styles from './Card.module.css';

const Card: React.FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    return <div className={cx(styles.card, className)}>{children}</div>;
};

export default Card;
