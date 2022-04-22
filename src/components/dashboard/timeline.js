import { Box, Grid, Typography, Tooltip, useMediaQuery } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const CalculateNumberBasedOnDate = (colors, squareDate, dates) => {
    const date = moment(squareDate);
    const sumOfValues = (dates || {})[date.format('YYYY-MM-DD')] || 0;
    return sumOfValues > (colors || []).length ? (colors || [])[colors.length - 1] : (colors || [])[sumOfValues];
}

export const Timeline = (props) => {
    const { months, colors, endDate, dates } = props;
    const spacing = 0.8;

    return (
        <Grid key={uuidv4()} container spacing={spacing} sx={{ border: '1px #e1e4e8 solid', padding: '5px' }}>
            {GenerateGrid(spacing, months, colors, endDate, dates)}
        </Grid>
    );
}

function GenerateGrid(spacing, months, colors, endDate, dates) {
    const rows = 7;
    const { columns, previousDate } = CalculateColumnsToShow(rows, months, endDate);
    
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'), {
        noSsr: false
      });

    const squareSize = lgUp ? 18 : 18;

    const rowGrid = (columnIndex) => {
        let before = GenerateMonthFromIndex(columnIndex, squareSize, previousDate, rows);
        return [before, Array.from(Array(rows)).map((_, rowIndex) => {
            return (
                <Grid key={uuidv4()} item>
                    {GenerateSquare(previousDate, columnIndex, rows, rowIndex, squareSize, colors, endDate, dates)}
                </Grid>
            );
        })];
    };

    return Array.from(Array(columns)).map((_, columnIndex) => {
        if (columnIndex == 0) {
            return GenerateDaysRow(spacing, rows, squareSize);
        }

        return (
            <Grid item key={uuidv4()}>
                <Grid key={uuidv4()} container spacing={spacing} direction={'column'}>
                    {rowGrid(columnIndex - 1)}
                </Grid>
            </Grid>
        );
    });
}

function GenerateSquare(previousDate, columnIndex, rows, rowIndex, squareSize, colors, endDate, dates) {
    const currentDate = endDate;
    const squareDate = new Date(previousDate.getFullYear(), previousDate.getMonth(), previousDate.getDate() + columnIndex * rows + rowIndex);
    if (currentDate < squareDate)
        return <Box key={columnIndex + ',' + rowIndex} sx={{ width: squareSize, height: squareSize }}></Box>

    return <Tooltip title={squareDate.toDateString()}>
        <Box key={columnIndex + ',' + rowIndex} sx={{ width: squareSize, backgroundColor: CalculateNumberBasedOnDate(colors, squareDate, dates), height: squareSize }}></Box>
    </Tooltip>;
}

function CalculateColumnsToShow(rows, months, endDate) {
    const currentDate = endDate;
    const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - months, currentDate.getDate());
    previousDate.setDate(currentDate.getDate() - previousDate.getDay());
    const diffDays = Math.ceil((currentDate - previousDate) / (1000 * 60 * 60 * 24));
    return { columns: Math.ceil(diffDays / rows) + 1, previousDate };
}

function GenerateMonthFromIndex(columnIndex, squareSize, firstDay, rows) {
    const currentDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + columnIndex * rows);
    const dateAfterWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6);

    if (dateAfterWeek.getMonth() != currentDate.getMonth() || currentDate.getDate() == 1)
        return <Typography key={uuidv4()}>{dateAfterWeek.toLocaleDateString("en-us", { month: 'short' })}</Typography>;

    return <Box key={'default' + columnIndex} sx={{ width: squareSize, backgroundColor: 'white', height: squareSize + 6 }}></Box>;
}

function GenerateDaysRow(spacing, rows, squareSize) {
    return <Grid key={uuidv4()} item>
        <Grid key={uuidv4()} container spacing={spacing} direction={'column'} mx={0.5}>
            {Array.from(Array(rows + 1)).map((_, rowIndex) => {
                switch (rowIndex) {
                    case 2:
                        return <Typography key={uuidv4()}>Mon</Typography>;
                    case 4:
                        return <Typography key={uuidv4()}>Wed</Typography>;
                    case 6:
                        return <Typography key={uuidv4()}>Fri</Typography>;
                    default:
                        return <Box key={'default-days' + rowIndex} sx={{ width: squareSize, backgroundColor: 'white', height: squareSize + 8 }}></Box>;
                }
            })}
        </Grid>
    </Grid>;
}