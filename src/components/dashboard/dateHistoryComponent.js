import { Modal } from '@mui/material';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { StatsServiceContext } from 'src/services/statsService';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

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

export const DateHistoryComponent = (props) => {
    const statsService = useContext(StatsServiceContext);
    const { handleClose, open, statConfig } = props;
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setDates(calculateDatesToShow(statsService.retrieveDatesOfStat(statConfig?.id)))
    }, [open]);

    const deleteDate = (date) => {
        statsService.removeDate(statConfig?.id, date);
        setTimeout(() => {
            const stats = statsService.retrieveDatesOfStat(statConfig?.id);
            setDates(calculateDatesToShow(stats));
        })
    }

    const calculateDatesToShow = (dates) => {
        return Object.keys(dates || {}).map((date) => {
            return { date: date, value: dates[date] };
        })
    };

    const privHandleClose = () => {
        setPageSize(5);
        setDates([]);
        handleClose();
    }

    const [dates, setDates] = useState([]);

    const columns = [
        { field: 'date', headerName: 'Date', flex: 0.8, type: 'date', valueGetter: ({ value }) => value && new Date(value) },
        { field: 'value', headerName: 'Value', flex: 0.4 },
        {
            field: "actions",
            headerName: "",
            type: 'actions',
            sortable: false,
            disableColumnMenu: true,
            flex: 0.2,
            renderCell: (row) => {
                return <>
                    <IconButton onClick={() => deleteDate(row?.row?.date)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            }
        }
    ];
    return (
        <Modal open={open} onClose={privHandleClose}>
            <Box sx={style}>
                <Stack direction="column" spacing={2}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {statConfig?.title}
                    </Typography>
                    <DataGrid autoHeight rows={dates} columns={columns} getRowId={(row) => moment(row.date).format('YYYY-MM-DD')} pageSize={pageSize} onPageSizeChange={setPageSize} rowsPerPageOptions={[5, 10, 25]} initialState={{
                        sorting: {
                            sortModel: [{ field: 'date', sort: 'desc' }],
                        }
                    }} throttleRowsMs={2000} />
                </Stack>
            </Box>
        </Modal >
    )
}