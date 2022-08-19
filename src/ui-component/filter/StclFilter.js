import PropTypes from 'prop-types';
import {useContext, useEffect, useState } from 'react';


// material-ui
import {
    Grid, 
    Skeleton,
    TextField
} from '@mui/material';


// ==============================|| STCL FILTER ||============================== //
const StclFilter = ({ filter, handleFilter }) => {
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
                        <TextField  id="edtStcl" value={filter.VAL} label="" variant="standard" fullWidth placeholder="" size="small" InputLabelProps={{shrink: true,}} onChange={(e) => handleFilter(filter.KEY, e.target.value)}/>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

StclFilter.propTypes = {
    filter: PropTypes.object,
    handleFilter: PropTypes.func
};

export default StclFilter;
