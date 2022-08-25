import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Input.module.css';

const Input = ({ contentType, inputType, handleToggle }) => {
    // console.log(`Type: ${contentType}\nInput Type: ${inputType}`);
    return (
        <Form.Group className={styles.input_grid}>
            <FloatingLabel
                controlId="quickInput"
                onChange={handleToggle}
                className={styles.input_prompt}
                onKeyDown={ e => e.key === 'Enter' && handleToggle}
                label={`${contentType[0].toUpperCase() + contentType.slice(1)}`}
            >
                <Form.Control type={inputType}
                    className={styles.add_input}
                    min={inputType === 'number' ? 1 : ''}
                ></Form.Control>
            </FloatingLabel>
            <Button type='submit' className={styles.submit_input}>
                <i className="fa-solid fa-plus"></i>
            </Button>
        </Form.Group>
    );
}

export default Input;