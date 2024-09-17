import React, {SelectHTMLAttributes} from 'react'

interface option {
  value: any
  label: string
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: {[key: string]: option | any}[]
  keyValueOption?: string
  keyLabelOption?: string
  error?: string
  touched?: boolean
  classShared?: string
  isOptionDefault?: boolean
  dropDownGroup?: boolean | undefined
  height46px?: boolean
}

const Select = ({
  label,
  options,
  error,
  touched,
  name,
  id,
  className = '',
  isOptionDefault = true,
  required = false,
  classShared = '',
  dropDownGroup,
  keyValueOption = 'value',
  keyLabelOption = 'label',
  'aria-label': ariaLabel,
  height46px = true,
  ...rest
}: SelectProps) => {
  return (
    <select
      id={name}
      name={name}
      {...rest}
      className={`w-[100%] border-[1px] px-[5px] max-h-[35px] py-[5px] border-gray-300 min-h-[30px] rounded-sm focus:border-gray-300 outline-none focus-visible:border-gray-300 h-[100%] ${className}`}
    >
      {isOptionDefault && <option value=''></option>}
      {dropDownGroup
        ? options?.map((o, i) => {
            return (
              <optgroup label={o.name} key={i}>
                {o.options.map((op: option) => (
                  <option value={op.value} key={op.value}>
                    {op.label}
                  </option>
                ))}
              </optgroup>
            )
          })
        : options?.map((o, i) => {
            return (
              <option value={o[keyValueOption]} key={i}>
                {o[keyLabelOption]}
              </option>
            )
          })}
    </select>
  )
}

export default Select
