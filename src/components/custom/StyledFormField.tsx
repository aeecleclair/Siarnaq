import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Input } from "../ui/input";

interface StyledFormFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  form: any;
}

export const StyledFormField = ({
  form,
  label,
  id,
  placeholder,
}: StyledFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="grid gap-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
