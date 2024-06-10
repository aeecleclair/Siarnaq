import CurrencyInput, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";

interface PriceInputProps {
  onChange?: (
    value: string | undefined,
    name?: string | undefined,
    values?: CurrencyInputOnChangeValues | undefined,
  ) => void;
  value: number | undefined;
  id?: string;
}

export const PriceInput = ({ onChange, value, id }: PriceInputProps) => {
  return (
    <CurrencyInput
      intlConfig={{ locale: "fr-FR", currency: "EUR" }}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      onValueChange={onChange}
      allowNegativeValue={false}
      value={value}
      id={id}
    />
  );
};
