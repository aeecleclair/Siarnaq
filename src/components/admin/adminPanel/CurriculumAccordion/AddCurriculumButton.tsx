import { CurriculumBase, postCdrCurriculums } from "@/api";
import { LoadingButton } from "@/components/custom/LoadingButton";
import _curriculumFormSchema from "@/forms/curriculumFormSchema";
import { useCurriculums } from "@/hooks/useCurriculums";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const AddCurriculumButton = () => {
  const tZod = useTranslations("curriculumFormSchema");
  const curriculumFormSchema = _curriculumFormSchema(tZod);
  const t = useTranslations("addCurriculumButton");
  const { toast } = useToast();
  const { refetch: refetchCurriculums } = useCurriculums();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof curriculumFormSchema>>({
    resolver: zodResolver(curriculumFormSchema),
    mode: "onBlur",
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof curriculumFormSchema>) {
    setIsLoading(true);
    const body: CurriculumBase = {
      ...values,
    };
    const { error } = await postCdrCurriculums({
      body: body,
    });
    if (error) {
      toast({
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    refetchCurriculums();
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
                  <Input
                    {...field}
                    type="text"
                    placeholder={t("curriculumName")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton
            variant="outline"
            type="submit"
            isLoading={isLoading}
            className="w-[100px]"
          >
            {t("add")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
