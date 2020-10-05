import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'

export default function () {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper>
            <Tabs value={value} indicatorColor="primary" onChange={handleChange} centered >
                <Tab label="One"></Tab>
                <Tab label="Two"></Tab>
                <Tab label="Three"></Tab>
            </Tabs>
        </Paper>
    )
}