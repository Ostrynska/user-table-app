import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider } from 'react-router';
import DashboardLayout from './components/DashboardLayout';
import UsersList from './components/UsersList';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from './theme/AppTheme';
import { sidebarCustomizations } from './theme/customizations';
import { dataGridCustomizations } from './theme/customizations/dataGrid';

const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        path: '/',
        Component: UsersList,
      },
    ],
  },
]);

const themeComponents = {
  ...sidebarCustomizations,
  ...dataGridCustomizations,
};

export default function App(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
