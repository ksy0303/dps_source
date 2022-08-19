import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box
} from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';

import { getChartData} from 'store/slices/onlineLiveRatio';

// chart options
const lineChartOptions = {
    chart: {
        type: 'line',        
        height: 200,
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: true, 
        style: {
            colors: undefined
        }        
    },
    stroke: {
        curve: 'smooth',
        width: 2
    }, 
    markers: {
        size: [4, 4]
    }    
    , 
    xaxis: {
        categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월']
    }
};

// ==============================|| LINE CHART ||============================== //
const LineChart = forwardRef((props, ref) => {

    const mainState = useSelector((state) => state.onlineLiveRatio);
    const dispatch = useDispatch();  

    const theme = useTheme();
    const { navType } = useConfig();

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;

    const [series, setSeries] = useState([
        {
            name: '라이브율 (STCL)',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }, 
        {
            name: '라이블율 (SIZE)',
            data: [50, 20, 55, 75, 95, 68, 50, 91, 128]
        }       
    ]);

    const [xTitle,  setXtitle]  = useState([]); 

    const [options, setOptions] = useState(lineChartOptions);
    
    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [secondary, primary],
            xaxis: {
                categories: xTitle, 
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },            
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: navType === 'dark' ? darkLight + 20 : grey200
            },
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }, 
        }));

        //console.log('xTitle : ', xTitle);
        
    }, [navType, primary, darkLight, grey200, secondary, xTitle]);



    useEffect(() => {
        //console.log('mainState.chartData : ', mainState.chartData); 

        let title = [];
        let series1Data = [];
        let series2Data = [];

        mainState.chartData.forEach((item, index) => {
            title[index]        = item.H_TITLE;
            series1Data[index]  = item.LV_STCL_RT;
            series2Data[index]  = item.LV_SIZE_RT;
        });
        
        let seriesData = [
            {
                name: '라이브율 (STCL)',
                data: series1Data
            }, 
            {
                name: '라이블율 (SIZE)',
                data: series2Data
            }
        ];

        setSeries(seriesData);
        setXtitle(title);

    }, [mainState.chartData]);
    

    //부모 컴포넌트에서 호출하는 자식의 함수들 정의 
    useImperativeHandle(ref, () => ({
        procFunc(action, params) {
        if (action === "search") {
            searchChartData();
        } 
        }
    }));

    // 정보 조회하기 
    const searchChartData = () => {
        let newFilter = new Object();  
        (Object.values(props.filter)).forEach((item)=>{
            if(item.KEY !== undefined){
                if(item.TYPE === "CHECKBOX") {
                newFilter[item.KEY] = item.VAL?"1":"0";
                }
                else if(item.TYPE === "MULTI_COMBO") {      
                let newVal = (item.VAL).map((val)=>{return val.CODE});
                newFilter[item.KEY] = newVal;
                }  
                else if(item.TYPE === "CALENDAR_MONTH") {      
                let curMonth = ((item.VAL.getMonth()+1)<10)?('0'+(item.VAL.getMonth()+1)):(item.VAL.getMonth()+1);
                let newVal = item.VAL.getFullYear()  + '' + curMonth;              
                newFilter[item.KEY] = newVal;
            }  
            else {
                newFilter[item.KEY] = item.VAL;
                }
            }
        });

        dispatch(getChartData(newFilter));        
    };

    return (
        <Box id="chart" sx={{width:'100%', height:'100%'}}>
            <ReactApexChart options={options} series={series} type="line" width={'98%'} height={props.tableVisible?'98%':'96%'} />
        </Box>
    );
});

export default LineChart;
