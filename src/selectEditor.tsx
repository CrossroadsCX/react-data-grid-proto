import React from 'react'
import type { CalculatedColumn, EditorProps } from 'react-data-grid'
import Select, { ActionMeta, SingleValue } from 'react-select'

type OptionType = { [key: string]: any }
type OptionsType = Array<OptionType>

interface SelectColumn<TRow, TSummaryRow> extends CalculatedColumn<TRow, TSummaryRow> {
  options: OptionsType;
}

interface SelectEditorProps<TRow, TSummaryRow = unknown> extends EditorProps<TRow, TSummaryRow> {
  options?: OptionsType;
}

interface SelectOptions {
  options?: OptionsType
}

export default function SelectEditor<TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose,
  options,
}: SelectEditorProps<TRow, TSummaryRow>) {
  const selectOptions: SelectOptions = {}

  const onChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    const newRow = { ...row, [column.key]: newValue }

    onRowChange(newRow, true)
  }

  console.log(options)

  if (options) {
    selectOptions.options = options
  }

  return (
    <Select
      {...selectOptions}
      menuPortalTarget={document.body}
      onChange={onChange}
      autoFocus
    />
  )
}
