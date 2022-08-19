import PropTypes from 'prop-types';
import {useContext, useEffect, useState } from 'react';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Autocomplete, 
    Button, 
    CardContent, 
    Checkbox,
    Divider, 
    Drawer, 
    FormControl,
    FormControlLabel,    
    Grid, 
    Paper, 
    Radio, 
    RadioGroup, 
    Skeleton, 
    Stack, 
    Switch, 
    TextField, 
    Typography, 
    useMediaQuery
} from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import useConfig from 'hooks/useConfig';
//import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';
import { drawerWidth, gridSpacing } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';

import {FilterContext} from 'contexts/FilterContext';

import BrandHrcy from 'ui-component/filter/BrandHrcy';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


// filter 조건 기술 
// ==============================|| 정상이월 FILTER ||============================== //

const Normal = ({ NORMAL_CD, handleFilter }) => {
    const [isNormalLoading, setNormalLoading] = useState(true);
    useEffect(() => {
        setNormalLoading(false);
    }, []);

    const {normalOptions} = useContext(FilterContext);


//    console.log('normalOptions', normalOptions);

    console.log('NORMAL_CD', NORMAL_CD);

    return (
        <Stack direction="row" alignItems="center">
            {isNormalLoading ? (
                <Skeleton variant="rectangular" width="100%" height={42} />
            ) : (
                <>
                    <FormControl component="fieldset">
                        <RadioGroup 
                            row
                            aria-label="layout"
                            value={NORMAL_CD.VAL}
                            onChange={(e) => handleFilter(NORMAL_CD.KEY, e.target.value)}
                            name="row-radio-buttons-group"
                        >
                            <Grid container spacing={0.25}>
                                {
                                    normalOptions.map((option) => (
                                        <Grid item xs={6} key={option.CODE}>
                                            <FormControlLabel
                                                value={option.CODE}
                                                control={<Radio />}
                                                label={option.NAME}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 20 },
                                                    '& .MuiFormControlLabel-label': { color: 'grey.900', fontSize: '0.8rem' }
                                                }}
                                            />
                                        </Grid>  
                                    ))
                                }
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </>
            )}
        </Stack>
    );
};

Normal.propTypes = {
    NORMAL_CD: PropTypes.object,
    handleFilter: PropTypes.func
};

// ==============================|| 제품년도 FILTER ||============================== //
const ProdYyyy = ({ PROD_YYYY, handleFilter }) => {
    const [isProdYyyyLoading, setProdYyyyLoading] = useState(true);
    useEffect(() => {
        setProdYyyyLoading(false);
//        console.log('loading filter');
    }, []);

    const {prodYyyyOptions} = useContext(FilterContext);


    return (
        <Stack direction="row" alignItems="center">
            {isProdYyyyLoading ? (
                <Skeleton variant="rectangular" width="100%" height={42} />
            ) : (
                <>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            aria-label="layout"
                            value={PROD_YYYY.VAL}
                            onChange={(e) => handleFilter(PROD_YYYY.KEY, e.target.value)}
                            name="row-radio-buttons-group"
                        >
                            <Grid container spacing={0.25}>
                                {
                                    prodYyyyOptions.map((option) => (
                                        <Grid item xs={4}  key={option.CODE}>
                                            <FormControlLabel
                                                value={option.CODE}
                                                control={<Radio />}
                                                label={option.NAME}
                                                sx={{
                                                    '& .MuiSvgIcon-root': { fontSize: 20 },
                                                    '& .MuiFormControlLabel-label': { color: 'grey.900', fontSize: '0.8rem' }
                                                }}
                                            />
                                        </Grid>  
                                    ))
                                }
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </>
            )}
        </Stack>
    );
};

ProdYyyy.propTypes = {
    PROD_YYYY: PropTypes.object,
    handleFilter: PropTypes.func
};



// ==============================|| 시즌 FILTER ||============================== //
const Season = ({ __SEASON, handleFilter }) => {
    const [isSeasonLoading, setSeasonLoading] = useState(true);
    useEffect(() => {
        setSeasonLoading(false);
    }, []);

    const {seasonOptions} = useContext(FilterContext);

    return (
        <Grid container spacing={0}>
            {isSeasonLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>

                    {
                        seasonOptions.map((option, index) => (
                            <Grid item xs={4} key={index}>                                
                                <FormControlLabel 
                                    key={option.CODE}
                                    control={<Checkbox checked={__SEASON.VAL.some((item) => item === option.CODE)} />}
                                    onChange={() => handleFilter(__SEASON.KEY, option.CODE)}
                                    label={option.NAME}
                                />                             
                            </Grid>                                
                        ))
                    }                            

                </>
            )}
        </Grid>
    );
};

Season.propTypes = {
    __SEASON: PropTypes.object,
    handleFilter: PropTypes.func
};


// ==============================|| 품목 FILTER ||============================== //
const ProdItem = ({ __ITEM, handleFilter }) => {
    const [isProdItemLoading, setProdItemLoading] = useState(true);
    useEffect(() => {
        setProdItemLoading(false);
    }, []);

    const {prodItemOptions} = useContext(FilterContext);

    return (
        <Grid container spacing={1}>
            {isProdItemLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="multiProdItem"
                            size="small"
                            multiple
                            limitTags={1}                            
                            disableCloseOnSelect
                            options={prodItemOptions}
                            getOptionLabel={(option) => option.NAME}
                            value={__ITEM.VAL}
                            //defaultValue={prodItem}
                            renderOption={(props, option, {selected}) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.NAME}
                                </li>
                            )}                                
                            renderInput={(params) => (
                                <TextField {...params} label="" placeholder="" size="small" />
                            )}
                            isOptionEqualToValue={(option, value) => option.CODE === value.CODE}
                            onChange={(event, newValue) => handleFilter(__ITEM.KEY, newValue)}
                        />       
                    </Grid>
                </>
            )}
        </Grid>
    );
};

ProdItem.propTypes = {
    __ITEM: PropTypes.object,
    handleFilter: PropTypes.func
};


// ==============================|| 온라인 바잉 FILTER ||============================== //
const OnBuyGb = ({ ON_BUY_GB, handleFilter }) => {
    const [isOnBuyGbLoading, setOnBuyGbLoading] = useState(true);
    useEffect(() => {
        setOnBuyGbLoading(false);
    }, []);

    const {onBuyGbOptions} = useContext(FilterContext);

    return (
        <Grid container spacing={1}>
            {isOnBuyGbLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="multiOnBuyGb"
                            size="small"                            
                            multiple
                            limitTags={1}                            
                            disableCloseOnSelect
                            options={onBuyGbOptions}
                            getOptionLabel={(option) => option.NAME}
                            value={ON_BUY_GB.VAL}
                            renderOption={(props, option, {selected}) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.NAME}
                                </li>
                            )}                                
                            renderInput={(params) => (
                                <TextField {...params} label="" placeholder="" size="small" />
                            )}
                            isOptionEqualToValue={(option, value) => option.CODE === value.CODE}
                            onChange={(event, newValue) => handleFilter(ON_BUY_GB.KEY, newValue)}
                        />       
                    </Grid>
                </>
            )}
        </Grid>
    );
};

OnBuyGb.propTypes = {
    ON_BUY_GB: PropTypes.object,
    handleFilter: PropTypes.func
};

// ==============================|| STCL FILTER ||============================== //
const Stcl = ({ SEARCH_STCL, handleFilter }) => {
    const [isStclLoading, setStclLoading] = useState(true);
    useEffect(() => {
        setStclLoading(false);
    }, []);

    return (
        <Grid container spacing={1}>
            {isStclLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <TextField  id="edtStcl" value={SEARCH_STCL.VAL} label="" variant="standard" fullWidth placeholder="" size="small" InputLabelProps={{shrink: true,}} onChange={(e) => handleFilter(SEARCH_STCL.KEY, e.target.value)}/>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

Stcl.SEARCH_STCL = {
    SEARCH_STCL: PropTypes.object,
    handleFilter: PropTypes.func
};



// ==============================|| Filter DRAWER ||============================== //
const FilterDrawer = ({ filter, handleDrawerOpen, handleFilter, openFilterSidebar}) => {
    const theme = useTheme();
    const { borderRadius } = useConfig(); 
    const matchDownSM = useMediaQuery(theme.breakpoints.down('xl'));

//    console.log('filter', filter);
    const filterData = [
        {
            id: 'NORMAL_CD',
            defaultExpand: true,
            title: '정상/이월',
            content: <Normal NORMAL_CD={filter.NORMAL_CD} handleFilter={handleFilter} />
        }, 
        {
            id: 'PROD_YYYY',
            defaultExpand: true,
            title: '제품년도',
            content: <ProdYyyy PROD_YYYY={filter.PROD_YYYY} handleFilter={handleFilter} />
        },         
        {
            id: '__SEASON',
            defaultExpand: (filter.__SEASON.length > 0)? true:false,
            title: '시즌',
            content: <Season __SEASON={filter.__SEASON} handleFilter={handleFilter} />
        },        
        {
            id: '__ITEM',
            defaultExpand: true,
            title: '품목',
            content: <ProdItem __ITEM={filter.__ITEM} handleFilter={handleFilter} />
        },          
        {
            id: 'ON_BUY_GB',
            defaultExpand: false,
            title: '온라인바잉',
            content: <OnBuyGb ON_BUY_GB={filter.ON_BUY_GB} handleFilter={handleFilter} />
        },  
        {
            id: 'SEARCH_STCL',
            defaultExpand: false,
            title: 'STCL',
            content: <Stcl SEARCH_STCL={filter.SEARCH_STCL} handleFilter={handleFilter} />
        },                          
        {
            id: 'etcChk',
            defaultExpand: false,
            title: '기타',
            content: <>
                     <FormControlLabel label="제고연계 N" control={<Switch checked={filter.PARAM_JAEGON.VAL} onChange={(event) => handleFilter(filter.PARAM_JAEGON.KEY, event.target.checked)} name={filter.PARAM_JAEGON.KEY} color="primary" />} sx={{fontSize:13}} />
                     <FormControlLabel label="품절 STCL"  control={<Switch checked={filter.PARAM_SOLDOUT.VAL} onChange={(event) => handleFilter(filter.PARAM_SOLDOUT.KEY, event.target.checked)} name={filter.PARAM_SOLDOUT.KEY} color="primary" />} sx={{fontSize:13}} />
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
                        <Grid item xs={12}  sx={{ height: '40%'}}>
                            <Paper variant="outlined" sx={{ height: '100%'}}>
                                <BrandHrcy __HRCY_SBRAND={filter.__HRCY_SBRAND} handleFilter={handleFilter}  />
                            </Paper> 
                        </Grid>
                        
                        <Grid item xs={12}  sx={{ height: '55%' }}>
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
