import * as React from 'react';
import { Modal } from '@mui/material';
import { Box, Typography, TextField, Slider, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

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

export const AddStatComponent = (props) => {
    const { handleClose, open, statConfig } = props;
    const [chosenDate, setChosenDate] = React.useState(new Date());
    const [valueChosen, setValueChosen] = React.useState(1);

    let sliderValue = null;
    if (statConfig.max == 1) {
        sliderValue =
            <>
                <Typography id="modal-modal-subtitle" sx={{ padding: "1.5em 0em 0.5em 0em" }}>
                    Value of the day:
                </Typography>
                <Slider max={2} value={valueChosen} onChange={(_, val) => setValueChosen(val)} valueLabelDisplay="auto" defaultValue={1} step={1} marks={true}></Slider>
            </>;
    }

    const privHandleClose = () => {
        setValueChosen(1);
        handleClose();
    }

    return (
        <Modal open={open} onClose={privHandleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    {statConfig?.title}
                </Typography>
                <Typography id="modal-modal-subtitle" my={2}>
                    Add a new day:
                </Typography>
                <DatePicker value={chosenDate} onChange={(val) => { setChosenDate(val) }} renderInput={(params) => <TextField {...params} />}></DatePicker>
                {sliderValue}
                <Button sx={{ marginTop: 2 }} variant="contained">
                    Submit
                </Button>
            </Box>
        </Modal>
    )
}