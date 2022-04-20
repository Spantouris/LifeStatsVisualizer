import Head from 'next/head';
import { Box, Button, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { StatComponent } from 'src/components/dashboard/statComponent';
import { v4 as uuidv4 } from 'uuid';
import { Constants } from 'src/utils/constants';

function RetrieveStatsFromLocalStorage() {
  if (typeof window === 'undefined')
    return;

  const stats = localStorage.getItem(Constants.STATS_LOCAL_STORAGE);

  if (stats != undefined) {
    return JSON.parse(stats);
  }

  return {};
}

function saveToLocal() {
  const stats = {
    statDates: {
      "3aac35d2-6617-4113-892d-ee8aac9861fa": [
        { "date": "2022-04-18T20:49:08.333Z", "value": 1 },
        { "date": "2022-04-16T20:49:08.333Z", "value": 1 },
        { "date": "2022-01-18T20:49:08.333Z", "value": 1 },
        { "date": "2022-01-18T20:49:08.333Z", "value": 1 }
      ]
    },
    statConfig: [
      {
        "id": "3aac35d2-6617-4113-892d-ee8aac9861fa",
        "title": "Running",
        "max": 1,
        "colors": ['#ebedf0', '#c6e48b', '#7bc96f', '#196127', '#ffffff']
      },
      {
        "id": "3aac35d2-6617-4113-892d-ee8aac9861fa",
        "title": "Running",
        "max": 1,
        "colors": ['#ebedf0', '#c6e48b', '#7bc96f', '#196127', '#000000']
      },
      {
        "id": "3aac35d2-6617-4113-892d-ee8aac9861fa",
        "title": "Running",
        "max": 1,
        "colors": ['#ebedf0', '#c6e48b', '#7bc96f', '#196127', '#000000']
      },
      {
        "id": "3aac35d2-6617-4113-892d-ee8aac9861fa",
        "title": "Running",
        "max": 1,
        "colors": ['#ebedf0', '#c6e48b', '#7bc96f', '#196127', '#000000']
      }
    ]
  };

  localStorage.setItem(Constants.STATS_LOCAL_STORAGE, JSON.stringify(stats));
}

const Dashboard = () => {
  const stats = RetrieveStatsFromLocalStorage();
  const statComponents = (stats?.statConfig || []).map((stat) => <Grid key={uuidv4()} item sm={12} md={10} lg={10} xl={6}>
    <StatComponent statConfig={stat} statDates={stats?.statDates[stat.id]} />
  </Grid>);

  return (
    <>
      <Head>
        <title>
          Dashboard
        </title>
      </Head>
      <Box sx={{ py: 8 }}>
        <Container maxWidth={false}>
          <Grid container>
            {statComponents}
          </Grid>
        </Container>
        <Button onClick={saveToLocal}>Save</Button>
      </Box>
    </>
  );
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
