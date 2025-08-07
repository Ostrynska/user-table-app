import { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import DashboardSidebarContext from '../context/DashboardSidebarContext';
import { YEAR, DEVELOPER_NAME } from '../constants';

export default function DashboardSidebarFooterItem() {
  const sidebarContext = useContext(DashboardSidebarContext);
  const mini = sidebarContext?.mini ?? false;

  return (
    <Box
      sx={{
        mt: 'auto',
        px: 1.5,
        py: 0,
      }}
    >
      <Grow in={true} appear timeout={400} key={mini ? 'mini' : 'expanded'}>
        <Box
          sx={{
            mb: 2,
            mt: 1,
            display: 'flex',
            flexDirection: mini ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <Box
            component="a"
            href="https://github.com/ostrynska"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <GitHubIcon sx={{ fontSize: mini ? 18 : 20 }} />
          </Box>
          <Box
            component="a"
            href="https://www.linkedin.com/in/kateryna-ostrynska-9155b0151/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LinkedInIcon sx={{ fontSize: mini ? 18 : 20 }} />
          </Box>
          <Box
            component="a"
            href="https://ostrynska-kateryna.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LanguageIcon sx={{ fontSize: mini ? 18 : 20 }} />
          </Box>
          <Box
            component="a"
            href="mailto:kateriinag@gmail.com"
            sx={{
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <EmailIcon sx={{ fontSize: mini ? 18 : 20 }} />
          </Box>
        </Box>
      </Grow>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: mini ? 0 : 1,
        }}
      >
        <Grow in={true} appear timeout={400} key={mini ? 'mini' : 'expanded'}>
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{
              fontSize: mini ? 10 : 12,
              fontWeight: 500,
            }}
          >
            © {YEAR}
          </Typography>
        </Grow>
        <Fade in={!mini} timeout={400}>
          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            sx={{
              fontSize: 12,
              fontWeight: 500,
              display: mini ? 'none' : 'block',
            }}
          >
            {DEVELOPER_NAME}
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
}
