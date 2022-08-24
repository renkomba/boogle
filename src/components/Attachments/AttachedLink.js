import React from 'react';
import Icon from '../Icons/Icon';
import styles from './AttachedLink.module.css';

const AttachedLink = ({ url }) => {
    let languageSites = ['peardeck', 'wizer', 'blooket', 'flipgrid'];
    let specialSuffixes = ['pear', 'lightbulb', 'b', 'circle-plus'];

    url = `https://${url.toLowerCase().startsWith('www') ?
        url : `www.${url}`}`;
    
    let title = url.split('.')[1];
    let type = !languageSites.includes(title) ? 'brand' : 'solid';
    let suffix = !languageSites.includes(title) ? title.toLowerCase()
        : specialSuffixes[languageSites.indexOf(title)].toLowerCase();

    return (
        <a 
            href={url} 
            target='_blank'
            rel='noopener noreferrer'
            aria-label={title}
            className={styles.attached_link}
        >
            <Icon type={type} suffix={suffix.toLowerCase()} />
            {title && title[0].toUpperCase() + title.slice(1)}
        </a>
    );
}

export default AttachedLink;