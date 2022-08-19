import React, { useContext, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
//import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Typography
} from '@mui/material';

import './BrandHrcy.scss';

import {FilterContext} from 'contexts/FilterContext';


const BrandHrcy = ({ __HRCY_SBRAND, handleFilter }) => {
  
  const gridRef = useRef();

//  console.log("FilterContext : ", FilterContext);
//  console.log("useContext(FilterContext) : ", useContext(FilterContext));
  const {orgOptions} =   useContext(FilterContext);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  
  //const rowStyle = { 'selected-row-background-color' : 'black' };


  //const [rowData, setRowData] = useState([getData()]);

  //console.log("org", org);
  const [rowData, setRowData] = useState();

  

  /*
  const onGridReady = useCallback((params) => {
    setRowData(orgOptions);
    gridRef.current.api.forEachNode(function (node) {
      // console.log(node.data);
       
       if(node.data!==undefined) {
         node.setSelected(org.some((item) => item === node.data.BRAND_CODE));
       } 
     });    
  }, []);
  */

  const onGridReady = (params) => {
    //console.log('onGridReady : ' , org);      
    setRowData(orgOptions);
    
    var selNode;

    //console.log('__HRCY_SBRAND : ' , __HRCY_SBRAND);

    gridRef.current.api.forEachNode(function (node) {

        //console.log('node.data : ' , node.data);
        if(node.data!==undefined && __HRCY_SBRAND.VAL!==undefined) {
          if(__HRCY_SBRAND.VAL.some((item) => item === node.data.BRAND_CODE)){
            node.setSelected(true, false, true);
            selNode = node;
          }
       } 
    }); 

    // group node 선택여부  표시를 위해 해제후 재설정 . group node는 onSelectionChanged 이벤트 후에 표시됨 
    if(selNode!==undefined && selNode !==null){
      //console.log(selNode);
      selNode.setSelected(false);
      selNode.setSelected(true);
    }
    
  };

  const onSelectionChanged = (event) => {
    const selOrg = event.api.getSelectedNodes().map((item)=>{return item.data.BRAND_CODE});
    //console.log(selOrg);
    handleFilter(__HRCY_SBRAND.KEY, selOrg); 
  };

  /*
  useEffect(() => {
    return () => {
      console.log("selRow: " , selRow);
      handleFilter('org', selRow); 
    }
  }, []);
  */





  const [columnDefs, setColumnDefs] = useState([
    // this column shows just the country group values, but has not group renderer, so there is no expand / collapse functionality
    // add in a cell renderer params
    {
      headerName: '조직',
      headerCheckboxSelection: true, 

      field: 'BRAND_NAME',
      minWidth: 0,
      showRowGroup: true,

      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        suppressCount: true,
        checkbox: true,
        innerRenderer: (params)=> {
          return (
            <span style={{
                  //backgroundColor: props.node.group ? 'coral' : 'lightgreen',
                  padding: 0
              }}
            >
              <Typography color="text.dark" variant="button">{params.value}</Typography>
              {/**
              {params.node.level===0 && <Typography color="text.dark" variant="button">{params.value}</Typography>}
              {params.node.level===1 && <Typography color="text.dark" variant="subtitle">&nbsp;&nbsp;&nbsp;&nbsp;{params.value}</Typography>}
              {params.node.level===2 && <Typography color="text.dark" variant="subtitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{params.value}</Typography>}
              {params.node.level===3 && <Typography color="text.dark" variant="subtitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{params.value}</Typography>}
               */}
            </span>            
          )
        },
        suppressDoubleClickExpand: true,
        suppressEnterExpand: true,
        //suppressPadding:true
      },
    },
    { headerName: 'ORG2_NAME', field: 'ORG2_NAME', rowGroup: true, hide:true },
    { headerName: 'DBRAND_NAME', field: 'DBRAND_NAME', rowGroup: true, hide:true },
    { headerName: 'BRAND_CODE', field: 'BRAND_CODE', hide:true },
    { headerName: 'BRAND_NAME', field: 'BRAND_NAME', hide:true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      resizable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}        
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
//          rowStyle={rowStyle}

          groupHeaderHeight={36}
          headerHeight={36}

          groupDisplayType={'custom'}
          suppressRowClickSelection={true}
          groupDefaultExpanded={1}
          rowSelection={'multiple'}
          groupSelectsChildren={true}
//          animateRows={true}
          rowHeight={32}

          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}

        ></AgGridReact>
      </div>
    </div>
  );
};

export default BrandHrcy;