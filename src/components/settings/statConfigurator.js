import { Button, Typography, Grid, IconButton, Tooltip, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { v4 as uuidv4 } from 'uuid';
import { EditStatComponent } from "./editStatComponent";
import { useState } from "react"

export const StatConfigurator = (props) => {
    const { stats, statsService } = props;
    const [editStatModalOpen, setEditStatModalOpen] = useState(false);
    const [deleteStatDialog, setDeleteStatDialog] = useState(false);
    const [statForEdit, setStatForEdit] = useState(null);

    const rowEdit = (row) => {
        setStatForEdit(row);
        setEditStatModalOpen(true);
    }

    const showDeleteDialog = (row) => {
        setStatForEdit(row);
        setDeleteStatDialog(true);
    }

    const closeDeleteDialog = () => {
        setStatForEdit(null);
        setDeleteStatDialog(false);
    }

    const addNewStat = () => {
        setStatForEdit(null);
        setEditStatModalOpen(true);
    }

    const deleteStat = () => {
        if (statForEdit)
            statsService.removeStat(statForEdit.id);

        setStatForEdit(null);
        setDeleteStatDialog(false);
    }

    const columns = [
        { field: 'id', headerName: 'Stat', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'max', headerName: 'Max value', flex: 1 },
        {
            field: 'colors',
            headerName: 'Colors',
            flex: 1,
            renderCell: (row) => {
                return row.value.map((color) => {
                    return <Box key={uuidv4()} sx={{ margin: '2px', width: '25px', height: '25px', background: color }}></Box>
                })
            }
        },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            disableColumnMenu: true,
            flex: 0.3,
            renderCell: (row) => {
                return <>
                    <IconButton onClick={() => rowEdit(row.row)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => showDeleteDialog(row.row)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            }
        }
    ];

    const exportStats = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(stats)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "stats.json";
        link.click();
        link.remove();
    }

    const uploadStats = () => {
        console.log("hello");
    }

    return <>
        <Grid container sx={{ marginTop: "1em", marginBottom: '1em' }}>
            <Grid key="stats-header" item>
                <Typography variant="h4">Stats</Typography>
            </Grid>
            <Grid key="add-stats-button" item>
                <Tooltip title="Add">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }} onClick={addNewStat}><AddIcon /></Button>
                </Tooltip>
            </Grid>
            <Grid key="import-stats-button" item>
                <Tooltip title="Import">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }} onClick={uploadStats}><UploadIcon /></Button>
                </Tooltip>
            </Grid>
            <Grid key="export-stats-button" item>
                <Tooltip title="Export">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }} onClick={exportStats}><DownloadIcon /></Button>
                </Tooltip>
            </Grid>
        </Grid>
        <DataGrid autoHeight rows={stats.statConfig} columns={columns} onRowDoubleClick={(row) => rowEdit(row.row)} />
        <EditStatComponent handleClose={() => setEditStatModalOpen(false)} open={editStatModalOpen} statForEdit={statForEdit}></EditStatComponent>
        <Dialog
            open={deleteStatDialog}
            onClose={closeDeleteDialog}
        >
            <DialogTitle>
                {"Are you sure you want to delete: " + statForEdit?.title}
            </DialogTitle>
            <DialogActions>
                <Button onClick={closeDeleteDialog}>Disagree</Button>
                <Button onClick={deleteStat} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </>
}