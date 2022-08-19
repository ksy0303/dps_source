import PropTypes from 'prop-types';
import {useEffect, useState } from 'react';

// material-ui
import {
    Grid, 
    Skeleton, 
    TextField 
} from '@mui/material';


import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


// third-party
import koLocale from 'date-fns/locale/ko';

// filter 조건 기술 
// ==============================|| 기준월 FILTER ||============================== //
const CalMonthFilter = ({ filter, handleFilter }) => {
    const [isCalMonthLoading, setCalMonthLoading] = useState(true);
    useEffect(() => {
        setCalMonthLoading(false);
    }, []);
//    console.log('CAL_MONTH ::', CAL_MONTH);
    return (
        <Grid container spacing={1}>
            {isCalMonthLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
                            <DesktopDatePicker
                                label=""
                                mask="____/__"
                                inputFormat="yyyy/MM"
                                value={filter.VAL}
                                onChange={(newValue) => {handleFilter(filter.KEY, newValue)}}
                                renderInput={(params) => <TextField {...params} size='small'/>}
                                views={['month']}
                                disableMaskedInput={true}
                            />
                        </LocalizationProvider>
                    </Grid>
                </>
            )}
        </Grid>
    );
}; 

CalMonthFilter.propTypes = {
    CAL_MONTH: PropTypes.object,
    handleFilter: PropTypes.func
};


export default CalMonthFilter;
