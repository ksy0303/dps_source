import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

import { useDispatch, useSelector } from 'store';
import { getOrgOptions, getProdYyyyOptions, getSeasonOptions, getPodItemOptions, setInitialState} from 'store/slices/filter';

import Loader from 'ui-component/Loader';


// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //
export const FilterContext = createContext(null); 

export const FilterProvider = ({ children }) => {
    
    const filterState = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrgOptions());
        dispatch(getProdYyyyOptions());
        dispatch(getSeasonOptions());
        dispatch(getPodItemOptions());
        dispatch(setInitialState(true)); 
    }, []);    

    ///console.log("filterState", filterState);
    if (filterState.isInitialized !== undefined && !filterState.isInitialized) {
        return <Loader />;
    }

    return (
        <FilterContext.Provider value={{...filterState}}>{children}</FilterContext.Provider>
    );
};

FilterProvider.propTypes = {
    children: PropTypes.node
};

export default  { FilterProvider, FilterContext }; ;

