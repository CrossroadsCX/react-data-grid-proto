import React from 'react'
import type { EditorProps } from 'react-data-grid'
import { ActionMeta, SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'

export type OptionType = { [key: string]: any }
export type OptionsType = Array<OptionType>

interface SelectEditorProps<TRow, TSummaryRow = unknown> extends EditorProps<TRow, TSummaryRow> {
  loadOptions: (inputValue: string, callback: (options: OptionsType) => void) => Promise<OptionsType> | void;
}

interface SelectOptions {
  options?: OptionsType
}

export default function AsyncSelectEditor<TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  // onClose,
  loadOptions,
}: SelectEditorProps<TRow, TSummaryRow>) {
  const selectOptions: SelectOptions = {}

  const onChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    const newRow = { ...row, [column.key]: newValue }
    console.log(newRow)
    onRowChange(newRow, true)
  }

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      menuPortalTarget={document.body}
      onChange={onChange}
      autoFocus
    />
  )
}
