"use client";

import { useMemo } from "react";
import Select, { MultiValue, ActionMeta, StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";

type OptionType = { value: string; label: string };

interface SelectMultipleProps {
  onChange: (value: OptionType[]) => void;
  options: OptionType[];
  value: OptionType[];
  disabled?: boolean;
  placeholder?: string;
  creatable?: boolean;
}

export const SelectMultiple: React.FC<SelectMultipleProps> = ({
  onChange,
  options,
  value,
  disabled = false,
  placeholder,
  creatable = false,
}) => {
  const handleChange = (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    onChange(newValue as OptionType[]);
  };

  const selectStyles: StylesConfig<OptionType, true> = {
    control: (base) => ({
      ...base,
      borderColor: "hsl(var(--border))",
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      "&:hover": {
        borderColor: "hsl(var(--primary))",
      },
      "&:focus-within": {
        borderColor: "hsl(var(--ring))",
        boxShadow: "0 0 0 2px hsl(var(--ring) / 0.3)",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--popover))",
      color: "hsl(var(--popover-foreground))",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--popover))",
      color: "hsl(var(--popover-foreground))",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "hsl(var(--accent))"
        : "hsl(var(--popover))",
      color: state.isFocused
        ? "hsl(var(--accent-foreground))"
        : "hsl(var(--foreground))",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "hsl(var(--secondary-foreground))",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "hsl(var(--secondary-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--destructive))",
        color: "hsl(var(--destructive-foreground))",
      },
    }),
    input: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
    }),
    placeholder: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
    }),
    singleValue: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
    }),
  };

  const SelectComponent = creatable ? CreatableSelect : Select;

  return (
    <SelectComponent<OptionType, true>
      placeholder={placeholder}
      className="text-sm h-10 w-full"
      styles={selectStyles}
      value={value}
      onChange={handleChange}
      options={options}
      isDisabled={disabled}
      isMulti
    />
  );
};