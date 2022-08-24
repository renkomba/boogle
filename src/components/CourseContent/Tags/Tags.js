import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styles from './Tags.module.css';
import Input from "../../Prompts/Input";


const Tags = ({ activePeriod, filterByTag }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [tags, setTags] = useState({
        names: activePeriod.course.assignmentLabels,
        components: activePeriod.course.assignmentLabels.sort(
            (currentWord, previousWord) =>
                previousWord === 'Class Docs' ? 1
                    : currentWord.localeCompare(previousWord)
        ).map( tag => addToggle(tag) )
    }
    );

    useEffect(
        () => {
            setTags({
                names: activePeriod.course.assignmentLabels,
                components: activePeriod.course.assignmentLabels.sort(
                    (currentWord, previousWord) =>
                        previousWord === 'Class Docs' ? 1
                            : currentWord.localeCompare(previousWord)
                ).map( tag => addToggle(tag) )
            });
        },
        [activePeriod]
    );

    function addToggle(tag='', addedByUser=false) {
        addedByUser && setTags(tags => ({
            ...tags,
            names: [...tags.names, tag]
        }));
        
        return (
            <ToggleButton
                key={tag.split(' ').join('-')}
                id={tag.split(' ').join('-')}
                className={styles.tag}
                value={tag}
            >{tag}</ToggleButton>
        );
    }

    const handleToggle = ({target: {value}}) => {
        console.log('Handle toggle ran with value e:');
        console.log(value);
        setShowPrompt(false);
    }

    return (
        <article className={styles.tags}>
            <h4>Tags</h4>
            <Form>
                <Button className={styles.view_all_button}
                    onClick={() => filterByTag(tags.names)}
                    type="reset"
                >All</Button>

                <ToggleButtonGroup onChange={filterByTag}
                    className={styles.verticalButtonGroup}
                    name="assignment-tags"
                    type="checkbox"
                    size="sm"
                    vertical
                >
                    {tags.components}
                </ToggleButtonGroup>
                
                { showPrompt ? <Input 
                    contentType="tag"
                    inputType="text"
                    handleToggle={handleToggle}
                /> : <Button className={styles.add_a_button}
                    onClick={() => setShowPrompt(true)}
                >
                    <i className="fa-solid fa-plus"></i>
                </Button>}
            </Form>
        </article>
    );
}

export default Tags;