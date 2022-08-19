import { useEffect, useRef, useState } from 'react';

// material-ui
import {styled, useTheme } from '@mui/material/styles';
import {
    Box, 
    CardContent,
    Grid,
    IconButton,
    InputAdornment, 
    Stack, 
    TextField, 
    Tooltip, 
    Typography, 
    useMediaQuery
} from '@mui/material';

// third-party
//import ReactToPrint from 'react-to-print';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { drawerWidth, gridSpacing } from 'store/constant';
//import { useDispatch, useSelector } from 'store';
import { useDispatch} from 'store';
import FilterDrawer from './FilterDrawer';
import { openDrawer } from 'store/slices/menu';
//import FilterView from './FilterView';
import MainGrid from './MainGrid';
import MainGridByToastUi from './MainGridByToastUi';

// assets
//import FilterAltIcon from '@mui/icons-material/FilterAlt';


import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import CloseIcon from '@mui/icons-material/Close';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
//import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';


// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    //width: 'calc(100% - 320px)',
    width: 'calc(100% - 260px)',
    height: 'calc(100vh - 220px)',
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('xl')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginLeft: 0
    })
}));


const OnlineSapStockCntNList = () => {

    const componentRef = useRef(null);
    const mainGridRef = useRef();

    const theme = useTheme();
    const dispatch = useDispatch();
    
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
//    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));


    const spacingMD = matchDownMD ? 1 : 1.5;

    const [openFilterSidebar, setOpenFilterSidebar] = useState(true);
    const handleDrawerOpen = () => {
        setOpenFilterSidebar((prevState) => !prevState);
    };

    useEffect(() => {
        if (matchDownSM) {
            setOpenFilterSidebar(false);
        } else {
            setOpenFilterSidebar(true);
        }
    }, [matchDownSM]);


/*
    const [rows, setRows] = useState([]);

    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        setRows(products);
    }, [products]);
*/
    useEffect(() => {
        // hide left drawer when email app opens
        dispatch(openDrawer(false));

//        dispatch(getProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initialState = {
        search: '', 
        __HRCY_SBRAND:{KEY:'__HRCY_SBRAND', VAL:[], TYPE:'HRCY'},          
        NORMAL_CD: {KEY:'NORMAL_CD',VAL:'10', TYPE:'RADIO'},
        PROD_YYYY: {KEY:'PROD_YYYY',VAL:'2022', TYPE:'RADIO'}, 
        __SEASON: {KEY:'__SEASON',VAL:['all'], TYPE:'MULTI_CHECK'},
        __ITEM: {KEY:'__ITEM',VAL:[], TYPE:'MULTI_COMBO'}, 
        ON_BUY_GB: {KEY:'ON_BUY_GB',VAL:[], TYPE:'MULTI_COMBO'},  
        SEARCH_STCL: {KEY:'SEARCH_STCL',VAL:'', TYPE:'TEXT'}, 
        PARAM_JAEGON:{KEY:'PARAM_JAEGON',VAL:true}, TYPE:'CHECKBOX', 
        PARAM_SOLDOUT:{KEY:'PARAM_SOLDOUT',VAL:true}, TYPE:'CHECKBOX', 
    };

    const [filter, setFilter] = useState(initialState);

    /*
    const filterIsEqual = (a1, a2) =>
        a1 === a2 ||
        (a1.length === a2.length &&
            a1.search === a2.search &&
            a1.sort === a2.sort &&
            a1.NORMAL_CD === a2.NORMAL_CD &&
            a1.PROD_YYYY === a2.PROD_YYYY &&
            a1.__SEASON === a2.__SEASON &&
            JSON.stringify(a1.__ITEM) === JSON.stringify(a2.__ITEM) &&
            JSON.stringify(a1.ON_BUY_GB) === JSON.stringify(a2.ON_BUY_GB));
    */

    const handleFilter = (type, params, rating) => {
        switch (type) {
            case filter.__HRCY_SBRAND.KEY:
                //console.log('params : ', params);                
                setFilter({ ...filter, __HRCY_SBRAND: {...filter.__HRCY_SBRAND, VAL:params} });   
                break;
            case filter.NORMAL_CD.KEY:
                setFilter({ ...filter, NORMAL_CD:{...filter.NORMAL_CD, VAL:params}});           
                break;
            case filter.PROD_YYYY.KEY:
                setFilter({ ...filter, PROD_YYYY:{...filter.PROD_YYYY, VAL:params}});           
                break;
            case filter.__SEASON.KEY:
                // 이전값이 있으면 제거 
                if (filter.__SEASON.VAL.some((item) => item === params)) {
                    setFilter({ ...filter, __SEASON: {...filter.__SEASON, VAL:filter.__SEASON.VAL.filter((item) => item !== params) }});                    
                } 
                // 전체 선택시 
                else if (filter.__SEASON.VAL.some((item) => item === 'all') || params === 'all') {
                    setFilter({ ...filter, __SEASON: {...filter.__SEASON, VAL:[params]} });                                        
                } 
                // 필터값 추가 
                else {
                    setFilter({ ...filter, __SEASON: {...filter.__SEASON, VAL:[...filter.__SEASON.VAL, params] }});                        
                }
                break;
            case filter.__ITEM.KEY: 
                //console.log('params', params);
                setFilter({ ...filter, __ITEM: {...filter.__ITEM, VAL:params} });   
                //console.log('prodItem', filter.prodItem);
                break;             
            case filter.ON_BUY_GB.KEY: 
                setFilter({ ...filter, ON_BUY_GB: {...filter.ON_BUY_GB, VAL:params} });                   
                break;       
            case filter.SEARCH_STCL.KEY:  
                setFilter({ ...filter, SEARCH_STCL: {...filter.SEARCH_STCL, VAL:params} });                      
//                console.log('stcl params', params);
                break;       
            case filter.PARAM_JAEGON.KEY:
                setFilter({ ...filter, PARAM_JAEGON: {...filter.PARAM_JAEGON, VAL:params} });                                      
//                console.log('jaegoN params', params);
                break;       
            case filter.PARAM_SOLDOUT.KEY:
                setFilter({ ...filter, PARAM_SOLDOUT: {...filter.PARAM_SOLDOUT, VAL:params} });                                      
//                console.log('jaegoN params', params);
                break;                       
            case 'reset':
                //console.log('bef', filter.normal);                
                setFilter(initialState);
                break;
                
            case 'reset':
                //console.log('bef', filter.normal);                
                setFilter(initialState);
                break;

            case 'search':
                //console.log('bef', filter.normal);                
                mainGridRef.current.procFunc("search");
                break;
                
                

            default:
            // no options
        }
        // console.log(filter.normal);
    };

    const onChangeSearch = (event) => {
        const newString = event?.target.value; 
        setFilter({ ...filter, search: newString });
    }

    const handleSearch = (event) => {
        if(event.key === "Enter"){
            mainGridRef.current.procFunc("searchStcl", filter.search);
        }
    };

    const exportExcel = ()  => {
        mainGridRef.current.procFunc("exportExcel");
    };


    return (
        <MainCard content={false}>
            <CardContent>
                <Box sx={{ display: 'flex' }}>
                    <FilterDrawer
                        filter={filter}                    
                        handleDrawerOpen={handleDrawerOpen}                        
                        handleFilter={handleFilter}
                        openFilterSidebar={openFilterSidebar}
                    />
                    <Main theme={theme} open={openFilterSidebar}>
                        <Grid container spacing={0.5} direction="row" alignItems="flex-start">
                            <Grid item container xs={12} spacing={gridSpacing} id='grid1'>
                                <Grid item xs={1}>
                                    {/* 
                                    <Button
                                        disableRipple
                                        onClick={handleDrawerOpen}
                                        color="secondary"
                                        startIcon={<FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />}
                                    >
                                        Filter
                                    </Button>    
                                    */}
                                    <Tooltip title="Filter">
                                        <IconButton onClick={handleDrawerOpen} size="large">
                                            <MenuRoundedIcon color="secondary" />
                                        </IconButton>                                    
                                    </Tooltip>                                    
                                </Grid>
                                <Grid item xs>
                                    {/** 
                                    <FilterView
                                        filter={filter}
                                        filterIsEqual={filterIsEqual}
                                        handelFilter={handleFilter}
                                        initialState={initialState}
                                    />  
                                    */}
                                </Grid>   
                                <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                    <Stack direction="row" alignItems="center" justifyContent="right" spacing={matchDownSM ? 0.5 : spacingMD}>
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon fontSize="small" />
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={onChangeSearch} 
                                            onKeyUp={handleSearch}
                                            placeholder="Search 스타일칼라"
                                            value={filter.search}
                                            size="small"
                                        />                                    
                                        <Typography sx={{ pl: 1.5, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>
                                        {/**
                                        <ReactToPrint trigger={() => <Tooltip title="Print"><IconButton size="large"><PrintIcon color="secondary" /></IconButton></Tooltip>} content={() => componentRef.current} />
                                         */}
                                        <Tooltip title="Excel Download">
                                            <IconButton size="large" onClick={exportExcel} > 
                                                <FileDownloadIcon color="secondary"  />
                                            </IconButton>
                                        </Tooltip>                                                   
                                    </Stack>                                                      
                                </Grid>                                   
                                                                
                            </Grid>
                            <Grid item xs={12}  sx={{ height: 'calc(100vh - 262px)'}} ref={componentRef}>
                                <MainGrid filter={filter} ref={mainGridRef}></MainGrid>
                                {/**<MainGridByToastUi filter={filter} ref={mainGridRef}></MainGridByToastUi>**/}
                            </Grid>                            
                        </Grid>
                    </Main>
                </Box>
            </CardContent>
            
        </MainCard>
    );
};

export default OnlineSapStockCntNList;
