import PropTypes from 'prop-types';
import {useContext} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import {FilterContext} from 'contexts/FilterContext';

// assets
import CloseIcon from '@mui/icons-material/Close';

/*
function getColor(color) {
    return ColorOptions.filter((item) => item.value === color);
}
*/

// ==============================|| PRODUCT GRID - FILTER VIEW ||============================== //

const FilterView = ({ filter, filterIsEqual, handelFilter, initialState }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const {normalOptions, prodYyyyOptions, seasonOptions} = useContext(FilterContext);

    return (
        <>
            {!filterIsEqual(initialState, filter) && (
                <Grid container spacing={0.5} sx={{ pb: 0.5}} alignItems="center" wrap="nowrap">
                    {!(initialState.search === filter.search) && ( 
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ pb: '12px !important', p: 1.5 }}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle1">Rating</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip
                                                size={matchDownMD ? 'small' : undefined}
                                                label={filter.search}
                                                chipcolor="secondary"
                                                onDelete={() => handelFilter('search', '')}
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}
                    {!(initialState.sort === filter.sort) && (
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ pb: '12px !important', p: 1.5 }}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle1">Sort</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip
                                                size={matchDownMD ? 'small' : undefined}
                                                label={filter.sort}
                                                chipcolor="secondary"
                                                onDelete={() => handelFilter('sort', initialState.sort)}
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}
                    {/*{!(initialState.normal === filter.normal) && ( */}
                    {!(filter.NORMAL_CD === '') && (
                        <Grid item>
                            <SubCard content={false}>
                                {/*<CardContent sx={{ pb: '12px !important', p: 1.5 }}> */}
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle3">정상/이월</Typography>
                                        </Grid> 
                                        
                                        {normalOptions.map((item, index) => {
                                            if(item.CODE === filter.NORMAL_CD) {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            size={matchDownMD ? 'small' : undefined}
                                                            label={item.NAME}
                                                            chipcolor="secondary"
                                                            sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                                        />
                                                    </Grid>  
                                                );
                                            } 
                                            else {
                                                return (
                                                    <></>
                                                )
                                            }                                            
                                        })}

                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}         
                    {/*{!(initialState.prodYyyy === filter.prodYyyy) && ( */}
                    {!(filter.PROD_YYYY === '') && (    
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle3">제품년도</Typography>
                                        </Grid>
                                        {prodYyyyOptions.map((item, index) => {
                                            if(item.CODE === filter.PROD_YYYY) {
                                                return (
                                                    <Grid item key={index}>
                                                        <Chip
                                                            size={matchDownMD ? 'small' : undefined}
                                                            label={item.NAME}
                                                            chipcolor="secondary"
                                                            sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                                        />
                                                    </Grid>  
                                                );
                                            } 
                                            else {
                                                return (
                                                    <></>
                                                )
                                            }
                                        })}
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}                                   
                    {!(JSON.stringify(initialState.__SEASON) === JSON.stringify(filter.__SEASON)) && filter.__SEASON.length > 0 && (
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle3">시즌</Typography>
                                        </Grid>

                                        {filter.__SEASON.map((item, index) => {
                                            let color = 'secondary';
                                            let title = (seasonOptions.filter((option) => option.CODE === item)[0]).NAME;
                                            //console.log(title.NAME);
                                            return (
                                                <Grid item key={index}>
                                                    <Chip
                                                        size={matchDownMD ? 'small' : undefined}
                                                        label={title}
                                                        onDelete={() => handelFilter('__SEASON', item)}
                                                        chipcolor={color}
                                                        sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                                    />
                                                </Grid>  
                                            );
                                        })}
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}
                    {!(JSON.stringify(initialState.__ITEM) === JSON.stringify(filter.__ITEM)) && (
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle3">품목</Typography>
                                        </Grid>

                                        {filter.__ITEM.map((item, index) => {
                                            let color = 'secondary';
                                            let title = item.NAME;
                                            return (
                                                <Grid item key={index}>
                                                    <Chip
                                                        size={matchDownMD ? 'small' : undefined}
                                                        label={title}
                                                        //onDelete={() => handelFilter('prodItem', item)}
                                                        chipcolor={color}
                                                        sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                                    />
                                                </Grid>  
                                            );
                                        })}
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}                    
                    {!(JSON.stringify(initialState.ON_BUY_GB) === JSON.stringify(filter.ON_BUY_GB)) && (
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle3">온라인바잉</Typography>
                                        </Grid>

                                        {filter.ON_BUY_GB.map((item, index) => {
                                            let color = 'secondary';
                                            let title = item.NAME;
                                            return (
                                                <Grid item key={index}>
                                                    <Chip
                                                        size={matchDownMD ? 'small' : undefined}
                                                        label={title}
                                                        //onDelete={() => handelFilter('onBuyGb', item)}
                                                        chipcolor={color}
                                                        sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                                    />
                                                </Grid>  
                                            );
                                        })}
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}          
                    {!(filter.SEARCH_STCL === '') && (    
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Typography variant="subtitle3">STCL</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip
                                                size={matchDownMD ? 'small' : undefined}
                                                label={filter.SEARCH_STCL}
                                                chipcolor="secondary"
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        </Grid>  
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}                                                            
                    {(filter.PARAM_JAEGON === true) && (    
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Chip
                                                size={matchDownMD ? 'small' : undefined}
                                                label='재고연계N'
                                                chipcolor="secondary"
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        </Grid>                                          
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}   
                    {(filter.PARAM_SOLDOUT === true) && (    
                        <Grid item>
                            <SubCard content={false}>
                                <CardContent sx={{ p: 0.5 , height : '42px'}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <Chip
                                                size={matchDownMD ? 'small' : undefined}
                                                label='품절STCL'
                                                chipcolor="secondary"
                                                sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                                            />
                                        </Grid>                                                         
                                    </Grid>
                                </CardContent>
                            </SubCard>
                        </Grid>
                    )}   

                    <Grid item>
                        <Button variant="outlined" startIcon={<CloseIcon />} color="error" onClick={() => handelFilter('reset', '')}>
                            Clear All
                        </Button>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

FilterView.propTypes = {
    filter: PropTypes.object,
    filterIsEqual: PropTypes.func,
    initialState: PropTypes.object,
    handelFilter: PropTypes.func
};

export default FilterView;
