import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styles from './AssignmentModal.module.css';


const AssignmentModal = ({ show, setShow, iconJsx, assignment, activePeriod }) => {
    const [isForLink, setIsForLink] = useState(true);
    const [hidePeriods, setHidePeriods] = useState(
        Object.fromEntries(activePeriod.course.user.courses.map(
            Course => [Course.id, true]
        ))
    );

    const handleClose = () => {
        setShow(false);
        setHidePeriods(
            Object.fromEntries(activePeriod.course.user.courses.map(
                Course => [Course.id, true]
            )));
    };

    const updateAssignment = ({ target : {value}}) => {
        console.log('Just submitted:');
        console.log(value);
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true}
            centered
            scrollable
            fullscreen="md-down"
            className={styles.modal}
            id={`${assignment.id}-editor`}
        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.title}>
                    <header className={styles.header}>
                        {iconJsx}
                        <p className={styles.title}>{assignment.title}</p>
                    </header>
                    <p className={styles.submissions}>
                        {activePeriod.submissions[assignment.id].turnedIn}
                        &nbsp;/&nbsp;
                        {activePeriod.totalStudents}
                    </p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <FloatingLabel
                        as={Col}
                        className="modal-title"
                        controlId="assignmentTitle"
                        label="Assignment Title"
                    >
                        <Form.Control
                            autoFocus
                            size="lg"
                            type="text"
                            defaultValue={assignment.title}
                            aria-label="assignment title editor"
                            onChange={ ({target : {value}}) => {
                                assignment.title = value
                            } }
                        />
                    </FloatingLabel>
                    <br />
                    <Row className="type-and-label">
                        <FloatingLabel
                            as={Col}
                            size="md"
                            className="modal-type"
                            controlId="assignmentType"
                            label="Assignment Type"
                        >
                            <Form.Select
                                aria-label="assignment type selector"
                                onChange={ value => assignment.type = value }
                            >
                                <option value={assignment.type}>
                                    {assignment.type}
                                </option>
                                {
                                    activePeriod.course.assignmentTypes.filter( 
                                        type => type !== assignment.type
                                    ).map( 
                                        type => (<option value={type} key={type}>
                                            {type[0]+type.slice(1)}
                                        </option>) 
                                    )
                                }
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel
                            as={Col}
                            size="md"
                            className="modal-label"
                            controlId="assignmentLabel"
                            label="Assignment Label"
                        >
                            <Form.Select
                                aria-label="assignment label selector"
                                onChange={ value => assignment.label = value }
                            >
                                <option value={assignment.label}>{assignment.label}</option>
                                {
                                    activePeriod.course.assignmentLabels.filter( 
                                        label => label !== assignment.label
                                    ).map( 
                                        label => (<option value={label} key={label}>
                                            {label}
                                        </option>) 
                                    )
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Row>
                    <hr />
                    <FloatingLabel 
                        controlId="assignmentDirections"
                        className="directions"
                        label="Directions"
                    >
                        <Form.Control as="textarea" style={{ height: '100px'}} />
                    </FloatingLabel>
                    <br />
                    <Form.Group className={styles.attachments}>
                        <Form.Label>Attachments</Form.Label>
                        <Row className={styles.modalRow}>
                            <Col sm={3}>
                                <Dropdown as={ButtonGroup}>
                                    <Button className={styles.attach_button}>Attach</Button>
                                    <Dropdown.Toggle 
                                        split 
                                        id="attach-dropdown"
                                        className={styles.dropdown_toggle}
                                    />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={ ({currentTarget}) => {
                                            console.log(`Upload ${currentTarget.textContent}`);
                                            setIsForLink(false);
                                        } }>
                                            File
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={ ({currentTarget}) => {
                                            console.log(`Upload ${currentTarget.textContent}`);
                                            setIsForLink(true);
                                        } }>
                                            Link
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                {isForLink ? <FloatingLabel
                                    as={Col}
                                    size="md"
                                    label="Type / Paste link"
                                >
                                    <Form.Control type="textarea" aria-label="text input for link"/>
                                </FloatingLabel> : <Form.Control type="file" multiple />}
                            </Col>
                        </Row>
                    </Form.Group>
                    <hr />
                    <Row className={`${styles.modalRow} ${styles.pointsAndDueDate}`}></Row>
                    <br />
                    <fieldset>
                        <Form.Group
                            as={Row}
                            name={`${activePeriod.course.title} periods`}
                        >
                            <Form.Label>Assign to:</Form.Label>
                            
                            {activePeriod.course.user.courses.map(
                                Course => <Row
                                    className={`${styles.modalRow} ${styles.modal_courses}`}
                                    key={`${Course.id}-toggle-switch`}
                                >
                                    <Col>
                                        <Form.Check
                                            defaultChecked={true}
                                            type="switch"
                                            className={styles.all_periods_switch}
                                            id={`${Course.id}-select-all`}
                                            label={`all ${Course.title}`}
                                            onChange={ ({ target: {value}}) => setHidePeriods(
                                                prevState => ({
                                                    ...prevState,
                                                    [Course.id]: !prevState[Course.id]
                                                })
                                            )}
                                        />
                                    </Col>

                                    <Col style={{display: (hidePeriods[Course.id] ? 'none' : '')}}>
                                        <ToggleButtonGroup
                                            role="group"
                                            type="checkbox"
                                            className={styles.period_buttons}
                                            aria-label="button group for each period"
                                            defaultValue={Course.periods}
                                        >
                                            {Course.periods.filter( Period => Period.period !== 'ct')
                                                .map(
                                                    Period => <ToggleButton 
                                                        type="checkbox"
                                                        name="period-checkbox"
                                                        value={Period.id}
                                                        id={`check-${Period.id}`}
                                                        key={`check-${Period.id}`}
                                                        checked={false}
                                                        className={styles.period_button}
                                                        variant="outline-primary"
                                                    >
                                                        {Period.period.split(' ')[0]}
                                                    </ToggleButton>
                                            )}
                                        </ToggleButtonGroup>
                                    </Col>
                                </Row>
                            )}
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    type="submit"
                    onClick={updateAssignment}
                >
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AssignmentModal;