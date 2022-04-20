import Head from 'next/head';
import { StatConfigurator } from 'src/components/settings/statConfigurator';
import { DashboardLayout } from '../components/dashboard-layout';
import { Box, Container, Grid } from '@mui/material';
import { useContext } from 'react';
import { StatsServiceContext } from 'src/services/statsService';

const Settings = () => {
  const stats = useContext(StatsServiceContext).retrieveStats();

  return (
    <>
      <Head>
        <title>
          Settings
        </title>
      </Head>
      <Box sx={{ py: 8 }}>
        <Container maxWidth={false}>
          <StatConfigurator stats={stats}></StatConfigurator>
        </Container>
      </Box>
    </>
  )
};

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
