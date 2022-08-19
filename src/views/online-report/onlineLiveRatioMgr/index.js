import { useEffect, useRef, useState } from 'react';

// material-ui
import {styled, useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Collapse, 
    Grid,
    IconButton,
    InputAdornment, 
    Paper, 
    Stack, 
    TextField, 
    ToggleButton, 
    ToggleButtonGroup,     
    Tooltip, 
    Typography, 
    useMediaQuery
} from '@mui/material';

// third-party
//import ReactToPrint from 'react-to-print';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { drawerWidth as drawerWidth, gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import FilterDrawer from './FilterDrawer';
import { openDrawer } from 'store/slices/menu';
//import FilterView from './FilterView';
import MainGrid from './MainGrid';
import LineChart from './LineChart';

// assets
//import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import CloseIcon from '@mui/icons-material/Close';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'; 
//import PrintIcon from '@mui/icons-material/PrintTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';

//import { IconChartDots } from '@tabler/icons';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.3),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));


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


const OnlineLiveRatioMgr = () => {

    const [chartVisible, setChartVisible] = useState(true); 
    const [tableVisible, setTableVisible] = useState(true); 

    const [formats, setFormats] = useState(() => ['chart', 'table']);

    const handleFormat = (event, newFormats) => {
      setFormats(newFormats);
      console.log('newFormats ::', newFormats)


      if(newFormats.some((item) => item === 'chart')) {
        setChartVisible(true);
      }
      else {
        setChartVisible(false);
      }

      if(newFormats.some((item) => item === 'table')) {
        setTableVisible(true);
      }
      else {
        setTableVisible(false);
      }
    };

    const componentRef = useRef(null);
    const mainGridRef = useRef();
    const chartRef = useRef();

    const theme = useTheme();
    const dispatch = useDispatch();
    
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));


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
;
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

    var today = new Date();
//    var curMonth = ((today.getMonth()+1)<10)?('0'+(today.getMonth()+1)):(today.getMonth()+1);
//    var initMonth = today.getFullYear()  + '' + curMonth + '01' ;
//    console.log('today::' + today);
 
    const initialState = {
        search: '', 
        __HRCY_SBRAND:{KEY:'__HRCY_SBRAND', VAL:[], TYPE:'HRCY'},  
        CAL_MONTH: {KEY:'CAL_MONTH', VAL:today, TYPE:'CALENDAR_MONTH'}, 
        __NORMAL_CODE: {KEY:'__NORMAL_CODE',VAL:['all'], TYPE:'MULTI_CHECK'},
        __PROD_YYYY: {KEY:'__PROD_YYYY',VAL:['all'], TYPE:'MULTI_CHECK'}, 
        __SEASON: {KEY:'__SEASON',VAL:['all'], TYPE:'MULTI_CHECK'},
        __ITEM: {KEY:'__ITEM',VAL:[], TYPE:'MULTI_COMBO'}, 
        ON_BUY_GB: {KEY:'ON_BUY_GB',VAL:[], TYPE:'MULTI_COMBO'},  
        SEARCH_STCL: {KEY:'SEARCH_STCL',VAL:'', TYPE:'TEXT'}, 
        EXCEPT_ETC_ITEM:{KEY:'EXCEPT_ETC_ITEM',VAL:true}, TYPE:'CHECKBOX', 
    };

    const [filter, setFilter] = useState(initialState);

    const filterIsEqual = (a1, a2) =>
        a1 === a2 ||
        (a1.length === a2.length &&
            a1.search === a2.search &&
            a1.sort === a2.sort &&
            a1.__NORMAL_CODE === a2.__NORMAL_CODE &&
            a1.__PROD_YYYY === a2.__PROD_YYYY &&
            a1.__SEASON === a2.__SEASON &&
            JSON.stringify(a1.__ITEM) === JSON.stringify(a2.__ITEM) &&
            JSON.stringify(a1.ON_BUY_GB) === JSON.stringify(a2.ON_BUY_GB));


    const handleFilter = (type, params, rating) => {
        switch (type) {
            case filter.__HRCY_SBRAND.KEY:
                //console.log('params : ', params);                
                setFilter({ ...filter, __HRCY_SBRAND: {...filter.__HRCY_SBRAND, VAL:params} });   
                break;
            case filter.CAL_MONTH.KEY:
//                console.log('TEST OBJECT : ', { ...filter, CAL_MONTH:{...filter.CAL_MONTH, VAL:params}});            
                setFilter({ ...filter, CAL_MONTH:{...filter.CAL_MONTH, VAL:params}});                 
//                console.log('stcl params', params);
                break;                      
            case filter.__NORMAL_CODE.KEY:
                //console.log('bef', filter.NORMAL_CD);                
                // 이전값이 있으면 제거 
                if (filter.__NORMAL_CODE.VAL.some((item) => item === params)) {
                    setFilter({ ...filter, __NORMAL_CODE: {...filter.__NORMAL_CODE, VAL:filter.__NORMAL_CODE.VAL.filter((item) => item !== params) }});
                } 
                // 전체 선택시 
                else if (filter.__NORMAL_CODE.VAL.some((item) => item === 'all') || params === 'all') {
                    setFilter({ ...filter, __NORMAL_CODE: {...filter.__NORMAL_CODE, VAL:[params]} });
                } 
                // 필터값 추가 
                else {
                    setFilter({ ...filter, __NORMAL_CODE: {...filter.__NORMAL_CODE, VAL:[...filter.__NORMAL_CODE.VAL, params] }});
                }
                break;
            case filter.__PROD_YYYY.KEY:
                // 이전값이 있으면 제거 
                if (filter.__PROD_YYYY.VAL.some((item) => item === params)) {
                    setFilter({ ...filter, __PROD_YYYY: {...filter.__PROD_YYYY, VAL:filter.__PROD_YYYY.VAL.filter((item) => item !== params) }});
                } 
                // 전체 선택시 
                else if (filter.__PROD_YYYY.VAL.some((item) => item === 'all') || params === 'all') {
                    setFilter({ ...filter, __PROD_YYYY: {...filter.__PROD_YYYY, VAL:[params]} });                    
                } 
                // 필터값 추가 
                else {
                    setFilter({ ...filter, __PROD_YYYY: {...filter.__PROD_YYYY, VAL:[...filter.__PROD_YYYY.VAL, params] }});                    
                }
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
            case filter.EXCEPT_ETC_ITEM.KEY:
                setFilter({ ...filter, EXCEPT_ETC_ITEM: {...filter.EXCEPT_ETC_ITEM, VAL:params} });                                      
//                console.log('jaegoN params', params);
                break;       
            case 'reset':
                //console.log('bef', filter.normal);                
                setFilter(initialState);
                break;

            case 'search':
                //console.log('bef', filter.normal);                
                mainGridRef.current.procFunc("search");
                chartRef.current.procFunc("search");
                break;
                
            default:
            // no options
        }
         console.log(filter);
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
                            <Grid item container xs={12} spacing={gridSpacing}>
                                <Grid item xs={4}>
                                    <Tooltip title="Filter">
                                        <IconButton onClick={handleDrawerOpen} sx={{mb:1.5}}>
                                            <MenuRoundedIcon color="secondary" />
                                        </IconButton>                                    
                                    </Tooltip>      

                                    <StyledToggleButtonGroup
                                        value={formats}
                                        onChange={handleFormat}
                                        size="small"
                                        color="secondary"
                                    >

                                        <ToggleButton value="chart" key="chart">
                                            <Tooltip title={chartVisible?"Chart Close":"Chart Open"}>                
                                                <BarChartIcon />
                                            </Tooltip>                                                
                                        </ToggleButton>                                        

                                        <ToggleButton value="table" key="filter">
                                            <Tooltip title={tableVisible?"Table Close":"Table Open"}>                                                
                                                <TableChartIcon />
                                            </Tooltip>                                                
                                        </ToggleButton>

                                    </StyledToggleButtonGroup>
                                                                                                        
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
                                <Grid item xs={5} sx={{ textAlign: 'right' }}>
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
                            <Collapse in={chartVisible} sx={{ width:'100%'}}>
                                <Grid item xs={12} sx={{ width:'100%', height: tableVisible?'200px':'calc(100vh - 270px)'}}>
                                    <Paper elevation={2} sx={{width:'100%', height:'100%'}}>
                                        <LineChart filter={filter} tableVisible={tableVisible} ref={chartRef}/> 
                                    </Paper >
                                </Grid>                                    
                            </Collapse>
                            <Collapse in={tableVisible} sx={{ width:'100%', mt:chartVisible?1:0}}>
                                <Grid item xs={12} sx={{ height: chartVisible?'calc(100vh - 478px)':'calc(100vh - 270px)'}} ref={componentRef}>
                                    <MainGrid filter={filter} ref={mainGridRef}></MainGrid>
                                </Grid>                                     
                            </Collapse>
{/**
                            {chartVisible && tableVisible ? (                                
                                <>
                                    <Grid item xs={12} sx={{ height: '200px'}}>
                                        <Paper variant="outlined" elevation={3} sx={{width:'100%', height:'100%'}}>chart</Paper >
                                    </Grid>    
                                    <Grid item xs={12} sx={{ height: 'calc(100vh - 470px)'}} ref={componentRef}>
                                        <MainGrid filter={filter} ref={mainGridRef}></MainGrid>
                                    </Grid>                                                            
                                </>
                                ) 
                                :
                                (
                                chartVisible? 
                                (
                                    <Grid item xs={12} sx={{ height: 'calc(100vh - 270px)'}}>
                                        <Paper variant="outlined" elevation={3} sx={{width:'100%', height:'100%'}}>chart</Paper >
                                    </Grid>                                 
                                ):
                                (
                                    <Grid item xs={12} sx={{ height: 'calc(100vh - 270px)'}} ref={componentRef}>
                                        <MainGrid filter={filter} ref={mainGridRef}></MainGrid>
                                    </Grid>    
                                )
                                )
                            }
 */}                            
                        </Grid>
                    </Main>
                </Box>
            </CardContent>
            
        </MainCard>
    );
};

export default OnlineLiveRatioMgr;
