import React, { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './Tabs.css';

const addToggle = (label='') => {
    return (
        <ToggleButton
            key={label.split(' ').join('-')}
            id={label.split(' ').join('-')}
            value={label}
        >{label}</ToggleButton>
    );
}

const Tabs = ({ labels }) => {
    const [tabs, setTabs] = useState(labels.map( label => addToggle(label) ));
    const filterAssignmentGroups = (tabs=[]) => {
        // only show matching assignment groups
        return
    }

    return (
        <aside className="tabs">
            <ToggleButtonGroup
                onChange={filterAssignmentGroups}
                name="assignment-labels"
                type="checkbox"
                size="sm"
                vertical
            >
                <ToggleButton
                    id="label-all"
                    value={labels}
                    defaultChecked
                >All</ToggleButton>

                {tabs}

                <ToggleButton
                    id="label-add"
                    value={labels}
                    onChange={() => setTabs(
                        prevTabs => [
                            prevTabs, 
                            addToggle(
                                prompt('New tab name'),
                                labels.length + 1
                            )
                        ] 
                    )}
                >+</ToggleButton>
            </ToggleButtonGroup>
        </aside>
    );
}

export default Tabs;