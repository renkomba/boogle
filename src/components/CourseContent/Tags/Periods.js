import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Period from "../../../classes/Period";
import UserContext from "../../../contexts/userContext";
import getOrdinalSuffix from "../../functions/getOrdinalSuffix";
import Input from "../../Prompts/Input";
import styles from './Tags.module.css';


const Periods = ({ activePeriod, filterByTag }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [periods, setPeriods] = useState((activePeriod.course ? 
        activePeriod.course : activePeriod).periods.map(
            Period => addToggle(Period.period)
        )
    );

    const { changePeriod } = useContext(UserContext);

    function addToggle(period='', addedByUser=false) {
        // console.log(activePeriod);
        if (addedByUser) {
            let p = new Period(
                (activePeriod.course ? activePeriod.course 
                    : activePeriod).title,
                activePeriod.course ? activePeriod.course 
                    : activePeriod,
                `${period}${getOrdinalSuffix(period)} Period`
            );

            p.course.periods = p;
            period = p.period;
        }

        let toggleButton = (<ToggleButton value={period}
            checked={period === activePeriod.period}
            key={period.split(' ').join('-')}
            id={period.split(' ').join('-')}
            className={styles.tag}
        >{period}</ToggleButton>);

        addedByUser && setPeriods(periods => [ 
            ...periods, toggleButton 
        ]);

        return toggleButton;
    }

    const handleToggle = e => {
        console.log('Handle toggle ran with value:');
        console.log(e);
        setShowPrompt(false);
        addToggle(e.target.value, true);
    }

    // const filterAssignmentGroups = selectedLabelsArr => {
    //     console.log('filtering by tag:');
    //     console.log(selectedLabelsArr);
    //     return
    // }

    return (
        <article className={styles.tags}>
            <h4>Periods</h4>
            <Form>
                <div className={styles.buttons_n_tags}>
                    { periods.length > 2 && <Button type="reset"
                        onClick={ () => filterByTag(periods) }
                        className={styles.view_all_button}
                    >All</Button> }

                    <ToggleButtonGroup onChange={changePeriod}
                        className={styles.verticalButtonGroup}
                        name="course-periods"
                        type="radio"
                        size="sm"
                        vertical
                    >
                        {periods}
                    </ToggleButtonGroup>

                    { showPrompt ? <Input inputType="number"
                        className={styles.tag_input}
                        handleToggle={handleToggle}
                        contentType="period"
                    /> : <Button className={styles.add}
                        onClick={ () => setShowPrompt(true)}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </Button>}
                </div>
            </Form>
        </article>
    );
}

export default Periods;