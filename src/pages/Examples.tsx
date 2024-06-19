import { useState,useCallback, useMemo } from 'react'


import DropdownRenderer from '../components/dataTableGrid/dropdownRenderer'
import DraggableRowRenderer from '../components/dataTableGrid/draggableRowRenderer'
import DataGrid,{ textEditor } from 'react-data-grid';

import { DndProvider } from 'react-dnd'//needed for the movable rows
import { HTML5Backend } from 'react-dnd-html5-backend'//needed for the movable rows
import 'react-data-grid/lib/styles.css';
import type { Column, SortColumn, RenderRowProps  } from 'react-data-grid';

interface IRow { 
    id : number,
    title : string,
    option : string
}

function handleDataGripRowChange(row : IRow, value : any){
  console.log(row,value)
  // const findRow = rows.find(u=>u.id==row.id)
  // if(!findRow)
  //     return
  
  // findRow.option = value
}


const optionsTable = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
]

const columns : Column<IRow>[] = [
  { 
    key: 'id',
    name: 'id' ,
    resizable: true,
    sortable: true,
    draggable: true
  },
  { 
    key: 'title', 
    name: 'Title', 
    renderEditCell: textEditor ,
    resizable: true,
    sortable: true,
    draggable: true
  },
  {
    key : 'option',
    name : 'Options',
    renderEditCell: (props : any) => (
      <DropdownRenderer<IRow>
        {...props}
        options={optionsTable}
        isMulti={true} // Set to true for multi-select, false for single-select
        onChange={handleDataGripRowChange}
      />
    ),
    resizable: true,
    sortable: true,
    draggable: true

  }

]


function Examples() {
  // const [count, setCount] = useState(0)
  
  const [rows, setRows] = useState([
    { id: 10, title: 'Example', option : 'Option 1' },
    { id: 11, title: 'Demo', option : 'Option 2' },
    { id: 12, title: 'Example', option : 'Option 1' },
    { id: 13, title: 'Example', option : 'Option 1' },
    { id: 14, title: 'Example', option : 'Option 1' },
    { id: 15, title: 'Example', option : 'Option 1' },
    { id: 16, title: 'Example', option : 'Option 1' },
  ]);

  //#region Start Column Reorder

  const [columnsOrder, setColumnsOrder] = useState(():  number[] =>
    columns.map((_, index) => index)
  );
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);
  const reorderedColumns = useMemo(() => {
    return columnsOrder.map((index) => columns[index]);
  }, [columnsOrder]);

  const sortedRows = useMemo((): readonly IRow[] => {
    if (sortColumns.length === 0) return rows;
    const { direction } = sortColumns[0];

    let sortedRows: IRow[] = [...rows];
    return direction === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [rows, sortColumns]);

  function onColumnsReorder(sourceKey: string, targetKey: string) {
    setColumnsOrder((columnsOrder) => {
      const sourceColumnOrderIndex = columnsOrder.findIndex(
        (index) => columns[index].key === sourceKey
      )
      const targetColumnOrderIndex = columnsOrder.findIndex(
        (index) => columns[index].key === targetKey
      )
      
      const sourceColumnOrder = columnsOrder[sourceColumnOrderIndex];
      const newColumnsOrder = columnsOrder.toSpliced(sourceColumnOrderIndex, 1);
      newColumnsOrder.splice(targetColumnOrderIndex, 0, sourceColumnOrder);

      return newColumnsOrder;
    })
  }
  //#endregion end Column Reorder

  //#region row reorder
  const renderRow = useCallback((key: React.Key, props: RenderRowProps<IRow>) => {
    function onRowReorder(fromIndex: number, toIndex: number) {
      setRows((rows) => {
        const newRows = [...rows];
        newRows.splice(toIndex, 0, newRows.splice(fromIndex, 1)[0]);
        return newRows;
      });
    }

    return <DraggableRowRenderer key={key} {...props} onRowReorder={onRowReorder} />;
  }, []);
  //#endregion row reorder


  return (
    <>  
       
    <div className='mt-2'>
      <DndProvider backend={HTML5Backend}>
        <DataGrid 
        columns={reorderedColumns} 
        rows={sortedRows}
        onRowsChange={setRows}
        onColumnsReorder={onColumnsReorder}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
        renderers={{ renderRow }}
         />
      </DndProvider>
      </div>
    </>
  )
}

export default Examples
