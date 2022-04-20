import { Container, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

export const StatConfigurator = (props) => {
    const { stats } = props;

    const columns = [
        { field: 'id', headerName: 'Stat id', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1, editable: true },
        { field: 'max', headerName: 'Max value', flex: 1, type: 'number', editable: true },
        { field: 'colors', headerName: 'Colors', flex: 1 },
    ];

    const processRowUpdate = (newRow) => {
        return new Promise((resolve, reject) => {
            console.log(newRow);
            resolve({...newRow})
        });
    }

    return <>
        <DataGrid autoHeight rows={stats.statConfig} columns={columns} processRowUpdate={processRowUpdate} experimentalFeatures={{ newEditingApi: true }} />
    </>
}