import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button, 
    CardContent, 
    Divider, 
    Drawer, 
    FormControlLabel,    
    Grid, 
    Paper, 
    Stack, 
    Switch,
    Typography, 
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import useConfig from 'hooks/useConfig';
import { drawerWidth, gridSpacing } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';

import BrandHrcy from 'ui-component/filter/BrandHrcy';
import NormalFilter from 'ui-component/filter/NormalFilter';
import ProdYyyyFilter from 'ui-component/filter/ProdYyyyFilter';
import SeasonFilter from 'ui-component/filter/SeasonFilter';
import ProdItemFilter from 'ui-component/filter/ProdItemFilter';
import OnBuyGbFilter from 'ui-component/filter/OnBuyGbFilter';
import StclFilter from 'ui-component/filter/StclFilter';
import CalMonthFilter from 'ui-component/filter/CalMonthFilter';

// ==============================|| Filter DRAWER ||============================== //
const FilterDrawer = ({ filter, handleDrawerOpen, handleFilter, openFilterSidebar}) => {
    const theme = useTheme();
    const { borderRadius } = useConfig(); 
    const matchDownSM = useMediaQuery(theme.breakpoints.down('xl'));

//    console.log('filter', filter);
    const filterData = [
        {
            id: 'CAL_MONTH',
            defaultExpand: true,
            title: '기준월',
            content: <CalMonthFilter filter={filter.CAL_MONTH} handleFilter={handleFilter} />
        }, 
        {
            id: '__NORMAL_CODE',
            defaultExpand: true,
            title: '정상/이월',
            //content: <NormalMulti __NORMAL_CODE={filter.__NORMAL_CODE} handleFilter={handleFilter} />
            content: <NormalFilter filter={filter.__NORMAL_CODE} handleFilter={handleFilter} />
        }, 
        {
            id: '__PROD_YYYY',
            defaultExpand: true,
            title: '제품년도',
            content: <ProdYyyyFilter filter={filter.__PROD_YYYY} handleFilter={handleFilter} />
        },         
        {
            id: '__SEASON',
            defaultExpand: (filter.__SEASON.length > 0)? true:false,
            title: '시즌',
            content: <SeasonFilter filter={filter.__SEASON} handleFilter={handleFilter} />
        },        
        {
            id: '__ITEM',
            defaultExpand: true,
            title: '품목',
            content: <ProdItemFilter filter={filter.__ITEM} handleFilter={handleFilter} />
        },          
        {
            id: 'ON_BUY_GB',
            defaultExpand: false,
            title: '온라인바잉',
            content: <OnBuyGbFilter filter={filter.ON_BUY_GB} handleFilter={handleFilter} />
        },  
        {
            id: 'SEARCH_STCL',
            defaultExpand: false,
            title: 'STCL',
            content: <StclFilter filter={filter.SEARCH_STCL} handleFilter={handleFilter} />
        },                          
        {
            id: 'etcChk',
            defaultExpand: false,
            title: '기타',
            content: <>
                     <FormControlLabel label="기타품목제외" control={<Switch checked={filter.EXCEPT_ETC_ITEM.VAL} onChange={(event) => handleFilter(filter.EXCEPT_ETC_ITEM.KEY, event.target.checked)} name={filter.EXCEPT_ETC_ITEM.KEY} color="primary" />} sx={{fontSize:13}} />
                     </>  
        },     
    ];
    
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                height: matchDownSM ? '100vh' : 'auto',
                flexShrink: 0,
                zIndex: { xs: 1200, xl: 0 },
                '& .MuiDrawer-paper': {
                    height: 'auto',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: 'relative',
                    border: 'none',
                    borderRadius: matchDownSM ? 0 : `${borderRadius}px`
                }
            }}
            variant={matchDownSM ? 'temporary' : 'persistent'}
            anchor="left"
            open={openFilterSidebar}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerOpen}
        >
            {openFilterSidebar && (
            <MainCard
                sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
                }}
                border={!matchDownSM}
                content={false}
            >
                <CardContent sx={{ p: 1, height: matchDownSM ? '100vh' : 'calc(100vh - 216px)', bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : '#ffffff'}}>
                    <Grid container spacing={gridSpacing} sx={{ height: '100%'}}>
                        <Grid item xs={12}  sx={{ height: '32%'}}>
                            <Paper variant="outlined" sx={{ height: '100%'}}>
                                <BrandHrcy __HRCY_SBRAND={filter.__HRCY_SBRAND} handleFilter={handleFilter}  />
                            </Paper> 
                        </Grid>
                        
                        <Grid item xs={12}  sx={{ height: '63%' }}>
                            <Divider><Typography color="text.dark" display="block" variant="h5">Filter</Typography></Divider>
                            <PerfectScrollbar component="div">                                                    
                                <Accordion data={filterData} square={true}/>
                            </PerfectScrollbar>                                                    
                        </Grid>

                        <Grid item xs={12} sx={{ m: 0, height: '5%' }}>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Button variant="contained" fullWidth color="error" onClick={() => handleFilter('search', '')}>
                                    검색하기
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>

            </MainCard> 
            )}
        </Drawer>
    );
};

FilterDrawer.propTypes = {
    filter: PropTypes.object,
    handleDrawerOpen: PropTypes.func,
    handleFilter: PropTypes.func,
    openFilterSidebar: PropTypes.bool
};

export default FilterDrawer;
