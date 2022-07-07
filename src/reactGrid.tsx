import React, { useEffect, useState } from 'react'
import DataGrid, { EditorProps, TextEditor } from 'react-data-grid'
import SelectEditor from './selectEditor'

interface Row {
  id: number;
  title: string;
  // editor?: typeof TextEditor;
}

const states = [
  { label: 'Indiana', value: 'IN' },
  { label: 'Illinois', value: 'IL'},
]

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title', editor: TextEditor },
  {
    key: 'state',
    name: 'State',
    editor: (p: EditorProps<Row>) => (<SelectEditor {...p} options={states} />),
    editorOptions: {
      editOnClick: true,
    }
  }
];

const initialRows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

const rowKeyGetter = (row: Row): number => {
  return row.id
}

export const ReactGrid = () => {
  const [rows, setRows] = useState(initialRows)

  useEffect(() => {
    console.log(rows)
  }, [rows])

  return (
    <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
  )
}
