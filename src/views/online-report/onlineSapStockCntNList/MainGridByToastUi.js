import React, { forwardRef, useImperativeHandle, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import {
  Backdrop,
  CircularProgress
} from '@mui/material';


// ag grid 
import 'tui-grid/dist/tui-grid.css';
import TuiGrid from '@toast-ui/react-grid';

// project 
import { useDispatch, useSelector } from 'store';
import { getItems, clearItems } from 'store/slices/sapstockcntn';


const MainGridByToastUi = forwardRef((props, ref) => {
  
  const mainState = useSelector((state) => state.sapstockcntn);
  const dispatch = useDispatch();  

  const [rowData, setRowData] = useState();

  const [backDropOpen, setBackDropOpen] = useState(false);
  
  //부모 컴포넌트에서 호출하는 자식의 함수들 정의 
  useImperativeHandle(ref, () => ({
    procFunc(action, params) {
      if (action === "search") {
        searchRowData();
      } 
      /*
      else if (action === "searchStcl") {
        searchStcl(params);
      }
      else if(action === "exportExcel") {
        exportGridData();
      }
      */
      console.log(action);
    }
  }));

  // 정보 조회하기 
  const searchRowData = async () => {
    //alert('searchRowData');
//    console.log(props.filter);
    //gridRef.current.api.showLoadingOverlay();

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
            else {
              newFilter[item.KEY] = item.VAL;
            }
        }
    });

    setBackDropOpen(true);
    await dispatch(getItems(newFilter));
    setBackDropOpen(false);    
  };

  let data = null; 

  useEffect(() => {
//    setRowData(mainState.items); 
    setRowData(JSON.parse(JSON.stringify(mainState.items)));

    //console.log(data);
    /*
//    setBackDropOpen(false);
    let totalRow = [{
        BRAND_CODE: 'Total', 
        VALID_STK_QTY: 0, 
        CNF_QTY: 0, 
        TOT_INV_QTY: 0, 
        DD_INV_QTY: 0, 
        WH_INV_QTY: 0, 
        MOV_QTY: 0, 
        PO_QTY: 0, 
        GR_QTY: 0, 
        NGR_QTY: 0
      }];

    if(mainState.items !== undefined && mainState.items !== null && mainState.items.length > 0){
      mainState.items.forEach((itme) => {
        totalRow[0].VALID_STK_QTY = totalRow[0].VALID_STK_QTY + itme.VALID_STK_QTY; 
        totalRow[0].CNF_QTY = totalRow[0].CNF_QTY + itme.CNF_QTY; 
        totalRow[0].TOT_INV_QTY = totalRow[0].TOT_INV_QTY + itme.TOT_INV_QTY; 
        totalRow[0].DD_INV_QTY = totalRow[0].DD_INV_QTY + itme.DD_INV_QTY; 
        totalRow[0].WH_INV_QTY = totalRow[0].WH_INV_QTY + itme.WH_INV_QTY; 
        totalRow[0].MOV_QTY = totalRow[0].MOV_QTY + itme.MOV_QTY;      
        totalRow[0].PO_QTY = totalRow[0].PO_QTY + itme.PO_QTY;
        totalRow[0].GR_QTY = totalRow[0].GR_QTY + itme.GR_QTY;
        totalRow[0].NGR_QTY = totalRow[0].NGR_QTY + itme.NGR_QTY;
      });
    }

    if(gridRef.current.api !== undefined && gridRef.current.api !== null){
      gridRef.current.api.setPinnedTopRowData(totalRow);        
    }
    */
  }, [mainState]);



  useEffect(() => {
    return () => {
      console.log("unmount.......................... proc.................");
      dispatch(clearItems());
    }
  }, []);
    
/*
  const data = [
      {
        BP_WH_INV_QTY: 0,
        BRAND_CODE: "HZ",
        CNF_QTY: 0,
        DD_INV_QTY: 0,
        EINDT: null,
        GR_QTY: null,
        IS_SOLDOUT: null,
        ITEM_CD: "HZHE2E101N1",
        MOV_QTY: 0,
        NDP_STCL_IMG_URL: "http://scm.lfcorp.com:90/DPS/product/prd/HZ/2022/60/HZHE2E101N1_00.jpg",
        NGR_QTY: null,
        PO_NO: null,
        PO_QTY: null,
        ROW_CNT: 1,
        ROW_SORT_KEY: 1,
        SAP_SOLDOUT: "●",
        SIZE_CD: "XXX",
        STCL_IMG_URL: "HttpDpImage::HZ/2022/60/HZHE2E101N1_00.jpg",
        STCL_IMG_URL_YN: "N",
        STCL_SIZE_CNT: 1,
        STOCK_LINK_YN: "Y",
        TOT_INV_QTY: 0,
        VALID_STK_QTY: 0,
        WH_INV_QTY: 0,
        ZLEGRDAT: null,
        ZPODAT: null
      }
      ];
  */
  
  const header = {
    height : 60, 
    complexColumns : 
                      [
                        {
                          header: 'Admin',
                          name: 'mergeColumn1',
                          childNames: ['STOCK_LINK_YN', 'VALID_STK_QTY', 'IS_SOLDOUT', 'CNF_QTY']
                        }, 
                        {
                          header: 'SAP 온라인 현 가용재고 (수량)',
                          name: 'mergeColumn2',
                          childNames: ['SAP_SOLDOUT', 'TOT_INV_QTY', 'DD_INV_QTY', 'WH_INV_QTY', 'MOV_QTY']
                        },     
                        {
                          header: '생산 미입고 현황',
                          name: 'mergeColumn3',
                          childNames: ['PO_NO', 'ZPODAT', 'PO_QTY', 'EINDT', 'ZLEGRDAT', 'GR_QTY', 'NGR_QTY']
                        },  
                      ]
  };

  const columns = [
    { name: 'BRAND_CODE', header: '브랜드', width:80},
    { name: 'NDP_STCL_IMG_URL', header: '이미지', width:80},
    { name: 'ITEM_CD', header: 'STCL', width:80},
    { name: 'SIZE_CD', header: 'Size', width:80},
    
    { name: 'STOCK_LINK_YN', header: '재고연계', width:80},
    { name: 'VALID_STK_QTY', header: '현재고량', width:80},
    { name: 'IS_SOLDOUT', header: '품절여부', width:80},
    { name: 'CNF_QTY', header: '예약주문수량', width:80},

    { name: 'SAP_SOLDOUT', header: '실재고품절', width:80},
    { name: 'TOT_INV_QTY', header: 'Total', width:80},
    { name: 'DD_INV_QTY', header: '직송매장', width:80},
    { name: 'WH_INV_QTY', header: '창고', width:80},
    { name: 'MOV_QTY', header: '이동중', width:80},

    { name: 'PO_NO', header: 'PO#', width:80},
    { name: 'ZPODAT', header: '발주일', width:80},
    { name: 'PO_QTY', header: '발주수량', width:80},
    { name: 'EINDT', header: '납품요청일', width:80},
    { name: 'ZLEGRDAT', header: '입고일', width:80},
    { name: 'GR_QTY', header: '입고수량', width:80},
    { name: 'NGR_QTY', header: '미입고 수량', width:80}
  ];

  return (
    <div>
      <TuiGrid

        data={rowData}
        header={header}
        columns={columns}
        rowHeight={25}

      
        bodyHeight={'fitToParent'}
        width={'auto'}

        scrollX= {false}      
        usageStatistics={false}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>    
    </div>
  );
});

export default MainGridByToastUi;