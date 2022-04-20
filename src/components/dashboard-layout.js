import { useState, useEffect } from 'react';
import { DashboardNavbar } from './dashboard-navbar';
import { Box, useMediaQuery } from '@mui/material';
import { DashboardSidebar } from './dashboard-sidebar';

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'), {
    noSsr: false
  });

  const style = {};
  if (lgUp) {
    style["paddingLeft"] = "280px";
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <>
      <Box sx={style}>
        {children}
      </Box>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};