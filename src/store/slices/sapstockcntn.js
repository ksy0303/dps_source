// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import {call} from 'ApiService';




// ----------------------------------------------------------------------

const initialState = {
    isInitialized: false, 
    error: null,
    items: []
};

const sapstockcntn = createSlice({
    name: 'sapstockcntn',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
            state.isInitialized = true; 
        },

        // GET 
        getItemsSuccess(state, action) {
            state.items = action.payload;
            state.isInitialized = true; 
        },
        
        // clear item 
        clearItems(state, action) {
            state.items = [];
        },
        
    }
});

// Reducer
export default sapstockcntn.reducer;

export const {clearItems} = sapstockcntn.actions;


// ----------------------------------------------------------------------

export function getItems(param) {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=onlineSapStockCntNList&svcid=searchNdp", "POST", param)
        .then((response)=>{
            dispatch(sapstockcntn.actions.getItemsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(sapstockcntn.actions.hasError(e));
          }
        );
    };
}
 

