import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Input.module.css';

const Input = ({ contentType, inputType, handleToggle }) => {
    // console.log(`Type: ${contentType}\nInput Type: ${inputType}`);
    return (
        <Form>
            <FloatingLabel
                controlId="quickInput"
                label={`New ${contentType[0].toUpperCase() + contentType.slice(1)}`}
                className={styles.inputPrompt}
                onChange={handleToggle}
                onKeyDown={ e => e.key === 'Enter' && handleToggle}
            >
                <Form.Control 
                    type={inputType}
                    min={inputType === 'number' ? 1 : ''}
                ></Form.Control>
            </FloatingLabel>
            <Button type='submit'>
                <i className="fa-solid fa-plus"></i>
            </Button>
        </Form>
    );
}

export default Input;