import React from 'react'
import DataGrid, { TextEditor } from 'react-data-grid'

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title', editor: TextEditor }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

const rowKeyGetter = (row) => {
  return row.id
}

export const ReactGrid = () => {
  console.log(columns, rows)

  return (
    <DataGrid columns={columns} rows={rows} rowKeyGetter={rowKeyGetter} />
  )
}
