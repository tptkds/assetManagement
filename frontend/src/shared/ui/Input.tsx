import React from "react";
import clsx from "clsx";

export interface InputProps {
  type: string;
  classNames?: string;
  placeholder?: string;
  value?: string;
  withImage?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isHovered?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  isDone?: boolean;
  isError?: boolean;
}

export default function Input({
  type,
  classNames,
  placeholder,
  value,
  withImage,
  onChange,
  isHovered = false,
  isSelected = false,
  isDisabled = false,
  isError = false,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      className={clsx(
        `font-regular rounded-md border border-gray-20 px-[10px] py-[9.5px] text-body-sm text-gray-100 hover:border-gray-40 focus:border-green-60 focus:outline-none disabled:border-gray-20 disabled:bg-white disabled:text-gray-30`,
        classNames,
        {
          "pl-[44px]": withImage,
          "border-gray-20 bg-white text-gray-30": isDisabled,
          "border-green-60": isSelected && !isError,
          "border-gray-40": isHovered && !isError,
          "!border-alert": isError,
        },
      )}
    />
  );
}
