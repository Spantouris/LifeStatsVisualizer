import { Timeline } from 'src/components/dashboard/timeline';
import { Select, Card, CardHeader, CardContent, Button, Grid, MenuItem, Typography, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { AddDateComponent } from './addDateComponent';

export const StatComponent = (props) => {
    const { statConfig } = props;
    const [open, setOpen] = React.useState(false);
    const [months, setMonths] = React.useState(6);
    const [endDate, setEndDate] = React.useState(new Date());

    return (
        <>
            <Card sx={{ m: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item >
                        <CardHeader
                            title={statConfig?.title || ""}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{ marginTop: "18px" }}
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
                <Grid container spacing={2} sx={{ marginLeft: "2px" }}>
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginTop: "7px" }}>
                            <Typography>Months</Typography>
                            <Select label="Months" value={months} onChange={(val) => setMonths(val.target.value)}>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ marginTop: "7px" }}>
                            <Typography>End date</Typography>
                            <DatePicker value={endDate} onChange={(val) => { setEndDate(new Date(val.valueOf())) }} renderInput={(params) => <TextField {...params} />} disableFuture={true} />
                        </Stack>
                    </Grid>
                </Grid>
                <CardContent>
                    <Timeline months={months} colors={statConfig?.colors} id={statConfig?.id} endDate={endDate} />
                </CardContent>
            </Card>
            <AddDateComponent handleClose={() => setOpen(false)} open={open} statConfig={statConfig} />
        </>
    )
}