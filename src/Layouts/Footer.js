import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'

export default function () {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper style={{ paddingBottom: 5 }}>
            <Tabs value={value} indicatorColor="primary" onChange={handleChange} centered >
                <Tab label="1"></Tab>
                <Tab label="2"></Tab>
                <Tab label="3"></Tab>
            </Tabs>
        </Paper>
    )
}