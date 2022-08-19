// theme constant
export const gridSpacing = 1.5;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
export const excelStyles = [
    {
        id: 'header',
        interior: {
          color: '#203c4a',
          pattern: 'Solid'
        },
        font: {
          color: '#ffffff',
          size: 12,
          fontName: 'Malgun Gothic'
        },
        alignment : {
          horizontal: 'Center'
        },
        borders: {
          borderBottom: {
            color: '#365463',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderLeft: {
            color: '#365463',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderRight: {
            color: '#365463',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderTop: {
            color: '#365463',
            lineStyle: 'Continuous',
            weight: 1
          }
        }
      },
      {
        id: 'greenBackground',
        interior: {
          color: '#b5e6b5',
          pattern: 'Solid'
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'excelRedFont',
        font: {
          color: '#ff0000',
          fontName: 'Malgun Gothic',
          size: 12
        }
      },
      {
        id: 'excelBorderRight',
        borders: {
          borderRight: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          }
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'border-right-black',
        borders: {
          borderRight: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          }
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'border-left-black',
        borders: {
          borderLeft: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          }
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'cell-bg-lightpink',
        interior: {
          color: '#fff0ef',
          pattern: 'Solid'
        },
        borders: {
          borderBottom: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          // borderLeft: {
          //   color: '#D4D4D4',
          //   lineStyle: 'Continuous',
          //   weight: 1
          // },
          borderRight: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderTop: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          }
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'cell-bg-lightpink2',
        interior: {
          color: '#fff0ef',
          pattern: 'Solid'
        },
        borders: {
          borderBottom: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderLeft: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderRight: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderTop: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          }
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'cell-bg-yellow',
        interior: {
          color: '#ffffd3',
          pattern: 'Solid'
        },
        borders: {
          borderBottom: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderLeft: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderRight: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderTop: {
            color: '#D4D4D4',
            lineStyle: 'Continuous',
            weight: 1
          }
        },
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'excelBasic',
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        },
      },
      {
        id: 'bold',
        font: {
          bold: true,
          size: 12,
          fontName: 'Malgun Gothic'
        },
      },
      {
        id: 'dateFormat',
        // dataType: 'dateTime', 엑셀 내보내기시 파일 오류경고창이 나타남
        numberFormat: {format: '####-##-##;'}, // yy/mm/dd ( '.' , '/' 구분자)형식지정안됨. 앞4자리로 구분만 됨
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'twoDecimal',
        numberFormat: {format: '#,##0.00'},
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'oneDecimal',
        numberFormat: {format: '#,##0.0'},
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'oneDecimalP',
        numberFormat: {format: '#,##0.0%'},
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'integer',
        numberFormat: {format: '#,###'},
        font: {
          size: 12,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'string',
        dataType: 'string',
        font: {
          size: 11,
          fontName: 'Malgun Gothic'
        }
      },
      {
        id: 'cell-align-center',
        alignment : {
          horizontal: 'Center'
        },
      },
      {
        id: 'cell-align-right',
        alignment : {
          horizontal: 'Right'
        },
      },
      {
        id: 'excelIndent1',
        alignment : {indent: 0}
      },
      {
        id: 'excelIndent2',
        alignment : {indent: 1}
      },
      {
        id: 'excelIndent3',
        alignment : {indent: 2}
      },
      {
        id: 'excelIndent4',
        alignment : {indent: 3}
      },
      {
        id: 'excelIndent5',
        alignment : {indent: 4}
      },
      {
        id: 'excelIndent6',
        alignment : {indent: 5}
      },
      {
        id: 'excelIndent7',
        alignment : {indent: 6}
      },
      {
        id: 'excelIndent8',
        alignment : {indent: 7}
      },
      {
        id: 'excelIndent9',
        alignment : {indent: 8}
      },
      {
        id: 'excelIndent10',
        alignment : {indent: 9}
      },
      {
        id: 'excelIndent11',
        alignment : {indent: 10}
      }
];

