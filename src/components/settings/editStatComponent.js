import { useEffect, useState } from 'react';
import { Modal, NoSsr, Stack } from '@mui/material';
import { Box, Typography, TextField, Button, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { ColorPickerComponent } from './colorPickerComponent';

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
    const [colors, setColors] = useState([]);

    useEffect(() => {
        if (!statForEdit)
            return;

        setTitle(statForEdit?.title);
        setMaxValue(statForEdit?.max);

        if(statForEdit?.colors)
            setColors([...statForEdit?.colors]);
    }, [statForEdit])

    const privHandleClose = () => {
        setShowError(null);
        setTitle("");
        setMaxValue(1);
        setColors([]);
        handleClose();
    }

    const submitStat = () => {
        if (maxValue < 1) {
            return;
        }

        statChanged(statForEdit?.id, title, maxValue, colors);
        privHandleClose();
    };

    const maxValueChanged = (val) => {
        val.target.value < 1 ? setShowError("Max value must be greater than 1") : setShowError(null)
        setMaxValue(val.target.value);
    }

    const addNewColor = () => {
        if (colors.length > 10)
            return;

        setColors([...colors, '#ffffff']);
    }

    const deleteColor = (index) => {
        const newColors = [...colors];
        newColors.splice(index, 1);
        setColors(newColors);
    }

    const showErrorComp = showError && <Typography sx={{ marginTop: 2 }} color="red">{showError}</Typography>

    const colorsComp = (colors || []).map((color, index) =>
        <Stack key={uuidv4()} direction="row" spacing={2} justifyContent='center'>
            <Typography sx={{ marginTop: "8px", marginRight: "20px" }} key={"number-of-color" + index}>{index}.</Typography>
            <ColorPickerComponent key={"color-picker" + index} color={color} changeColor={(color) => colors[index] = color} />
            <IconButton key={"delete-icon" + index} onClick={() => deleteColor(index)}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );

    const statTitle = statForEdit ? "Edit stat" : "Add stat";

    return (
        <Modal open={open} onClose={privHandleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    {statTitle}
                </Typography>
                <TextField sx={{ marginY: 3 }} label="Title" value={title} onChange={(val) => setTitle(val.target.value)} />
                <TextField sx={{ marginY: 2 }} error={maxValue < 1} type='number' label="Max Value" value={maxValue} onChange={maxValueChanged} />
                <Box>
                    <Stack>
                        <Stack key="title-and-add-button" direction="row" spacing={3} sx={{ marginBottom: 2 }}>
                            <Typography key='colors-title' variant="h6" component="h2">
                                Colors
                            </Typography>
                            <Tooltip key='colors-add' title="Add">
                                <Button disabled={colors?.length >= 10} color="primary" size="small" variant="contained" onClick={addNewColor}><AddIcon /></Button>
                            </Tooltip>
                        </Stack>
                        {colorsComp}
                    </Stack>
                </Box>
                <Button disabled={showError} sx={{ marginTop: 3 }} variant="contained" onClick={submitStat}>
                    Submit
                </Button>
                {showErrorComp}
            </Box>
        </Modal >
    )
}