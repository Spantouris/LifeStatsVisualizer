import { Button, Typography, Grid, IconButton, Tooltip, Dialog, DialogActions, DialogTitle, DialogContent, Stack } from "@mui/material"
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EditStatComponent } from "./editStatComponent";
import { useState } from "react"

export const StatConfigurator = (props) => {
    const { stats, statsService } = props;
    const [gridStats, setGridStats] = useState(stats);
    const [editStatModalOpen, setEditStatModalOpen] = useState(false);
    const [deleteStatDialog, setDeleteStatDialog] = useState(false);
    const [clearStatDialog, setClearStatDialog] = useState(false);
    const [importStatDialog, setImportStatDialog] = useState(false);
    const [statForEdit, setStatForEdit] = useState(null);
    const [importFile, setImportFile] = useState(null);

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
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'max', headerName: 'Max value', flex: 0.3 },
        {
            field: 'colors',
            headerName: 'Colors',
            flex: 1,
            renderCell: (row) => {
                return (row.value || []).map((color, index) => {
                    return <Box key={`row-${row.id}-color-${index}`} sx={{ margin: '2px', width: '25px', height: '25px', background: color }}></Box>
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
        if (importFile == null)
            return;
        const reader = new FileReader();
        reader.onload = (file) => {
            statsService.importStats(JSON.parse(file.target.result));
            setGridStats(statsService.retrieveStats());
        }
        reader.readAsText(importFile);
        closeUploadDialog();
    }

    const closeUploadDialog = () => {
        setImportFile(null);
        setImportStatDialog(false);
    }

    const statChanged = (id, title, maxValue, colors) => {
        if (!id) {
            statsService.addStat(title, maxValue, colors);
            setGridStats(statsService.retrieveStats());
            return;
        }

        statsService.updateStat(id, title, maxValue, colors);
        setGridStats(statsService.retrieveStats());
    }

    const editStatClose = () => {
        setStatForEdit(null);
        setEditStatModalOpen(false);
    }

    const clearStats = () =>
    {
        statsService.clearStats();
        setClearStatDialog(false)
        setGridStats(statsService.retrieveStats());
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
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }} onClick={() => setImportStatDialog(true)}><UploadIcon /></Button>
                </Tooltip>
            </Grid>
            <Grid key="export-stats-button" item>
                <Tooltip title="Export">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }} onClick={exportStats}><DownloadIcon /></Button>
                </Tooltip>
            </Grid>
            <Grid key="clear-stats-button" item>
                <Tooltip title="Clear">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }} onClick={() => setClearStatDialog(true)}><DeleteForeverIcon /></Button>
                </Tooltip>
            </Grid>
        </Grid>
        <DataGrid autoHeight rows={gridStats.statConfig} columns={columns} onRowDoubleClick={(row) => rowEdit(row.row)} />
        <EditStatComponent handleClose={editStatClose} open={editStatModalOpen} statForEdit={statForEdit} setStatForEdit={setStatForEdit} statChanged={statChanged}></EditStatComponent>
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
        <Dialog
            open={clearStatDialog}
            onClose={() => setClearStatDialog(false)}
        >
            <DialogTitle>
                {"Are you sure you want to clear all stats?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => setClearStatDialog(false)}>Disagree</Button>
                <Button onClick={clearStats} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={importStatDialog}
            onClose={closeUploadDialog}
        >
            <DialogTitle>
                {"Are you sure you want to import stats?"}
            </DialogTitle>
            <DialogContent>
                It will override the current stats.
                <Box sx={{ marginTop: 2 }}>
                    <label htmlFor="contained-button-file">
                        <input onChange={(val) => setImportFile(val.target.files[0])} accept=".json" type='file' id='contained-button-file' style={{ display: 'none' }} />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                            <Typography sx={{ paddingTop: 1 }}>{importFile?.name}</Typography>
                        </Stack>

                    </label>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUploadDialog}>Disagree</Button>
                <Button disabled={importFile == null} onClick={uploadStats} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </>
}