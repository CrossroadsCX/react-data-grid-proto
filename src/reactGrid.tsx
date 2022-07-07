import React, { useEffect, useState } from 'react'
import DataGrid, { EditorProps, FormatterProps, TextEditor } from 'react-data-grid'

import SelectEditor from './selectEditor'
import AsyncSelectEditor, { OptionType, OptionsType } from './asyncSelectEditor'

type Product = {
  label: string;
  value: string;
}
interface Row {
  id: number;
  title: string;
  state?: string;
  product?: Product;
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

const loadOptions = async (input: string): Promise<OptionsType> => new Promise((resolve, reject) => {
  const filteredProducts = filterProducts(input)
  setTimeout(() => {
    resolve(filteredProducts)
  }, 1000)
})

const states = [
  { label: 'Indiana', value: 'IN' },
  { label: 'Illinois', value: 'IL' },
]

const isOption = (input: string | number | OptionType): input is OptionType => {
  if (typeof input === 'object' && input.label && input.value) {
    return true
  }

  return false
}

const selectFormatter = (props: FormatterProps<Row>) => {
  const { key } = props.column
  const { row } = props
  const option = row[key as keyof Row]
  if (option && isOption(option)) {
    const { label, value } = option
    return (<>{label}</>)
  }

  return null
}

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
    formatter: selectFormatter,
  },
  {
    key: 'product',
    name: 'Product',
    editor: (p: EditorProps<Row>) => (<AsyncSelectEditor {...p} loadOptions={loadOptions} />),
    editorOptions: {
      editOnClick: true,
    },
    formatter: selectFormatter,
  },
]

const initialRows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' },
]

const rowKeyGetter = (row: Row): number => row.id

export const ReactGrid = () => {
  const [rows, setRows] = useState(initialRows)

  useEffect(() => {
    console.log(rows)
  }, [rows])

  return (
    <DataGrid<Row> columns={columns} rows={rows} onRowsChange={setRows} rowKeyGetter={rowKeyGetter} />
  )
}
