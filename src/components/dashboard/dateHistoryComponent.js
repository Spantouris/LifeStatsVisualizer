import { Modal } from '@mui/material';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { StatsServiceContext } from 'src/services/statsService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: 300,
    padding: 4,
    display: "flex",
    flexDirection: 'column'
};

export const DateHistoryComponent = (props) => {
    const statsService = useContext(StatsServiceContext);
    const { handleClose, open, statConfig, statDates } = props;
    const [pageSize, setPageSize] = useState(5);

    const dates = Object.keys(statDates || {}).map((date) => {
        return { date: date, value: statDates[date] };
    });

    const columns = [
        { field: 'date', headerName: 'Date', flex: 0.8, type: 'date', valueGetter: ({ value }) => value && new Date(value) },
        { field: 'value', headerName: 'Value', flex: 0.4 },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            disableColumnMenu: true,
            flex: 0.2,
            renderCell: (row) => {
                return <>
                    <IconButton>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            }
        }
    ];

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Stack direction="column" spacing={2}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {statConfig?.title}
                    </Typography>
                    <DataGrid autoHeight rows={dates} columns={columns} getRowId={(row) => row.date} pageSize={pageSize} onPageSizeChange={setPageSize} rowsPerPageOptions={[5,10,25]} initialState={{
                        sorting: {
                            sortModel: [{ field: 'date', sort: 'desc' }],
                        },
                    }} />
                </Stack>
            </Box>
        </Modal >
    )
}