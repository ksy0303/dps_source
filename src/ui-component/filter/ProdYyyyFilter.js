import PropTypes from 'prop-types';
import {useContext, useEffect, useState } from 'react';

// material-ui
import {
    Checkbox,
    FormControl, 
    FormControlLabel,    
    Grid,
    Radio, 
    RadioGroup,  
    Skeleton, 
    Stack
} from '@mui/material';


import {FilterContext} from 'contexts/FilterContext';

// ==============================|| 제품년도 FILTER ||============================== //
const ProdYyyyFilter = ({ filter, handleFilter }) => {
    const [isProdYyyyLoading, setProdYyyyLoading] = useState(true);
    useEffect(() => {
        setProdYyyyLoading(false);
//        console.log('loading filter');
    }, []);

    const {prodYyyyOptions} = useContext(FilterContext);

    // 전체 추가 
    const condiOptions =[{CODE:'all', NAME:'All', DSEQ:0, CHK:"0"}, ...prodYyyyOptions];


    return (
        <>
        {filter.TYPE === 'MULTI_CHECK'?
            (
            <Grid container spacing={0}>
                {isProdYyyyLoading ? (
                    <Grid item xs={12}>
                        <Skeleton variant="rectangular" width="100%" height={96} />
                    </Grid>
                ) : (                
                    <>
                        {
                            condiOptions.map((option, index) => (
                                <Grid item xs={4} key={index}>                                
                                    <FormControlLabel 
                                        key={option.CODE}
                                        control={<Checkbox checked={filter.VAL.some((item) => item === option.CODE)} />}
                                        onChange={() => handleFilter(filter.KEY, option.CODE)}
                                        label={option.NAME}
                                    />                             
                                </Grid>                                
                            ))
                        }     
                    </>
                )}
            </Grid>
        ):
        (
            <Stack direction="row" alignItems="center">
                {isProdYyyyLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={42} />
                ) : (
                    <>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label="layout"
                                value={filter.VAL}
                                onChange={(e) => handleFilter(filter.KEY, e.target.value)}
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
        )}
        </>        
    );    
};

ProdYyyyFilter.propTypes = {
    filter: PropTypes.object,
    handleFilter: PropTypes.func
};

export default ProdYyyyFilter;
