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
    const [periods, setPeriods] = useState({
        ids: (activePeriod.course || activePeriod).periodIds,
        components: (activePeriod.course 
            || activePeriod).periods.sort((Period, prevPeriod) => 
                Period.period.localeCompare(prevPeriod.period)
            ).map( period => addToggle(period.period) )
    });

    const { changePeriod } = useContext(UserContext);

    function addToggle(period='', addedByUser=false) {
        addedByUser && setPeriods({
            ids: (activePeriod.course || activePeriod).periodIds,
            components: (activePeriod.course 
                || activePeriod).periods.sort((Period, prevPeriod) => 
                    Period.period.localeCompare(prevPeriod.period)
                ).map( Period => addToggle(Period.period) )
        });

        return (<ToggleButton value={period}
            checked={period === activePeriod.period}
            key={period.split(' ').join('-')}
            id={period.split(' ').join('-')}
            className={styles.tag}
        >{period}</ToggleButton>);
    }

    const handleToggle = ({ target: {value}}) => {
        console.log(`Handle toggle ran with value: ${value}`);
        if (value) {
            let period = new Period(
                (activePeriod.course || activePeriod).title,
                (activePeriod.course || activePeriod),
                `${value}${getOrdinalSuffix(value)} Period`
            );
            period.course.periods = period;
        }
        
        addToggle(value, true);
        setShowPrompt(false);
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
                    { periods.ids.length > 2 && <Button 
                        className={styles.view_all_button}
                        onClick={ () => filterByTag(periods.names) }
                        type="reset"
                    >All</Button> }

                    <ToggleButtonGroup onChange={changePeriod}
                        className={styles.verticalButtonGroup}
                        name="course-periods"
                        type="radio"
                        size="sm"
                        vertical
                    >
                        {periods.components}
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