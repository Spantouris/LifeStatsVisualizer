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

export const EditStatComponent = (props) => {
    const statsService = useContext(StatsServiceContext);
    const { handleClose, open } = props;
    const [chosenDate, setChosenDate] = useState(new Date());
    const [valueChosen, setValueChosen] = useState(1);
    const [showError, setShowError] = useState(false);

    const privHandleClose = () => {
        setValueChosen(1);
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
                </Typography>
                <Typography id="modal-modal-subtitle" my={2}>
                    Add a new day:
                </Typography>
                <DatePicker value={chosenDate} onChange={(val) => { privDateChosen(val) }} renderInput={(params) => <TextField {...params} />}></DatePicker>
                <Button disabled={showError} sx={{ marginTop: 2 }} variant="contained" onClick={submitDate}>
                    Submit
                </Button>
                {showErrorComp}
            </Box>
        </Modal>
    )
}