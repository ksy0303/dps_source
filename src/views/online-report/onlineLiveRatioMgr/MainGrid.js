import React, { forwardRef, useImperativeHandle, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import {
  Backdrop,
  CircularProgress, 
  Typography
} from '@mui/material';

// ag grid 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
//import 'assets/scss/MainGrid.scss';


// project 
import { useDispatch, useSelector } from 'store';
import { getItems, clearItems } from 'store/slices/onlineLiveRatio';
import { excelStyles } from 'store/constant';
import CustomHeader from 'ui-component/grid/CustomHeader';
import IssueDtlPopup from './IssueDtlPopup';

//import './BrandHrcy.scss';

const MainGrid = forwardRef((props, ref) => {
  
  const mainState = useSelector((state) => state.onlineLiveRatio);
  const dispatch = useDispatch();  
  
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  
  const [rowData, setRowData] = useState();
  const [popupFilter, setPopupFilter] = useState({PARAM_ORG2_CODE:'', PARAM_DBRAND_CODE:'', PARAM_PROD_YYYY:'', PARAM_SEASON:'', SEARCH_TYPE:''}); 
  const [backDropOpen, setBackDropOpen] = useState(false);

  // popup open 
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };



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
    { headerName: 'Total', 
      marryChildren: true,    
      headerClass : ['border-left-black', 'border-right-lightgray'],
      children: [
        { headerName: '전사 관리대상', 
          marryChildren: true,            
          headerClass : ['border-left-black', 'cell-bg-gray', 'border-right-lightgray'],
          children: [
            { headerName: 'STCL<br>수', 
              headerComponent: CustomHeader, 
              field: 'TOT_STCL_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: 'SIZE<br>수', 
              headerComponent: CustomHeader,             
              field: 'TOT_SIZE_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-right-lightgray'], 
              cellClass: ['cell-span'], 
              width : 60
            }
          ]          
        },
        { headerName: '온라인 가용재고', 
          marryChildren: true,            
          headerClass : ['cell-bg-gray', 'border-right-lightgray'],
          children: [
            { headerName: 'STCL<br>수', 
              headerComponent: CustomHeader,       
              field: 'ONL_STCL_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: 'SIZE<br>수', 
              headerComponent: CustomHeader,                   
              field: 'ONL_SIZE_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-right-lightgray'], 
              cellClass: ['cell-span'], 
              width : 60
            }
          ]          
        },
        { headerName: 'LF MALL LIVE 율', 
          marryChildren: true,            
          headerClass : ['cell-bg-gray', 'border-right-lightgray'],
          children: [
            { headerName: 'STCL', 
              field: 'LV_STCL_RT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: 'SIZE', 
              field: 'LV_SIZE_RT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-right-lightgray'], 
              cellClass: ['cell-span'], 
              width : 60
            }
          ]          
        },      
      
        { headerName: 'LIVE율 이슈 STCL-SIZE 수', 
          marryChildren: true,            
          headerClass : ['cell-bg-gray', 'border-right-lightgray'],
          children: [
            { headerName: 'Total', 
              field: 'TOT_ISSU_SIZE_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: '상품<br>미등록', 
              headerComponent: CustomHeader,                               
              field: 'NREG_SIZE_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray'], 
              cellClass: ['cell-span'], 
              width : 60
            },

            { headerName: '미좔영(eVc)', 
              marryChildren: true,                
              headerClass : ['cell-bg-gray'], 
              children: [
                { headerName: 'Total', 
                  field: 'NAPR_NP_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },

                { headerName: '촬영 스튜디오', 
                  marryChildren: true,                
                  headerClass : ['cell-bg-gray'], 
                  children: [
                    { headerName: '입고<br>완료', 
                      headerComponent: CustomHeader,                                                   
                      field: 'NAPR_NP1_SIZE_CNT', 
                      headerClass : ['cell-bg-gray'], 
                      cellClass: ['cell-span'], 
                      width : 60
                    },
                    { headerName: '이동중', 
                      field: 'NAPR_NP2_SIZE_CNT', 
                      headerClass : ['cell-bg-gray'], 
                      cellClass: ['cell-span'], 
                      width : 60
                    },  
                    { headerName: '미출고', 
                      field: 'NAPR_NP3_SIZE_CNT', 
                      headerClass : ['cell-bg-gray'], 
                      cellClass: ['cell-span'], 
                      width : 60
                    }                    
                  ]                 
                }      
              ]                 
            },            

            { headerName: 'Admin 이슈 (e영업 MD)', 
              marryChildren: true,                
              headerClass : ['cell-bg-gray'], 
              children: [
                { headerName: 'Total', 
                  field: 'MD_ISSU_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },
                { headerName: '정보<br>오류', 
                  headerComponent: CustomHeader,                                                                   
                  field: 'NAPR_IE_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },
                { headerName: '승인<br>대기', 
                  headerComponent: CustomHeader,       
                  field: 'NAPR_MD_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },
                { headerName: '일시<br>품절', 
                  headerComponent: CustomHeader,       
                  field: 'NAPR_SO_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },
                { headerName: '판매<br>종료', 
                  headerComponent: CustomHeader,       
                  field: 'ONSE_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                }
              ]                 
            },
            
            { headerName: '미출고<br>상품', 
              headerComponent: CustomHeader,       
              field: 'NGRO_SIZE_CNT', 
              headerClass : ['header-row-merge3', 'cell-bg-gray'], 
              cellClass: ['cell-span'], 
              width : 60
            },            
            
            { headerName: '재고부족', 
              marryChildren: true,                
              headerClass : ['cell-bg-gray', 'border-right-lightgray'], 
              children: [
                { headerName: 'Total', 
                  field: 'STK_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },
                { headerName: '반품<br>창고<br>보유', 
                  headerComponent: CustomHeader,       
                  field: 'RET_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                },                

                { headerName: '오프매장보유', 
                  marryChildren: true,                
                  headerClass : ['cell-bg-gray'], 
                  children: [
                    { headerName: 'Total', 
                      field: 'SLD_O_SIZE_CNT', 
                      headerClass : ['cell-bg-gray'], 
                      cellClass: ['cell-span'], 
                      width : 60
                    },
                    { headerName: '5미만', 
                      field: 'SLD_O_5_U_SIZE_CNT', 
                      headerClass : ['cell-bg-gray'], 
                      cellClass: ['cell-span'], 
                      width : 60
                    },  
                    { headerName: '5이상', 
                      field: 'SLD_O_5_O_SIZE_CNT', 
                      headerClass : ['cell-bg-gray'], 
                      cellClass: ['cell-span'], 
                      width : 60
                    }                    
                  ]                 
                },     
                { headerName: '기타<br>재고<br>보유', 
                  headerComponent: CustomHeader,       
                  field: 'SLD_ETC_SIZE_CNT', 
                  headerClass : ['header-row-merge2', 'cell-bg-gray', 'border-right-lightgray'], 
                  cellClass: ['cell-span'], 
                  width : 60
                }                    
              ]                 
            },   
          ]          
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



  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: '구분',
      minWidth: 200,
      cellRendererParams: {
        suppressCount: true,
      },
      cellClass: ['ag-cell']
      /*
      cellClass: (params) => {
        const cellClasses = ['excelBasic', 'border-right-black', 'custom-row-group'];
        if (params.node.level === params.data.MAX_LVL) {
          cellClasses.push('hide-tree-icon');
        }
        cellClasses.push(`excelIndent${params.data.LVL}`);
        return cellClasses;
      } 
      */     
    };
  }, []);

  const getDataPath = useCallback((data) => {
    //console.log('data : ' , data);
    return data.H_TITLE_NAME.split(",");
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
      //console.log(action);
    }
  })); 

  // 정보 조회하기 
  const searchRowData = () => {
    //alert('searchRowData');
    //console.log(props.filter);
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
//              let newVal = item.VAL.getFullYear()  + '' + curMonth + '01' ;              
              let newVal = item.VAL.getFullYear()  + '' + curMonth;              
              //console.log('cal_month : ', newVal);
              newFilter[item.KEY] = newVal;
           }  
           else {
              newFilter[item.KEY] = item.VAL;
            }
        }
    });


    //console.log("newFilter :: " ,  newFilter); 

    setBackDropOpen(true);

    dispatch(getItems(newFilter));
  };


  const searchStcl = (newStcl) => {
    if (newStcl) {
      const newRows = mainState.items?.filter((item) => {
          let matches = true;

//          const properties = ['ITEM_CD', 'description', 'rating', 'salePrice', 'offerPrice', 'gender'];
          const properties = ['ITEM_CD'];
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
    //console.log('mainState : ', mainState); 
    setRowData(mainState.items); 
   
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

      if(gridRef.current.api !== undefined && gridRef.current.api !== null){
        gridRef.current.api.setPinnedTopRowData(totalRow);      
      }      
      
    }
     
    setBackDropOpen(false);
  }, [mainState.items]);


  useEffect(() => {
    return () => {
      dispatch(clearItems());
   
    }
  }, []);


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



  const pinnedTopRowData = useMemo(() => {
    //console.log('pinnedTopRowData totalRow : ' + totalRow);
    return totalRow;
  }, []);  



  const rowClassRules = {
    // apply green to 2008
    'total-row': function(params) { return params.node.rowPinned === 'top'; }
  };
  
  const getRowHeight = (params) => {
    return (params.node.rowPinned === 'top')? 32:64;
  }
  ;
  
  
  const onCellClicked = (params) => {
    console.log(params.colDef.field);

    console.log(params.data);

    let vStype = ''; 
    let popupYn = false; 

    if(params.colDef.field==='ONL_SIZE_CNT'){			// TOTAL 온라인 가용 재고 SIZE 수 
      vStype = "ONSA";
      popupYn = true;
    } 
    
    else if(params.colDef.field==='TOT_ISSU_SIZE_CNT') {		// TOTAL ISSUE TOTAL 
      vStype = "TIST";
      popupYn = true;
    } 
          
    else if(params.colDef.field==='NREG_SIZE_CNT') {	// TOTLA ISSUE 상품 미등록 
      vStype = "TISA";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NAPR_NP_SIZE_CNT') {	// TOTLA ISSUE 미촬영 TOTAL
      vStype = "TISB";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NAPR_NP1_SIZE_CNT') {	// TOTLA ISSUE 미촬영 입고완료 
      vStype = "TISB1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NAPR_NP2_SIZE_CNT') {	// TOTLA ISSUE 미촬영 이동중
      vStype = "TISB2";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NAPR_NP3_SIZE_CNT') {	// TOTLA ISSUE 미좔영 미출고
      vStype = "TISB3";
      popupYn = true;
    }
      
    else if(params.colDef.field==='MD_ISSU_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 TOTAL 
      vStype = "TISC";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NAPR_IE_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 정보오류 
      vStype = "TISC1";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NAPR_MD_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 승인대기 
      vStype = "TISC2";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NAPR_SO_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 일시품절 
      vStype = "TISC3";
      popupYn = true;
    }
          
    else if(params.colDef.field==='ONSE_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 판매종료 
      vStype = "TISC4";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NGRO_SIZE_CNT') {	// TOTLA ISSUE 미출고 상품 
      vStype = "TISD";
      popupYn = true;
    }	
    
    
    else if(params.colDef.field==='STK_SIZE_CNT') {	// TOTLA ISSUE 재고부족 TOTAL 
      vStype = "TISE";
      popupYn = true;
    }	
    
    else if(params.colDef.field==='RET_SIZE_CNT') {	// TOTLA ISSUE 반품창고보유 
      vStype = "TISE1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='SLD_O_SIZE_CNT') {	// TOTLA ISSUE 오프매장보유
      vStype = "TISE2";
      popupYn = true;
    }
    else if(params.colDef.field==='SLD_O_5_U_SIZE_CNT') {	// TOTLA ISSUE 오프매장보유 (5미만)
      vStype = "TISE2_1";
      popupYn = true;
    }
    else if(params.colDef.field==='SLD_O_5_O_SIZE_CNT') {	// TOTLA ISSUE 오프매장보유 (5이상)
      vStype = "TISE2_2";
      popupYn = true;
    }
        
    else if(params.colDef.field==='SLD_ETC_SIZE_CNT') {	// TOTLA ISSUE 기타재고보유 
      vStype = "TISE3";
      popupYn = true;
    }	
    

    if(params.colDef.field==='ONL_SIZE_CNT'){			// TOTAL 온라인 가용 재고 SIZE 수 
      vStype = "ONSA";
      popupYn = true;
    } 
    
    else if(params.colDef.field==='TOT_ISSU_SIZE_CNT') {		// TOTAL ISSUE TOTAL 
      vStype = "TIST";
      popupYn = true;
    } 
          
    else if(params.colDef.field==='NREG_SIZE_CNT') {	// TOTLA ISSUE 상품 미등록 
      vStype = "TISA";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NAPR_NP_SIZE_CNT') {	// TOTLA ISSUE 미촬영 TOTAL
      vStype = "TISB";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NAPR_NP1_SIZE_CNT') {	// TOTLA ISSUE 미촬영 입고완료 
      vStype = "TISB1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NAPR_NP2_SIZE_CNT') {	// TOTLA ISSUE 미촬영 이동중
      vStype = "TISB2";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NAPR_NP3_SIZE_CNT') {	// TOTLA ISSUE 미좔영 미출고
      vStype = "TISB3";
      popupYn = true;
    }
      
    else if(params.colDef.field==='MD_ISSU_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 TOTAL 
      vStype = "TISC";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NAPR_IE_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 정보오류 
      vStype = "TISC1";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NAPR_MD_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 승인대기 
      vStype = "TISC2";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NAPR_SO_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 일시품절 
      vStype = "TISC3";
      popupYn = true;
    }
          
    else if(params.colDef.field==='ONSE_SIZE_CNT') {	// TOTLA ISSUE ADMIN 이슈 판매종료 
      vStype = "TISC4";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NGRO_SIZE_CNT') {	// TOTLA ISSUE 미출고 상품 
      vStype = "TISD";
      popupYn = true;
    }	
    
    
    else if(params.colDef.field==='STK_SIZE_CNT') {	// TOTLA ISSUE 재고부족 TOTAL 
      vStype = "TISE";
      popupYn = true;
    }	
    
    else if(params.colDef.field==='RET_SIZE_CNT') {	// TOTLA ISSUE 반품창고보유 
      vStype = "TISE1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='SLD_O_SIZE_CNT') {	// TOTLA ISSUE 오프매장보유
      vStype = "TISE2";
      popupYn = true;
    }
    else if(params.colDef.field==='SLD_O_5_U_SIZE_CNT') {	// TOTLA ISSUE 오프매장보유 (5미만)
      vStype = "TISE2_1";
      popupYn = true;
    }
    else if(params.colDef.field==='SLD_O_5_O_SIZE_CNT') {	// TOTLA ISSUE 오프매장보유 (5이상)
      vStype = "TISE2_2";
      popupYn = true;
    }
        
    else if(params.colDef.field==='SLD_ETC_SIZE_CNT') {	// TOTLA ISSUE 기타재고보유 
      vStype = "TISE3";
      popupYn = true;
    }	
    
    
    else if(params.colDef.field==='NRML_ONL_SIZE_CNT') {			// 정상 온라인 가용 재고 SIZE 수 
      vStype = "ONSAN";
      popupYn = true;
    } 
      
    else if(params.colDef.field==='NRML_TOT_ISSU_SIZE_CNT') {	//  정상 ISSUE TOTAL 
      vStype = "NIST";
      popupYn = true;
    } 
          
    else if(params.colDef.field==='NRML_NREG_SIZE_CNT') {	//  정상 ISSUE 상품 미등록 
      vStype = "NISA";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NRML_NAPR_NP_SIZE_CNT') {	//  정상 ISSUE 미촬영 TOTAL
      vStype = "NISB";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NRML_NAPR_NP1_SIZE_CNT') {	//  정상 ISSUE 미촬영 입고완료 
      vStype = "NISB1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NRML_NAPR_NP2_SIZE_CNT') {	//  정상 ISSUE 미촬영 이동중
      vStype = "NISB2";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NRML_NAPR_NP3_SIZE_CNT') {	//  정상 ISSUE 미좔영 미출고
      vStype = "NISB3";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NRML_MD_ISSU_SIZE_CNT') {	//  정상 ISSUE ADMIN 이슈 TOTAL 
      vStype = "NISC";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NRML_NAPR_IE_SIZE_CNT') {	//  정상 ISSUE ADMIN 이슈 정보오류 
      vStype = "NISC1";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NRML_NAPR_MD_SIZE_CNT') {	//  정상 ISSUE ADMIN 이슈 승인대기 
      vStype = "NISC2";
      popupYn = true;
    }
  
    else if(params.colDef.field==='NRML_NAPR_SO_SIZE_CNT') {	//  정상 ISSUE ADMIN 이슈 일시품절 
      vStype = "NISC3";
      popupYn = true;
    }
          
    else if(params.colDef.field==='NRML_ONSE_SIZE_CNT') {	//  정상 ISSUE ADMIN 이슈 판매종료 
      vStype = "NISC4";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NRML_NGRO_SIZE_CNT') {	//  정상 ISSUE 미출고 상품 
      vStype = "NISD";
      popupYn = true;
    }	
    
    
    else if(params.colDef.field==='NRML_STK_SIZE_CNT') {	//  정상 ISSUE 재고부족 TOTAL 
      vStype = "NISE";
      popupYn = true;
    }	
    
    else if(params.colDef.field==='NRML_RET_SIZE_CNT') {	//  정상 ISSUE 반품창고보유 
      vStype = "NISE1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='NRML_SLD_O_SIZE_CNT') {	//  정상 ISSUE 오프매장보유
      vStype = "NISE2";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NRML_SLD_O_5_U_SIZE_CNT') {	//  정상 ISSUE 오프매장보유 (5미만)
      vStype = "NISE2_1";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NRML_SLD_O_5_O_SIZE_CNT') {	//  정상 ISSUE 오프매장보유 (5이상)
      vStype = "NISE2_2";
      popupYn = true;
    }
    
    else if(params.colDef.field==='NRML_SLD_ETC_SIZE_CNT') {	//  정상 ISSUE 기타재고보유 
      vStype = "NISE3";
      popupYn = true;
    }	
    
    
    else if(params.colDef.field==='OVER_ONL_SIZE_CNT') {			// 이월  온라인 가용 재고 SIZE 수 
      vStype = "ONSAO";
      popupYn = true;
    } 	
    
    else if(params.colDef.field==='OVER_TOT_ISSU_SIZE_CNT') {	//  이월 ISSUE TOTAL 
      vStype = "OIST";
      popupYn = true;
    } 
          
    else if(params.colDef.field==='OVER_NREG_SIZE_CNT') {	//  이월 ISSUE 상품 미등록 
      vStype = "OISA";
      popupYn = true;
    }
  
    else if(params.colDef.field==='OVER_NAPR_NP_SIZE_CNT') {	//  이월 ISSUE 미촬영 TOTAL
      vStype = "OISB";
      popupYn = true;
    }
      
    else if(params.colDef.field==='OVER_NAPR_NP1_SIZE_CNT') {	//  이월 ISSUE 미촬영 입고완료 
      vStype = "OISB1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='OVER_NAPR_NP2_SIZE_CNT') {	//  이월 ISSUE 미촬영 이동중
      vStype = "OISB2";
      popupYn = true;
    }
      
    else if(params.colDef.field==='OVER_NAPR_NP3_SIZE_CNT') {	//  이월 ISSUE 미좔영 미출고
      vStype = "OISB3";
      popupYn = true;
    }
      
    else if(params.colDef.field==='OVER_MD_ISSU_SIZE_CNT') {	//  이월 ISSUE ADMIN 이슈 TOTAL 
      vStype = "OISC";
      popupYn = true;
    }
    
    else if(params.colDef.field==='OVER_NAPR_IE_SIZE_CNT') {	//  이월 ISSUE ADMIN 이슈 정보오류 
      vStype = "OISC1";
      popupYn = true;
    }
  
    else if(params.colDef.field==='OVER_NAPR_MD_SIZE_CNT') {	//  이월 ISSUE ADMIN 이슈 승인대기 
      vStype = "OISC2";
      popupYn = true;
    }
  
    else if(params.colDef.field==='OVER_NAPR_SO_SIZE_CNT') {	//  이월 ISSUE ADMIN 이슈 일시품절 
      vStype = "OISC3";
      popupYn = true;
    }
          
    else if(params.colDef.field==='OVER_ONSE_SIZE_CNT') {	//  이월 ISSUE ADMIN 이슈 판매종료 
      vStype = "OISC4";
      popupYn = true;
    }
    
    else if(params.colDef.field==='OVER_NGRO_SIZE_CNT') {	//  이월 ISSUE 미출고 상품 
      vStype = "OISD";
      popupYn = true;
    }	
    
    
    else if(params.colDef.field==='OVER_STK_SIZE_CNT') {	//  이월 ISSUE 재고부족 TOTAL 
      vStype = "OISE";
      popupYn = true;
    }	
    
    else if(params.colDef.field==='OVER_RET_SIZE_CNT') {	//  이월 ISSUE 반품창고보유 
      vStype = "OISE1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='OVER_SLD_O_SIZE_CNT') {	//  이월 ISSUE 오프매장보유
      vStype = "OISE2";
      popupYn = true;
    }
    
    else if(params.colDef.field==='OVER_SLD_O_5_U_SIZE_CNT') {	//  이월 ISSUE 오프매장보유 (5미만)
      vStype = "OISE2_1";
      popupYn = true;
    }
      
    else if(params.colDef.field==='OVER_SLD_O_5_O_SIZE_CNT') {	//  이월 ISSUE 오프매장보유 (5이상)
      vStype = "OISE2_2";
      popupYn = true;
    }
  
    else if(params.colDef.field==='OVER_SLD_ETC_SIZE_CNT') {	//  이월 ISSUE 기타재고보유  
      vStype = "OISE3";
      popupYn = true;
    }


    let popupFilterIns = {
        PARAM_ORG2_CODE: params.data.ORG2_CODE, 
        PARAM_DBRAND_CODE: params.data.ZOUT_DBRAND_CODE, 
        PARAM_PROD_YYYY: params.data.PROD_YYYY, 
        PARAM_SEASON: params.data.SEASON_CODE, 
        SEARCH_TYPE: vStype
      };

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
//              let newVal = item.VAL.getFullYear()  + '' + curMonth + '01' ;              
              let newVal = item.VAL.getFullYear()  + '' + curMonth;              
              //console.log('cal_month : ', newVal);
              newFilter[item.KEY] = newVal;
            }  
            else {
              newFilter[item.KEY] = item.VAL;
            }
        }
    });

    popupFilterIns = {...popupFilterIns, ...newFilter};

    
      
    setPopupFilter(popupFilterIns);

    if(popupYn) {
      setOpen(true);
    }

    console.log('popupFilterIns : ', popupFilterIns);

  };


  const gridTheme = "ag-theme-balham"; 
  

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={gridTheme} >
        <AgGridReact
          ref={gridRef}        
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}

          autoGroupColumnDef={autoGroupColumnDef}
          treeData={true}
          groupDefaultExpanded={1}
          getDataPath={getDataPath}          
          
          headerHeight={32}
//          getRowHeight={getRowHeight}
          onGridReady={onGridReady}
          pinnedTopRowData={pinnedTopRowData}          
          rowClassRules={rowClassRules}
          rowBuffer={0}
          excelStyles={excelStyles}

          onCellClicked={onCellClicked}

//          components={components}
        ></AgGridReact>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <IssueDtlPopup
          selectedValue={popupFilter}
          open={open}
          onClose={handleClose}
        />        
      </div>
    </div>
  );
});

export default MainGrid;