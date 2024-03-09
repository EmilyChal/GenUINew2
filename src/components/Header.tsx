import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory, useLocation } from 'react-router-dom';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { toast } from 'react-toastify';
import Image from 'mui-image'
import {List,ListItem} from "@mui/material";
import { useAppDispatch, useAppSelector } from '../services/ConfigureStore';
import { signOut } from '../services/AccountSlice';
import agent from '../services/Agent';



const ResponsiveAppBar = () => {
    const matches = useMediaQuery('(max-width:600px)');
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    
    
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        setAnchorEl(null);
        dispatch(signOut());
    }

    const goToHome = () => {
        history.push('/');
    }
    
    const goToYourInputs = () => {
        history.push('/yourInputs');
    }
    
    const goToLeaderboard = () => {
        history.push('/leaderboard');
    }
    
    const goToForum = () => {
        history.push('/forum');
    }
    const goToTipsAndSuggestionsPage = () => {
        history.push('/tipsandsuggestions');
    }
    const handleDialogOpen = () => {
        handleCloseMenu();
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    

    return (
        <>
        {user &&
                <>
                <AppBar position="static" sx={{ bgcolor: 'white', padding: '20px' }}>
                    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', p: '0!important' }}>
                        <Container sx={[{ display: 'flex', justifyContent: 'space-between', p: '0!important', flexDirection: 'row', alignItems: 'center' }]}>
                           { user ?
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
                                    <Typography color='secondary.main' mr={2}>Hello {user.email.split('@')[0]}!</Typography>
                                    <LogoutIcon color='secondary' fontSize='large' onClick={logoutUser} sx={{ ":hover": { cursor: 'pointer' } }} />
                                </Box>
                                
                                : null
                           }
                        </Container>
                        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 2 }}>
                            <Button variant='text' onClick={goToHome} >
                                <Typography pl={1} pr={1} sx={{ borderLeft: '1px solid white', borderRight: '1px solid white' }} color='secondary.main' textAlign="center">Your Impact</Typography>
                            </Button>
                            <Button variant='text' onClick={goToYourInputs} >
                                <Typography pl={1} pr={1} sx={{ borderLeft: '1px solid white', borderRight: '1px solid white' }} color='secondary.main' textAlign="center">Your Inputs</Typography>
                            </Button>
                            <Button variant='text' onClick={goToLeaderboard} >
                                <Typography pl={1} pr={1} sx={{ borderLeft: '1px solid white', borderRight: '1px solid white' }} color='secondary.main' textAlign="center">Leaderboard</Typography>
                            </Button>
                            <Button variant='text' onClick={goToTipsAndSuggestionsPage} >
                                <Typography pl={1} pr={1} sx={{ borderLeft: '1px solid white', borderRight: '1px solid white' }} color='secondary.main' textAlign="center">Tips and  Suggestions</Typography>
                            </Button>
                            <Button variant='text' onClick={goToForum} >
                                <Typography pl={1} pr={1} sx={{ borderLeft: '1px solid white', borderRight: '1px solid white' }} color='secondary.main' textAlign="center">Forum</Typography>
                            </Button>
                        </Container>
                    </Container>
                </AppBar>
                </>
            }
        </>
        );
};
export default ResponsiveAppBar;
