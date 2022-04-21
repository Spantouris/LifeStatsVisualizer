import { Button, Typography, Grid, IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { v4 as uuidv4 } from 'uuid';

export const StatConfigurator = (props) => {
    const { stats } = props;

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
                    <IconButton onClick={() => console.log("hello")}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => console.log("hello")}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            }
        }
    ];

    const rowEdit = (row) => {
        console.log(row);
    }

    return <>
        <Grid container sx={{ marginTop: "1em", marginBottom: '1em' }}>
            <Grid key="stats-header" item>
                <Typography variant="h4">Stats</Typography>
            </Grid>
            <Grid key="add-stats-button" item>
                <Tooltip title="Add">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }}><AddIcon /></Button>
                </Tooltip>
            </Grid>
            <Grid key="import-stats-button" item>
                <Tooltip title="Import">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }}><UploadIcon /></Button>
                </Tooltip>
            </Grid>
            <Grid key="export-stats-button" item>
                <Tooltip title="Export">
                    <Button color="primary" size="small" variant="contained" sx={{ marginLeft: "20px", marginTop: "7px" }}><DownloadIcon /></Button>
                </Tooltip>
            </Grid>
        </Grid>
        <DataGrid autoHeight rows={stats.statConfig} columns={columns} onRowDoubleClick={rowEdit} />
    </>
}