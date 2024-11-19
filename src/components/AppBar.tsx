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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useAlert } from '@/context/AlertContext';
import { useSelector } from 'react-redux';
import { reducerUser } from '@/redux/auth/authType';

interface Roots {
    name: string;
    root: string
}

let pages: Roots[] | null = null;
let settings: Roots[] | null = null;

const SignInPages = [
    {
        name: "Products",
        root: "/profile"
    },
    {
        name: "Pricing",
        root: "/account"
    },
    {
        name: "Blog",
        root: "/dashboard"
    },

];


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



function ResponsiveAppBar() {



    const user = useSelector((state : reducerUser) => state.auth.user);
    //userが認証していたらTrue
    if (user) {
        pages = SignInPages;
        settings = SignInSettings;
    }
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (root: string | null) => {
        setAnchorElNav(null);
        if (root) {
            router.push(root)
        }
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
                    <TrendingUpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TRENDER
                    </Typography>
                    {!user ? null : <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu(null)}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages && pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.root)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                    <TrendingUpIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
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
                    {!user ? null : <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages && pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleCloseNavMenu(page.root)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>}
                    {!user ? null : <Box sx={{ flexGrow: 0 }}>
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
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;