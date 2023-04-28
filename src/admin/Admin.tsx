import AddBoxIcon from '@mui/icons-material/AddBox';
import AddHomeIcon from '@mui/icons-material/AddHome';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BedIcon from '@mui/icons-material/Bed';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WebIcon from '@mui/icons-material/Web';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, getMenus, getPages, getRooms, logout } from '../services';
import AdminModal from './AdminModal';
import AdminTable from './AdminTable';
import MenuModal from './MenuModal';
import MenuTable from './MenuTable';
import PageTable from './PageTable';
import ReservationTable from './ReservationTable';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Admin(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageState, setPageState] = useState(0);

  const pageTitles = [
    'Hotel Rooms Management',
    'Web Pages Management',
    'Restaurant Menus Management',
    'Reservation Management',
  ];
  const handlePageChange = (page: number) => {
    setPageState(page);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Rooms', 'Pages', 'Menus', 'Reservations'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handlePageChange(index);
              }}>
              <ListItemIcon>
                {index === 0 && <BedIcon />}
                {index === 1 && <WebIcon />}
                {index === 2 && <RestaurantIcon />}
                {index === 3 && <AssignmentTurnedInIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Add Room', 'Add Menu', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                index === 0 && handleOpen();
                index === 1 && handleMenuOpen();
                index === 2 && handleLogout();
              }}>
              <ListItemIcon>
                {index === 0 && <AddHomeIcon />}
                {index === 1 && <AddBoxIcon />}
                {index === 2 && <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Rooms
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Menus
  const [menuData, setMenuData] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  // Pages
  const [pageData, setPageData] = useState<any[]>([]);
  const [pageOpen, setPageOpen] = useState(false);
  const handlePageOpen = () => setPageOpen(true);
  const handlePageClose = () => setPageOpen(false);

  // Reservations
  const [reservationData, setReservationData] = useState<any[]>([]);
  const [reservationOpen, setReservationOpen] = useState(false);
  const handleReservationOpen = () => setReservationOpen(true);
  const handleReservationClose = () => setReservationOpen(false);

  const getAllData = async () => {
    const response = await getRooms();
    setData(response);
  };

  const getAllMenus = async () => {
    const response = await getMenus();
    setMenuData(response);
  };

  const getAllPages = async () => {
    const response = await getPages();
    setPageData(response);
  };

  const getAllReservations = async () => {
    const response = await getBookings();
    setReservationData(response);
  };

  console.log('Reservation Data: ', reservationData);

  useEffect(() => {
    getAllData();
    getAllMenus();
    getAllPages();
    getAllReservations();
  }, []);

  const perPage = 10;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            {pageTitles[pageState]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <Toolbar />
        {pageState === 0 && (
          <AdminTable data={data} perPage={perPage} getData={getAllData} />
        )}
        {pageState === 1 && (
          <PageTable data={pageData} perPage={perPage} getData={getAllPages} />
        )}
        {pageState === 2 && (
          <MenuTable data={menuData} perPage={perPage} getData={getAllMenus} />
        )}
        {pageState === 3 && (
          <ReservationTable
            data={reservationData}
            perPage={perPage}
            getData={getAllReservations}
          />
        )}
        <AdminModal
          open={open}
          handleClose={handleClose}
          getData={getAllData}
        />
        <MenuModal
          open={menuOpen}
          handleClose={handleMenuClose}
          getData={getAllMenus}
        />
      </Box>
    </Box>
  );
}
