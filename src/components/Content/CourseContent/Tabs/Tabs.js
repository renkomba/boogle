import React, { useState } from "react";
import './Tabs.css';

const addTab = (label='') => {
    return (
        <article 
            className="tab"
            id={label.split(' ').join('-')}
            key={label.split(' ').join('-')}
        >
            <p>{label}</p>
        </article>
    );
}

const Tabs = ({ labels }) => {
    const [tabs, setTabs] = useState(labels.map(label => addTab(label)));
    console.log(tabs);

    return (
        <aside className="tabs">
            <article 
                className="tab add"
                onClick={() => setTabs(
                    prevTabs => [
                        prevTabs, 
                        addTab(prompt('New tab name'))
                    ] 
                )}
            >
                +
            </article>
            {tabs}
        </aside>
    );
}

export default Tabs;