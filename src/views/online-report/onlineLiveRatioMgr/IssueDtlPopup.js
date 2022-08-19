import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import {
  Backdrop,
  CircularProgress, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Divider, 
  IconButton, 
  Typography
} from '@mui/material';


import CloseIcon from '@mui/icons-material/Close';


// ag grid 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
//import 'assets/scss/MainGrid.scss';


// project 
import { useDispatch, useSelector } from 'store';
import { getDtlItems, clearItems } from 'store/slices/onlineLiveRatio';
import { excelStyles } from 'store/constant';
import CustomHeader from 'ui-component/grid/CustomHeader';
//import './BrandHrcy.scss';


const IssueDtlPopup = forwardRef((props, ref) => {
 
  
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    return false; 
    //onClose();
  };


  
  
  const mainState = useSelector((state) => state.onlineLiveRatio);
  const dispatch = useDispatch();  
  
  const gridRef = useRef();

  //const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const containerStyle = useMemo(() => ({ width: '100%', height: 'calc(100vh - 270px)' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  
  const [rowData, setRowData] = useState();
  const [backDropOpen, setBackDropOpen] = useState(false);


  const onGridReady = (params) => {
//    console.log('onGridReady ');      
    setBackDropOpen(true);

    dispatch(getDtlItems(selectedValue));
  };

  const formatNumber = (params) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    
    return Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'STCL', 
      field: 'STCL', 
      headerClass : ['header-row-merge3', 'cell-bg-gray'], 
      cellClass: ['cell-span'], 
      width : 120
    },
    { headerName: 'SIZE', 
      field: 'ZSIZE', 
      headerClass : ['header-row-merge3', 'cell-bg-gray'], 
      cellClass: ['cell-span'], 
      width : 60
    },
    { headerName: 'STCL INFO',  
      headerClass : ['border-left-black', 'border-right-lightgray'],
      marryChildren: true,    
      children: [
        { headerName: '제품<br>년도', 
          headerComponent: CustomHeader, 
          field: 'PROD_YYYY', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '시즌', 
          field: 'SEASON_NAME', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '픔목', 
          field: 'NITEM_CODE', /**+"("+NITEM_NAME+")" */
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '판매율', 
          field: 'SL_RT', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },        
        { headerName: '매장<br>출시일', 
          headerComponent: CustomHeader, 
          field: 'LAUNCH_DAY', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '판기<br>시작일', 
          headerComponent: CustomHeader, 
          field: 'SALE_LAUNCH_DATE', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '판기<br>종료일', 
          headerComponent: CustomHeader, 
          field: 'SALE_END_DATE', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '온라인<br>전용', 
          headerComponent: CustomHeader, 
          field: 'ONTF_YN', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        }
      ],      
    },
    { headerName: 'Admin',  
      headerClass : ['border-left-black', 'border-right-lightgray'],
      marryChildren: true,    
      children: [
        { headerName: '상품<br>등록일', 
          headerComponent: CustomHeader, 
          field: 'ITEM_REG_DT', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '코드<br>승인일', 
          headerComponent: CustomHeader, 
          field: 'ITEM_APPR_DT', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '온라인<br>판매종료', 
          headerComponent: CustomHeader, 
          field: 'ITEM_SL_END_YN', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '현재고', 
          field: 'VALID_STK_QTY', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '재고<br>연계', 
          headerComponent: CustomHeader, 
          field: 'STOCK_LINK_YN', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        }, 
        { headerName: '품절<br>여부', 
          headerComponent: CustomHeader, 
          field: 'IS_SOLDOUT', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        }, 
        { headerName: '예약<br>주문<br>수량', 
          headerComponent: CustomHeader, 
          field: 'CNF_QTY', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        }                
      ],      
    },

    { headerName: 'SAP 온라인 가용재고',  
      headerClass : ['border-left-black', 'border-right-lightgray'],
      marryChildren: true,    
      children: [
        { headerName: 'Total', 
          field: 'ONL_STOCK_QTY', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '직송<br>매장<br>보유', 
          headerComponent: CustomHeader, 
          field: 'DD_STOCK_QTY', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '창고보유',  
          headerClass : ['cell-bg-gray', 'border-left-black'], 
          marryChildren: true,    
          children: [
            { headerName: '반품', 
              field: 'RET_WH_STOCK_QTY', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: '온라인<br>전용', 
              headerComponent: CustomHeader, 
              field: 'WH_STOCK_QTY', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: '일반<br>가용', 
              headerComponent: CustomHeader, 
              field: 'DC_STOCK_QTY', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            }            
          ]    
        },
        { headerName: '이동중',  
          headerClass : ['cell-bg-gray', 'border-left-black'], 
          marryChildren: true,    
          children: [
            { headerName: 'Total', 
              field: 'ONL_MV_QTY', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: '반품<br>창고', 
              headerComponent: CustomHeader, 
              field: 'WH_MV_QTY', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            },
            { headerName: '직송<br>매장', 
              headerComponent: CustomHeader, 
              field: 'DD_MV_QTY', 
              headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
              cellClass: ['cell-span'], 
              width : 60
            }            
          ]    
        }   
      ],      
    },

    { headerName: '비직송<br>매장<br>재고', 
      headerComponent: CustomHeader, 
      field: 'NDD_STOCK_QTY', 
      headerClass : ['header-row-merge3', 'cell-bg-gray'], 
      cellClass: ['cell-span'], 
      width : 60
    },

    { headerName: '기타', 
      field: 'ETC_NDD_QTY', 
      headerClass : ['header-row-merge3', 'cell-bg-gray'], 
      cellClass: ['cell-span'], 
      width : 60
    },

    { headerName: 'Alert',  
      headerClass : ['border-left-black', 'border-right-lightgray'],
      marryChildren: true,    
      children: [
        { headerName: 'Lastest<br>Alert<br>Date', 
          headerComponent: CustomHeader, 
          field: 'PLAN_ID', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: 'RT<br>지시일', 
          headerComponent: CustomHeader, 
          field: 'ZWKDAT', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '매장<br>수락일', 
          headerComponent: CustomHeader, 
          field: 'ZSTODT', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '입고일', 
          headerComponent: CustomHeader, 
          field: 'GR_DATE', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        }        
      ],      
    },    

    { headerName: 'ISSUE',  
      headerClass : ['border-left-black', 'border-right-lightgray'],
      marryChildren: true,    
      children: [
        { headerName: '유형', 
          headerComponent: CustomHeader, 
          field: 'ISSUE_GB', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        },
        { headerName: '작업<br>가이드', 
          headerComponent: CustomHeader, 
          field: 'ISSUE_PRC', 
          headerClass : ['header-row-merge3', 'cell-bg-gray', 'border-left-black'], 
          cellClass: ['cell-span'], 
          width : 60
        }        
      ],      
    } 
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true      
//    sortable: true,
//    filter: true,
    };
  }, []);


  useEffect(() => {
    //console.log('mainState : ', mainState); 
    setRowData(mainState.dtlItems); 
   
    /*
    if(mainState.dtlItems !== undefined && mainState.dtlItems !== null && mainState.dtlItems.length > 0){
      mainState.dtlItems.forEach((itme) => {
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
    */     
   
    setBackDropOpen(false);
  }, [mainState.dtlItems]);


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
  
  const gridTheme = "ag-theme-balham"; 
  

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'xl'} >
      <DialogTitle sx={{height:'40px',pt:0}}>
        <Typography variant="cardtitle1">온라인 라이브율 ISSUE STCL-SIZE</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>        
      </DialogTitle>
      <DialogContent dividers>
        <div style={containerStyle}>
          <div style={gridStyle} className={gridTheme} >
            <AgGridReact
              ref={gridRef}        
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}

              headerHeight={32}
    //          getRowHeight={getRowHeight}
              onGridReady={onGridReady}
              pinnedTopRowData={pinnedTopRowData}          
              rowClassRules={rowClassRules}
              rowBuffer={0}
              excelStyles={excelStyles}
    //          components={components}
            ></AgGridReact>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={backDropOpen}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>        
      </DialogContent>
    </Dialog>


  );
});

export default IssueDtlPopup;