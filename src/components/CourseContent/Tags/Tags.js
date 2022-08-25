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
        names: (activePeriod.course ? activePeriod.course 
            : activePeriod).assignmentLabels,
        components: (activePeriod.course ? activePeriod.course 
            : activePeriod).assignmentLabels.sort(
                (word, prevWord) => prevWord === 'Class Docs' ?
                    1 : word.localeCompare(prevWord)
        ).map( tag => addToggle(tag) )
    });

    useEffect(
        () => {
            setTags({
                names: (activePeriod.course ? activePeriod.course 
                    : activePeriod).assignmentLabels,
                components: (activePeriod.course ? activePeriod.course 
                    : activePeriod).assignmentLabels.sort(
                        (word, prevWord) => prevWord === 'Class Docs' ?
                            1 : word.localeCompare(prevWord)
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
            <ToggleButton className={styles.tag}
                key={tag.split(' ').join('-')}
                id={tag.split(' ').join('-')}
                value={tag}
            >{tag}</ToggleButton>
        );
    }

    const handleToggle = e => {
        console.log('Handle toggle ran with value:');
        console.log(e.target.value);
        setShowPrompt(false);
    }

    return (
        <article className={styles.tags}>
            <h4>Tags</h4>
            <Form>
                <div className={styles.buttons_n_tags}>
                    { tags.length > 2 && <Button className={styles.view_all_button}
                        onClick={() => filterByTag(tags.names)}
                        type="reset"
                    >All</Button> }

                    <ToggleButtonGroup onChange={filterByTag}
                        className={styles.verticalButtonGroup}
                        name="assignment-tags"
                        type="checkbox"
                        size="sm"
                        vertical
                    >
                        {tags.components}
                    </ToggleButtonGroup>
                    
                    { showPrompt ? <Input inputType="text"
                        handleToggle={handleToggle}
                        contentType="tag"
                    /> : <Button className={styles.add}
                        onClick={() => setShowPrompt(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </Button>}
                </div>
            </Form>
        </article>
    );
}

export default Tags;