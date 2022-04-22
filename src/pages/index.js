import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { StatComponent } from 'src/components/dashboard/statComponent';
import { v4 as uuidv4 } from 'uuid';
import { Constants } from 'src/utils/constants';
import { StatsServiceContext } from 'src/services/statsService';
import { useContext } from 'react';

const Dashboard = () => {
  const stats = useContext(StatsServiceContext).retrieveStats();
  const statComponents = (stats?.statConfig || []).map((stat) => <Grid key={uuidv4()} item sm={12} md={10} lg={10} xl={6}>
    <StatComponent statConfig={stat} statDates={stats?.statDates[stat?.id]} />
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
