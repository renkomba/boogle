import React from "react";
import Icon from "../Icons/Icon";
import styles from './AttachedFile.module.css';

const AttachedFile = ({ name }) => {
    let fileIcons = {
        pdf: 'file-pdf',
        jpeg: 'file-image',
        jpg: 'file-image',
        png: 'file-image',
        mp4: 'file-music',
        mp3: 'file-music',
        wav: 'file-music',
        midi: 'file-music',
        xls: 'file-excel',
        doc: 'file-word',
        docx: 'file-word',
        ppt: 'file-powerpoint',
        pptx: 'file-powerpoint',
        other: 'file'
    }

    let fileSuffix = name.split('.')[1];
    let suffix = fileSuffix in fileIcons ? 
        fileIcons[fileSuffix] : fileIcons.other;

    return (
        <div className={styles.file}>
            <p>
                <Icon type='solid' suffix={suffix} />
                <span className={styles.file_name}>
                    {name}
                </span>
            </p>
        </div>
    );
}

export default AttachedFile;