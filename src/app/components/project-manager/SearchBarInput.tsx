import { Input } from "@nextui-org/react";
import React, { ChangeEvent } from "react";

type InputWithLabelType = {
  type: any;
  id: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  name?: string;
};

export default function SearchBarInput({
  type,
  id,
  placeholder,
  value,
  onChange,
  defaultValue,
  name,
}: InputWithLabelType) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}
