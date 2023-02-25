import React from 'react';
import styles from '../styles/Avatar.module.css';

// Reusable avatar component for profiles & popular recipes icons

const Avatar = ({ src, height = 45, text }) => {
    return <span>
        <img
            className={styles.Avatar}
            src={src}
            height={height}
            width={height}
            alt="avatar"
        />
        {text}
    </span>;
};

export default Avatar