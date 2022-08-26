import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import AttachedFile from "../Attachments/AttachedFile";
import AttachedLink from "../Attachments/AttachedLink";
import styles from './AssignmentModal.module.css';


const AssignmentModal = ({ show, setShow, iconJsx, assignment, activePeriod }) => {
    const [isForLink, setIsForLink] = useState(true);
    const [attachedLinks, setAttachedLinks] = useState([]);
    const [files, setFiles] = useState([]);
    const [hidePeriods, setHidePeriods] = useState(
        Object.fromEntries( (activePeriod.course ? activePeriod.course : activePeriod).user.courses.map(
                Course => [ Course.id, true ]
        ))
    );

    useEffect(
        () => {
            if (getIcons().length > 0) {
                let icon = getIcons()[0];
                let lastClass = icon.classList[icon.classList.length - 1];
                let pseudoElement = window.getComputedStyle(icon, '::before')
                    .getPropertyValue('content');

                pseudoElement === 'none' && icon.classList.replace('fa-brands', 'fa-solid');
                pseudoElement === 'none' && icon.classList.replace(lastClass, 'fa-globe');
            }
        },
        [attachedLinks]
    );

    useEffect(
        () => setAttachedLinks(prevArr => [ ...files, ...prevArr ]),
        [files]
    );

    const handleClose = () => {
        show && setShow(false);
        setHidePeriods(Object.fromEntries( 
            (activePeriod.course ? activePeriod.course : activePeriod).user.courses.map(
                Course => [ Course.id, true ]
            )
        ));
    };

    const handleSubmit = e => {
        e.preventDefault();  // prevent from rerendering the page
        const data = Array.from(e.target).filter( e => e.id )
            .filter( (e, i) => i > 5 ? e.checked : true );
        const values = data.map( e => e.value !== 'on' ? e.value
            : e.id.split('-select-all')[0].split('-').join(' ') );
        console.log('Just submitted:');
        console.log(data);
        console.log(values);
        handleClose();
    }

    const getIcons = () => {
        let icons = document.querySelectorAll('.modal-content i.icon');
        return icons;
    }

    const handleAttach = ({ target }, fromInput=false) => {
        let input = fromInput ? target
            : target.parentElement
            .nextElementSibling
            .querySelector('input');

        setAttachedLinks( prevArr => [
                <AttachedLink 
                key={`link-#${prevArr.length + 1}`} 
                url={input.value} 
            />,
            ...prevArr
        ]);
        input.value = null;
    }

    const handleUpload = (e) => {
        let input = e.target
            .parentElement
            .nextElementSibling
            .files;

        input = Array.from(input);
        input = input.map( File => (
            <AttachedFile name={File.name} />
        ));

        setFiles(input);
        // e.target.value = null;
    };

    const submitInput = e => {
        e.key === 'Enter' && handleAttach(e, true);
    }

    return (
        <Modal
            show={show !== undefined && show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true}
            centered
            scrollable
            fullscreen="md-down"
            className={`${styles.modal} ${styles.assignment_editor}`}
            id={`${assignment.id}-editor`}
        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.title}>
                    <header className={styles.header}>
                        <h3>
                            {iconJsx}
                            <span className={styles.title}>{assignment.title}</span>
                        </h3>
                    </header>
                    <p className={styles.submissions}>
                        {!activePeriod.course ? assignment.submissions
                            : activePeriod.submissions[assignment.id].turnedIn}
                        &nbsp;/&nbsp;
                        {activePeriod.totalStudents}
                    </p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        as={Col}
                        className={styles.modal_title}
                        controlId="assignmentTitle"
                        label="Assignment Title"
                    >
                        <Form.Control
                            autoFocus
                            size="lg"
                            type="text"
                            defaultValue={assignment.title}
                            aria-label="assignment title editor"
                        />
                    </FloatingLabel>
                    <br />
                    <Row className="type-and-label">
                        <FloatingLabel
                            as={Col}
                            // size="md"
                            className={styles.modal_type}
                            controlId="assignmentType"
                            label="Assignment Type"
                        >
                            <Form.Select
                                aria-label="assignment type selector"
                                // onChange={ value => assignment.type = value }
                            >
                                <option value={assignment.type}>
                                    {assignment.type}
                                </option>
                                {
                                    (activePeriod.course ? activePeriod.course : activePeriod).assignmentTypes.filter( 
                                            type => type !== assignment.type
                                        ).map( type => (
                                            <option value={type} key={type}>
                                                {type[0]+type.slice(1)}
                                            </option> 
                                    ))
                                }
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel
                            as={Col}
                            // size="md"
                            className="modal-label"
                            controlId="assignmentLabel"
                            label="Assignment Label"
                        >
                            <Form.Select
                                aria-label="assignment label selector"
                                // onChange={ value => assignment.label = value }
                            >
                                <option value={assignment.label}>{assignment.label}</option>
                                {
                                    (activePeriod.course ? activePeriod.course : activePeriod).assignmentLabels.filter( 
                                            label => label !== assignment.label
                                        ).map( label => (
                                            <option value={label} key={label}>
                                                {label}
                                            </option> 
                                    ))
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
                        <Stack direction='horizontal' className={styles.modalRow}>
                            <Dropdown as={ButtonGroup}>
                                <Button 
                                    onClick={isForLink ? handleAttach : handleUpload} 
                                    className={styles.attach_button}
                                >
                                    Attach
                                </Button>
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
                            {isForLink ? <FloatingLabel
                                as={Col}
                                size="md"
                                id="added-link"
                                label="Type / Paste link"
                            >
                                <Form.Control 
                                    type="url" 
                                    onKeyDown={submitInput}
                                    aria-label="text input for link"
                                />
                            </FloatingLabel> 
                            : <Form.Control 
                                // onInput={handleUpload}
                                aria-label="file input"
                                id="added-files" 
                                type="file" 
                                multiple 
                            />}
                        </Stack>
                    </Form.Group>
                    <hr />
                    <Row className={`${styles.modalRow} ${styles.pointsAndDueDate}`}></Row>
                    <br />
                    <fieldset>
                        <Form.Group
                            as={Row}
                            name={`${(activePeriod.course ? activePeriod.course : activePeriod).title} periods`}
                        >
                            <Form.Label>Assign to:</Form.Label>
                            
                            { (activePeriod.course ? activePeriod.course : activePeriod).user.courses.map(
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
                    <Row id='attached-files-or-links'>{attachedLinks}</Row>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default AssignmentModal;