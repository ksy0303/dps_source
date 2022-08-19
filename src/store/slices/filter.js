// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import {call} from 'ApiService';

// ----------------------------------------------------------------------

const initialState = {
    isInitialized: false, 
    error: null,
    orgOptions: [],
    normalOptions: [{CODE:'10', NAME:'정상'}, {CODE:'20', NAME:'이월'}],
    normalFullOptions: [{CODE:'all', NAME:'All'}, {CODE:'10', NAME:'정상'}, {CODE:'20', NAME:'순이월'}, {CODE:'30', NAME:'재생산'}],
    prodYyyyOptions: [],
    seasonOptions: [],
    prodItemOptions: [], 
    onBuyGbOptions: [  {NAME: '자사몰 단독 바잉', CODE: 'A' },
                { NAME: '제휴몰 단독 바잉', CODE: 'B' },
                { NAME: 'LF몰 단독 PB상품', CODE: 'D' },
                { NAME: '타사상품 LF몰 단독 바잉', CODE: 'E' },
                { NAME: '온라인 입점상품', CODE: 'Z' }
                ]
};

const fitler = createSlice({
    name: 'fitler',
    initialState,
    reducers: {
        // SET initialState
        setInitialState(state, action) {
            state.isInitialized = action.payload; 
        }, 

        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
            state.isInitialized = true; 
        },

        // GET 조직정보  
        getOrgOptionsSuccess(state, action) {
            state.orgOptions = action.payload;
            state.isInitialized = true; 
        },

        // GET 제품년도 
        getProdYyyyOptionsSuccess(state, action) {
            state.prodYyyyOptions = action.payload;
            state.isInitialized = true; 
        },


        // GET 시즌  
        getSeasonOptionsSuccess(state, action) {
            state.seasonOptions = action.payload;
            state.isInitialized = true; 
        },

        // GET 품목정보 
        getPodItemOptionsSuccess(state, action) {
            state.prodItemOptions = action.payload;
            state.isInitialized = true; 
        } 


    }
});

// Reducer
export default fitler.reducer;

export const { setInitialState} = fitler.actions;

// ----------------------------------------------------------------------

export function getOrgOptions() {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=Main&svcid=getNdpSBrandHrcy", "POST", null)
        .then((response)=>{
            dispatch(fitler.actions.getOrgOptionsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(fitler.actions.hasError(e));
          }
        );
           
        /* 
        try {
            alert("getOrg");
            //const response = await axios.post('/api/NDSCMServer?ctrlid=Main&svcid=getNdpSBrandHrcy');
            const response = await axios.get('http://localhost:8080/DPS/NDSCMServer?ctrlid=Main&svcid=getNdpSBrandHrcy');
            console.log("response : " , response);
            dispatch(slice.actions.getOrgSuccess(response.data.result));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
        */
    };
}

export function getProdYyyyOptions() {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=Main&svcid=getNdpProdYyyy", "POST", null)
        .then((response)=>{
            dispatch(fitler.actions.getProdYyyyOptionsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(fitler.actions.hasError(e));
          }
        );
    };
}

export function getSeasonOptions() {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=Main&svcid=getNdpSeason", "POST", null)
        .then((response)=>{
            dispatch(fitler.actions.getSeasonOptionsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(fitler.actions.hasError(e));
          }
        );
    };
}

export function getPodItemOptions() {
    return  async () => {
        await call("/NDSCMServer?isXP=N&ctrlid=Main&svcid=getNdpItem", "POST", null)
        .then((response)=>{
            dispatch(fitler.actions.getPodItemOptionsSuccess(response.result));
          }
        )
        .catch((e)=>{
            dispatch(fitler.actions.hasError(e));
          }
        );
    };
}
