import React, { forwardRef, useImperativeHandle, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import {
  Backdrop,
  CircularProgress
} from '@mui/material';


// ag grid 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
//import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'assets/scss/MainGrid.scss';

// project 
import { useDispatch, useSelector } from 'store';
import { getItems, clearItems } from 'store/slices/sapstockcntn';
import { excelStyles } from 'store/constant';

//import './BrandHrcy.scss';

const MainGrid = forwardRef((props, ref) => {
  
  const mainState = useSelector((state) => state.sapstockcntn);
  const dispatch = useDispatch();  
  
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  
  const [rowData, setRowData] = useState();
  

  const [backDropOpen, setBackDropOpen] = useState(false);

  const onGridReady = (params) => {
//    console.log('onGridReady ');      
  };

  const formatNumber = (params) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    
    return Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };


  

  const [columnDefs, setColumnDefs] = useState([
    { headerName: '브랜드', 
      field: 'BRAND_CODE', 
      headerClass: ['header-row-merge2', 'border-right-lightgray'], 
      cellClass: ['string', 'cell-align-center', 'cell-span-not-bg'], 
      pinned: 'left', 
      width: 80 
      //suppressSizeToFit: true 
    },


    { headerName: '이미지', 
      field: 'NDP_STCL_IMG_URL', 
      headerClass: ['header-row-merge2', 'cell-color-white', 'border-right-lightgray'], 
      cellClass: ['cell-span'], 
      cellRenderer: params => {
        return <img width="60px" alt="" src={params.value} />
      }, 
      pinned: 'left', 
      width : 60
    },

    { headerName: 'STCL', 
      field: 'ITEM_CD', 
      headerClass: ['header-row-merge2', 'cell-color-white', 'border-right-lightgray'], 
      cellClass: ['cell-span cell-align-left'], 
      pinned: 'left', 
      width : 120
    },
    { headerName: 'Size', 
      field: 'SIZE_CD', 
      headerClass: ['header-row-merge2', 'cell-color-white', 'border-right-lightgray'], 
      cellClass: ['string', 'cell-align-center','cell-span', 'border-right-black'], 
      pinned: 'left', 
      width : 80
    },
    {
      headerName: 'Admin',
      marryChildren: true,
      headerClass : ['border-left-black', 'border-right-lightgray'],
      children: [
        { headerName: '재고연계', 
          field: 'STOCK_LINK_YN', 
          headerClass : ['cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 100
        },
        { headerName: '현재고량', 
          field: 'VALID_STK_QTY', 
          headerClass : ['cell-bg-gray'], 
          cellClass: ['cell-span'], 
          width : 100
        },
        { headerName: '품절여부', 
          field: 'IS_SOLDOUT', 
          headerClass : ['cell-bg-gray'], 
          cellClass: ['cell-span color-red'], 
          width : 100
        },
        { headerName: '예약주문수량', 
          field: 'CNF_QTY', 
          headerClass : ['cell-bg-gray', 'border-right-black'], 
          cellClass: ['cell-span', 'border-right-black'], 
          width : 100
        },
      ],
    },
    {
      headerName: 'SAP 온라인 현 가용재고 (수량)',
      marryChildren: true,
      headerClass : ['border-left-black', 'border-right-lightgray'],
      children: [
        { headerName: '실재고품절', 
          field: 'SAP_SOLDOUT', 
          cellClass: ['cell-span color-red'], 
          headerClass : ['cell-bg-gray'], 
          width : 100
        },
        { headerName: 'Total', 
          field: 'TOT_INV_QTY', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          valueFormatter: formatNumber  , 
          width : 100
        },
        { headerName: '직송매장', 
          field: 'DD_INV_QTY', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          valueFormatter: formatNumber  , 
          width : 100
        },
        { headerName: '창고', 
          field: 'WH_INV_QTY', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          valueFormatter: formatNumber  , 
          width : 100
        },
        { headerName: '이동중', 
          field: 'MOV_QTY', 
          cellClass: ['cell-span', 'border-right-black'], 
          headerClass : ['cell-bg-gray', 'border-right-black'], 
          width : 100
        },
      ], 
    },    
    {
      headerName: '생산 미입고 현황',
      marryChildren: true,
      headerClass : ['border-left-black', 'border-right-lightgray'],
      children: [
        { headerName: 'PO#', 
          field: 'PO_NO', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          width : 100
        },
        { headerName: '발주일', 
          field: 'ZPODAT', 
          cellClass: ['cell-span'],    
          headerClass : ['cell-bg-gray'],           
          width : 100
        },
        { headerName: '발주수량', 
          field: 'PO_QTY', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          valueFormatter: formatNumber  , 
          width : 100
        },
        { headerName: '납품요청일', 
          field: 'EINDT', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          width : 100
        },
        { headerName: '입고일', 
          field: 'ZLEGRDAT', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          width : 100
        },
        { headerName: '입고수량', 
          field: 'GR_QTY', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray'], 
          valueFormatter: formatNumber  ,           
          width : 100
        },
        { headerName: '미입고 수량', 
          field: 'NGR_QTY', 
          cellClass: ['cell-span'], 
          headerClass : ['cell-bg-gray', 'border-right-lightgray'], 
          valueFormatter: formatNumber  ,           
          width : 100
        },
      ],
    },        
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true      
//    sortable: true,
//    filter: true,
    };
  }, []);

  //부모 컴포넌트에서 호출하는 자식의 함수들 정의 
  useImperativeHandle(ref, () => ({
    procFunc(action, params) {
      if (action === "search") {
        searchRowData();
      } 
      else if (action === "searchStcl") {
        searchStcl(params);
      }
      else if(action === "exportExcel") {
        exportGridData();
      }
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

    //console.log('newFilter :: ', newFilter);
    //console.log('props.filter :: ', props.filter);

    setBackDropOpen(true);

    await dispatch(getItems(newFilter));

    setBackDropOpen(false);    
  };


  const searchStcl = (newStcl) => {
    if (newStcl) {
      const newRows = mainState.items?.filter((item) => {
          let matches = true;

//          const properties = ['ITEM_CD', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
          const properties = ['ITEM_CD', 'SIZE_CD'];
          let containsQuery = false;

          properties.forEach((property) => {
              if (item[property].toString().toLowerCase().includes(newStcl.toString().toLowerCase())) {
                  containsQuery = true;
              }
          });

          if (!containsQuery) {
              matches = false;
          }
          return matches;
      });
      setRowData(newRows);
    } else {
      setRowData(mainState.items); 
    }
  };

  const exportGridData = () => {
    const params = {
      fileName: "LF MALL 품절 상품 List",
      columnGroups: true,
      skipGroups: false,
      sheetName: 'Sheet',
      exportMode: 'xlsx', // todo: since ag-grid 19.1.1
      processCellCallback: (p) => {// 엑셀 내보내기시 html을 제거하고▲ 음수를 -로 치환한다.
        if (p.value && typeof p.value === 'string') {
          return p.value.replace(/(<([^>]+)>)/ig, '').replace(/▲/ig, '-');
        } else {
          return p.value;
        }
      },
      processHeaderCallback: (p) => {
        if (p.column.colDef.headerName && typeof p.column.colDef.headerName === 'string') {
          return p.column.colDef.headerName.replace(/(<([^>]+)>)/ig, '');
        } else {
          return p.column.colDef.headerName;
        }
      }
    };
    gridRef.current.api.exportDataAsExcel(params);
  };


  useEffect(() => {
    setRowData(mainState.items); 
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
  }, [mainState]);

  useEffect(() => {
    return () => {
      console.log("unmount.......................... proc.................");
      dispatch(clearItems());
    }
  }, []);
    
  const pinnedTopRowData = useMemo(() => {
    const totalRow = [{
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

    //console.log('pinnedTopRowData totalRow : ' + totalRow);
    return totalRow;
  }, []);  


  const rowClassRules = {
    // apply green to 2008
    'total-row': function(params) { return params.node.rowPinned === 'top'; }
  };
  
  const getRowHeight = useCallback((params) => {
    return (params.node.rowPinned === 'top')? 32:64;
  }, []
  )
  ;

  /*
  const setColumnToFit = (event) => {
    event.api.sizeColumnsToFit();
  }
  */

  const gridTheme = "ag-theme-balham"; 
  //const gridTheme = "ag-theme-balham_user_1"; 

  

    
  

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={gridTheme} >
        <AgGridReact
          ref={gridRef}        
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          headerHeight={36}
          getRowHeight={getRowHeight}
          onGridReady={onGridReady}
          pinnedTopRowData={pinnedTopRowData}          
          rowClassRules={rowClassRules}
          rowBuffer={0}
          excelStyles={excelStyles}
//          onGridSizeChanged = {setColumnToFit}
        ></AgGridReact>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
});

export default MainGrid;