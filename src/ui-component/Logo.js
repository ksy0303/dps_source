// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

import logoDark from 'assets/images/logo-dark.svg';
import logo from 'assets/images/gnb2_logo.png';


// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="DP SYSTEM" width="172" height="28" />  
    );
};

export default Logo;
