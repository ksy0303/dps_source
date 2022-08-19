import PropTypes from 'prop-types';
import {useContext, useEffect, useState } from 'react';

// material-ui
import {
    Autocomplete, 
    Checkbox,
    Grid, 
    Skeleton, 
    TextField
} from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// project imports
import {FilterContext} from 'contexts/FilterContext';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ==============================|| 품목 FILTER ||============================== //
const ProdItemFilter = ({ filter, handleFilter }) => {
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
                            value={filter.VAL}
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
                            onChange={(event, newValue) => handleFilter(filter.KEY, newValue)}
                        />       
                    </Grid>
                </>
            )}
        </Grid>
    );
};

ProdItemFilter.propTypes = {
    filter: PropTypes.object,
    handleFilter: PropTypes.func
};


export default ProdItemFilter;
