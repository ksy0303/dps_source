// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
//import SearchSection from './SearchSection';
//import MobileSection from './MobileSection';
//import ProfileSection from './ProfileSection';
//import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
//import NotificationSection from './NotificationSection';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import navigation from 'menu-items';
import Breadcrumbs from 'ui-component/extended/BreadcrumbsOnHeader';

// assets
import { IconMenu2 } from '@tabler/icons';
import { IconChevronRight } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    height: 40,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, mt :'4px', flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                        }
                    }}
                    onClick={() => dispatch(openDrawer(!drawerOpen))}
                    color="inherit"
                >
                    <IconMenu2 stroke={1.5} size="1.3rem" />
                </Avatar>
            </Box>

            {/* header search 
            <SearchSection />
            */}
            {/* header search 
            <Box sx={{ flexGrow: 1, height: 40}}>
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
            </Box>
            */}
            <Box sx={{ flexGrow: 1, height: 40}}></Box>
            <Box sx={{ flexGrow: 1, height: 40}} />

            {/* mega-menu */}
            <MegaMenuSection />
            {/**
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            </Box>
             */}            

            {/* live customization & localization 
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box>
            */}

            {/* notification & profile 
            <NotificationSection />
            <ProfileSection />
            */}

            {/* mobile header 
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
            */}
        </>
    );
};

export default Header;
