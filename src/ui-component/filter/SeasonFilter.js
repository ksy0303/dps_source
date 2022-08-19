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
    Stack, 
} from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import {FilterContext} from 'contexts/FilterContext';


// ==============================|| 시즌 FILTER ||============================== //
const SeasonFilter = ({ filter, handleFilter }) => {
    const [isSeasonLoading, setSeasonLoading] = useState(true);
    useEffect(() => {
        setSeasonLoading(false);
    }, []);

    const {seasonOptions} = useContext(FilterContext);

    return (
        <>
        {filter.TYPE === 'MULTI_CHECK'?
            (
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
                {isSeasonLoading ? (
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
                                        seasonOptions.map((option) => (
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

SeasonFilter.propTypes = {
    filter: PropTypes.object,
    handleFilter: PropTypes.func
};

export default SeasonFilter;
