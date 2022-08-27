import React, { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import styles from './Input.module.css';
// import Button from 'react-bootstrap/Button';

const Input = ({ contentType, inputType, handleToggle }) => {
    const [input, setInput] = useState('');

    const handleInput = ({target: {value}}) => setInput(value);
    
    return (
        <Form.Group className={styles.input_grid} value={input}>
            <FloatingLabel value={input}
                controlId="quickInput"
                label={`${contentType[0].toUpperCase() + contentType.slice(1)}`}
                // className={styles.inputPrompt}
                onSubmit={handleToggle}
                onKeyDown={ e => e.key === 'Enter' && (
                    e.preventDefault(), handleToggle(e)
                )}
            >
                <Form.Control value={input}
                    type={inputType}
                    min={inputType === 'number' ? 1 : ''}
                    className={styles.add_input}
                    onChange={handleInput}
                ></Form.Control>
            </FloatingLabel>
            {/* <Button value={input} 
                type="submit"
                onClick={handleToggle}
                className={styles.submit_input}
            >
                <i className="fa-solid fa-plus"></i>
            </Button> */}
        </Form.Group>
    );
}

export default Input;