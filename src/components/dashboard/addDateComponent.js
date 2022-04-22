import { useState, useContext } from 'react';
import { Modal } from '@mui/material';
import { Box, Typography, TextField, Slider, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { StatsServiceContext } from 'src/services/statsService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 4,
    display: "flex",
    flexDirection: 'column'
};

export const AddDateComponent = (props) => {
    const statsService = useContext(StatsServiceContext);
    const { handleClose, open, statConfig } = props;
    const [chosenDate, setChosenDate] = useState(new Date());
    const [valueChosen, setValueChosen] = useState(1);
    const [showError, setShowError] = useState(false);

    let sliderValue = statConfig.max !== 1 &&
        <>
            <Typography id="modal-modal-subtitle" sx={{ padding: "1.5em 0em 0.5em 0em" }}>
                Value of the day:
            </Typography>
            <Slider min={1} max={statConfig.max} value={valueChosen} onChange={(_, val) => setValueChosen(val)} valueLabelDisplay="auto" defaultValue={1} step={1} marks={true} />
        </>;

    const privHandleClose = () => {
        setValueChosen(1);
        setChosenDate(new Date());
        setShowError(false);
        handleClose();
    }

    const privDateChosen = (date) => {
        if (date > new Date()) {
            setShowError(true);
            return;
        }

        setShowError(false);
        setChosenDate(date);
    }

    const submitDate = () => {
        if (chosenDate > new Date()) {
            setShowError(true);
            return;
        }

        statsService.addDateForStat(statConfig.id, chosenDate, valueChosen);
        privHandleClose();
    };

    const showErrorComp = showError && <Typography sx={{ marginTop: 2 }} color="red">Date must be in the past or today</Typography>

    return (
        <Modal open={open} onClose={privHandleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    {statConfig?.title}
                </Typography>
                <Typography id="modal-modal-subtitle" my={2}>
                    Add a new day:
                </Typography>
                <DatePicker value={chosenDate} onChange={(val) => { privDateChosen(val) }} renderInput={(params) => <TextField {...params} />} disableFuture={true} />
                {sliderValue}
                <Button disabled={showError} sx={{ marginTop: 2 }} variant="contained" onClick={submitDate}>
                    Submit
                </Button>
                {showErrorComp}
            </Box>
        </Modal>
    )
}