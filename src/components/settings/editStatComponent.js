import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Box, Typography, TextField, Button } from '@mui/material';

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
    const { handleClose, open, statForEdit, statChanged } = props;
    const [showError, setShowError] = useState(null);
    const [title, setTitle] = useState("");
    const [maxValue, setMaxValue] = useState(1);

    useEffect(() => {
        if (!statForEdit)
            return;

        setTitle(statForEdit?.title);
        setMaxValue(statForEdit?.max);
    }, [statForEdit])

    const privHandleClose = () => {
        setShowError(null);
        setTitle("");
        setMaxValue(1);
        handleClose();
    }

    const submitStat = () => {
        if (maxValue < 1) {
            return;
        }

        statChanged(statForEdit?.id, title, maxValue);
        privHandleClose();
    };

    const maxValueChanged = (val) => {
        val.target.value < 1 ? setShowError("Max value must be greater than 1") : setShowError(null)
        setMaxValue(val.target.value);
    }

    const showErrorComp = showError && <Typography sx={{ marginTop: 2 }} color="red">{showError}</Typography>

    const statTitle = statForEdit ? "Edit stat" : "Add stat";

    return (
        <Modal open={open} onClose={privHandleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    {statTitle}
                </Typography>
                <TextField sx={{ marginY: 3 }} label="Title" value={title} onChange={(val) => setTitle(val.target.value)} />
                <TextField error={maxValue < 1} type='number' label="Max Value" value={maxValue} onChange={maxValueChanged} />
                <Button disabled={showError} sx={{ marginTop: 3 }} variant="contained" onClick={submitStat}>
                    Submit
                </Button>
                {showErrorComp}
            </Box>
        </Modal>
    )
}