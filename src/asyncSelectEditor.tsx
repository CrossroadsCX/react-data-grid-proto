import React from 'react'
import type { CalculatedColumn, EditorProps  } from 'react-data-grid'
import Select, { ActionMeta, SingleValue, OptionsOrGroups } from 'react-select'
import AsyncSelect from 'react-select/async'

export type OptionType = { [key: string]: any }
export type OptionsType = Array<OptionType>

interface SelectColumn<TRow, TSummaryRow> extends CalculatedColumn<TRow, TSummaryRow> {
  options: OptionsType;
}

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
  onClose,
  loadOptions,
}: SelectEditorProps<TRow, TSummaryRow>) {
  const selectOptions: SelectOptions = {}

  const onChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    const newRow = { ...row, [column.key]: newValue?.value }
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
