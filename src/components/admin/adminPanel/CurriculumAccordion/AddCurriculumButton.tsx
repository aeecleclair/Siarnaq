import { CurriculumBase, postCdrCurriculums } from "@/api";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddCurriculumButtonProps {
  setRefetchCurriculum: (arg0: boolean) => void;
}

export const AddCurriculumButton = ({
  setRefetchCurriculum,
}: AddCurriculumButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Veuillez renseigner le nom de la variante",
      })
      .min(1, {
        message: "Veuillez renseigner le nom de la variante",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const body: CurriculumBase = {
      ...values,
    };
    const { data, error } = await postCdrCurriculums({
      body: body,
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setRefetchCurriculum(true);
    setIsLoading(false);
    form.reset({
      name: "",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-row gap-4 p-1 pr-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input {...field} type="text" placeholder="Nom du cursus" />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton variant="outline" type="submit" isLoading={isLoading} className="w-[100px]">
            Ajouter
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
