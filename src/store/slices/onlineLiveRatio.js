// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import {call} from 'ApiService';




// ----------------------------------------------------------------------

const initialState = {
    isInitialized: false, 
    error: null,
    items: [], 
    dtlItems : [], 
    chartData: []
};

const onlineLiveRatio = createSlice({
    name: 'onlineLiveRatio',
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

        // GET 
        getDtlItemsSuccess(state, action) {
            state.dtlItems = action.payload;
            state.isInitialized = true; 
        },

        // GET 
        getChartDataSuccess(state, action) {
            state.chartData = action.payload;
            state.isInitialized = true; 
        },        
        
        // clear item 
        clearItems(state, action) {
            state.items = [];
            state.chartData = [];
        },
        
    }
});

// Reducer
export default onlineLiveRatio.reducer;

export const {clearItems} = onlineLiveRatio.actions;


// ----------------------------------------------------------------------

export function getItems(param) {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=onlineLiveRatioMgr&svcid=searchNdp", "POST", param)
        .then((response)=>{
            dispatch(onlineLiveRatio.actions.getItemsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(onlineLiveRatio.actions.hasError(e));
          }
        );
    };
}
 
export function getChartData(param) {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=onlineLiveRatioMgr&svcid=searchChartNdp", "POST", param)
        .then((response)=>{
            dispatch(onlineLiveRatio.actions.getChartDataSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(onlineLiveRatio.actions.hasError(e));
          }
        );
    };
}

export function getDtlItems(param) {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=onlineLiveRatioMgr&svcid=searchOnlLiveRtDtlPopupNdp", "POST", param)
        .then((response)=>{
            dispatch(onlineLiveRatio.actions.getDtlItemsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(onlineLiveRatio.actions.hasError(e));
          }
        );
    };
}

