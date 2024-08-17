import React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const defaultMaskOptions = {
  prefix: "",
  suffix: "€",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: " ",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
};

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  id,
}) => {
  const currencyMask = createNumberMask(defaultMaskOptions);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value;
    if (
      event.nativeEvent instanceof InputEvent &&
      event.nativeEvent.data === ","
    ) {
      rawValue += ".";
      // Move the cursor to the end of the string
      const input = event.target as HTMLInputElement;
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
    const numericValue = rawValue.replace(/[^0-9.]/g, "");
    onChange(numericValue);
  };

  return (
    <MaskedInput
      mask={currencyMask}
      value={value}
      onChange={handleChange}
      id={id}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      render={(ref, props) => (
        <input ref={ref as React.Ref<HTMLInputElement>} {...props} />
      )}
    />
  );
};
