import { Timeline } from 'src/components/dashboard/timeline';
import { Slider, Card, CardHeader, CardContent, Button, Grid } from '@mui/material';
import * as React from 'react';
import { AddStatComponent } from './addStatComponent';

export const StatComponent = (props) => {
    const { statDates, statConfig } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Card sx={{ m: "10px" }}>
                <Grid container>
                    <Grid item >
                        <CardHeader
                            title={statConfig?.title || ""}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{ marginTop: "18px", marginRight: "18px" }}
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={() => setOpen(true)}
                        >
                            Add new
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{ marginTop: "18px" }}
                            color="primary"
                            size="small"
                            variant="contained"
                        >
                            History
                        </Button>
                    </Grid>
                </Grid>
                <CardContent>
                    <Timeline months={5} colors={statConfig?.colors} dates={statDates} />
                </CardContent>
            </Card>
            <AddStatComponent handleClose={() => setOpen(false)} open={open} statConfig={statConfig} />
        </>
    )
}