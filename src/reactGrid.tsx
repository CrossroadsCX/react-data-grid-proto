import React, { useEffect, useState } from 'react'
import DataGrid, { EditorProps, TextEditor } from 'react-data-grid'

import SelectEditor from './selectEditor'
import AsyncSelectEditor, { OptionsType } from './asyncSelectEditor'

interface Row {
  id: number;
  title: string;
}

const products = [
  { label: 'Coke', value: 'coke' },
  { label: 'Pepsi', value: 'pepsi' },
  { label: 'Mountain Dew', value: 'mountain_dew' },
  { label: 'Dr. Pepper', value: 'dr_pepper' },
  { label: 'Arizona Iced Tea', value: 'arizona_iced_tea' },
  { label: 'Mr. Pibb', value: 'mr_pibb' },
]

const filterProducts = (input: string) => {
  console.log(input)
  return products.filter((product) => product.label.toLowerCase().includes(input.toLowerCase()))
}

const loadOptions = async (input: string): Promise<OptionsType> => {
  return new Promise((resolve, reject) => {
    const filteredProducts = filterProducts(input)
    setTimeout(() => {
      resolve(filteredProducts)
    }, 1000)
  })
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
    },
  },
  {
    key: 'product',
    name: 'Product',
    editor: (p: EditorProps<Row>) => (<AsyncSelectEditor {...p} loadOptions={loadOptions} />),
    editorOptions: {
      editOnClick: true,
    },
  },
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
