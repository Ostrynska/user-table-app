import { useRef, useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import SitemarkIcon from './SitemarkIcon';

export default function DashboardLayout() {
  const theme = useTheme();
  const [resetCallback, setResetCallback] = useState<null | (() => void)>(null);
  const navigate = useNavigate();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] = useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] = useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = useCallback(
    (newExpanded: boolean) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [isOverMdViewport]
  );

  const handleToggleHeaderMenu = useCallback(
    (isExpanded: boolean) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded]
  );

  const handleLogoClick = useCallback(() => {
    navigate({ pathname: '/', search: '' });
    if (resetCallback) resetCallback();
  }, [navigate, resetCallback]);

  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={layoutRef}
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
      }}
    >
      <DashboardHeader
        logo={<SitemarkIcon />}
        title="Random Users"
        menuOpen={isNavigationExpanded}
        onToggleMenu={handleToggleHeaderMenu}
        onLogoClick={handleLogoClick}
      />
      <DashboardSidebar
        expanded={isNavigationExpanded}
        setExpanded={setIsNavigationExpanded}
        container={layoutRef?.current ?? undefined}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
        >
          <Outlet context={{ onLogoReset: setResetCallback }} />
        </Box>
      </Box>
    </Box>
  );
}
