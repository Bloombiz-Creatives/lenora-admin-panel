import React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionDetails, AccordionSummary, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '/lenora2-01.png';
import cat1 from '../assets/cat1.svg';

const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#525b39', 
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: '#525b39', 
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        border: 'none',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                borderRight: 'none',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                borderRight: 'none',
            },
        }),
    }),
);

const CustomPaper = styled(Paper)({
    backgroundColor: 'transparent',
    boxShadow: 'none',
});

export default function Sidebar() {
    const [open, setOpen] = React.useState(true);
    const [iconHovered, setIconHovered] = React.useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Website', route: '/dashboard', icon1: cat1, icon2: cat1,
            subItems: [
                { text: 'Home ', route: '/dashboard' },
                { text: ' Shope  ', route: '/dashboard/shope' },
            ],
        },
        { text: 'Brands', route: '/dashboard/brands', icon1: cat1, icon2: cat1 },
        { text: 'Categories', route: '/dashboard/categories', icon1: cat1, icon2: cat1 },   
    ];

    return (
        <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ border: 'none' }}>
                <DrawerHeader>
                    <div className="flex items-center justify-between w-full px-3">
                        <MenuIcon onClick={() => setOpen(!open)} className='cursor-pointer ' />
                        {open ? (
                            <div onClick={() => navigate('/dashboard')} className='flex justify-end cursor-pointer'>
                                <h2 className='font-bold text-[30px] p-8 w-[220px] cursor-pointer'>
                                    <div className='flex text-[25px]'>
                                        <img src={logo} alt='Lenora' className='object-contain'/>
                                    </div>
                                </h2>
                            </div>
                        ) : null}
                    </div>
                </DrawerHeader>
                <List sx={{ margin: 0 }}>
                    {menuItems.map((item, index) => {
                        const isSelected = location.pathname === item.route;

                        if (item.subItems) {
                            return (
                                <Accordion
                                    key={index}
                                    sx={{
                                        padding: '10px',
                                        border: 'none',
                                        boxShadow: 'none',
                                        margin: 0,
                                        borderTop: 'none',
                                        '&:before': { display: 'none' },
                                        backgroundColor: 'transparent',
                                    }}
                                    components={{
                                        Paper: CustomPaper
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}a-content`}
                                        id={`panel${index}a-header`}
                                        className={`text-white ${isSelected ? 'text-white' : 'text-white bg-[#525b39] hover:bg-[#737d57]'}`}
                                        onMouseEnter={() => setIconHovered(index)}
                                        onMouseLeave={() => setIconHovered(null)}
                                        sx={{ backgroundColor: isSelected ? '#525b39' : 'transparent', padding: '0px 16px', borderRadius: '15px' }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                            <img src={iconHovered === index ? item.icon1 : item.icon2} alt={item.text} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ backgroundColor: 'transparent', padding: 0 }}>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <ListItem
                                                key={subIndex}
                                                disablePadding
                                                sx={{ display: 'block' }}
                                                onClick={() => navigate(subItem.route)}
                                            >
                                                <ListItemButton
                                                    sx={{
                                                        minHeight: 34,
                                                        borderRadius: 2,
                                                        justifyContent: open ? 'initial' : 'center',
                                                        color: location.pathname === subItem.route ? 'white' : 'white',
                                                        '&:hover': {
                                                            color: 'white',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                        },
                                                    }}
                                                    className={`hover:text-white ${location.pathname === subItem.route ? 'text-white' : 'text-white'}`}
                                                >
                                                    {open && (
                                                        <ListItemText primary={subItem.text} sx={{ opacity: open ? 1 : 0, color: 'white' }} />
                                                    )}
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        }

                        return (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ display: 'block' }}
                                onMouseEnter={() => setIconHovered(index)}
                                onMouseLeave={() => setIconHovered(null)}
                                onClick={() => navigate(item.route)}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 34,
                                        marginX: 1,
                                        marginY: 1,
                                        borderRadius: 2,
                                        justifyContent: open ? 'initial' : 'center',
                                        color: isSelected || iconHovered === index ? 'white' : 'white',
                                        backgroundColor: isSelected ? '#525b39' : 'transparent',
                                        '&:hover': {
                                            color: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: isSelected || iconHovered === index ? 'white' : 'white',
                                        }}
                                    >
                                        <img
                                            src={isSelected || iconHovered === index ? item.icon1 : item.icon2}
                                            alt={item.text}
                                        />
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                opacity: open ? 1 : 0,
                                                color: isSelected || iconHovered === index ? 'white' : 'white',
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </Box>
    );
}

