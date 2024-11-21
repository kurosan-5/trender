'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAlert } from '@/context/AlertContext';
import { useSelector } from 'react-redux';
import { reducerUser } from '@/redux/auth/authType';
import { List, ListItem, ListItemButton, ListItemText, Divider, Drawer, styled } from '@mui/material';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface Roots {
    name: string;
    root: string
}

let settings: Roots[] | null = null;


const SignInSettings = [
    {
        name: "Profile",
        root: "/profile"
    },
    {
        name: "Account",
        root: "/account"
    },
    {
        name: "Dashboard",
        root: "/dashboard"
    },
    {
        name: "Signout",
        root: "/signout"
    },
];

const list = (toggleDrawer: (value: boolean) => void) => (
    <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
    >
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Box>
);
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function ResponsiveAppBar() {
    const [open, toggleDrawer] = useState(false)
    const user = useSelector((state: reducerUser) => state.auth.user);
    //userが認証していたらTrue
    if (user) {
        settings = SignInSettings;
    }
    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const { showAlert } = useAlert()
    const handleCloseUserMenu = (root: string | null) => {
        setAnchorElUser(null);
        if (root) {
            if (root === "/signout") {
                signOut(auth)
                    .then(() => {
                        showAlert("ログアウトしました", "success");
                        router.push("/auth")
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            } else {
                router.push(root)
            }
        }
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {!user ? null : <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>}
                    
                    <TrendingUpIcon sx={{ display: 'flex', mr: 2 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TRENDER
                    </Typography>
                    {!user ? null : 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => handleCloseUserMenu(null)}
                        >
                            {settings && settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => handleCloseUserMenu(setting.root)}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
                <Drawer
                    open={open}
                    onClose={() => toggleDrawer(false)}
                >
                    <DrawerHeader>
                        <IconButton>
                            <ChevronLeftIcon onClick={() => toggleDrawer(false)}/>
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {list(toggleDrawer)}
                </Drawer>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;