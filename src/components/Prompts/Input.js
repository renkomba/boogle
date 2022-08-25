import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Input.module.css';

const Input = ({ contentType, inputType, handleToggle }) => {
    // const [input, setInput] = useState('');
    // const handleInput = ({target: {value}}) => {
    //     setInput(input => input + value)
    // }
    // console.log(`Type: ${contentType}\nInput Type: ${inputType}`);
    return (
        <Form.Group className={styles.input_grid}>
            <FloatingLabel
                controlId="quickInput"
                label={`New ${contentType[0].toUpperCase() + contentType.slice(1)}`}
                className={styles.inputPrompt}
                onChange={handleToggle}
                // onKeyDown={ e => e.key === 'Enter' && handleToggle}
            >
                <Form.Control 
                    type={inputType}
                    min={inputType === 'number' ? 1 : ''}
                ></Form.Control>
            </FloatingLabel>
            {/* <Button>
                <i className="fa-solid fa-plus"></i>
            </Button> */}
        </Form.Group>
    );
}

export default Input;