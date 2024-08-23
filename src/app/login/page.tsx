"use client";

import { TextSeparator } from "@/components/custom/TextSeparator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import MyECLButton from "../../components/login/MyECLButton";

const Login = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const year = new Date().getFullYear();
  const possiblePromos = Array.from({ length: 5 }).map((_, index) => {
    return (year - index).toString();
  });

  const [selectedPromo, setSelectedPromo] = useState<string | undefined>(
    undefined,
  );
  return (
    <div className="flex [&>div]:w-full h-screen">
      <Card className="rounded-xl border bg-card text-card-foreground shadow max-w-[700px] m-auto text-zinc-700">
        <CardHeader>
          <CardTitle>{t("title", { year: year })}</CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <span>{t("description")}</span>
            <span>
              {t("contact")}{" "}
              <a href="mailto://bde@ec-lyon.fr">bde@ec-lyon.fr</a>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <span className="m-auto">{t("alreadyHaveMyECLAccount")}</span>
          <form>
            <div className="grid w-full items-center gap-4">
              <MyECLButton />
            </div>
          </form>
          <TextSeparator text={t("or")} />
          <span className="m-auto">{t("selectPromotion")}</span>
          <div key="curriculum" className="h-full gap-4 flex flex-col">
            <Select value={selectedPromo} onValueChange={setSelectedPromo}>
              <SelectTrigger className="w-full m-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {possiblePromos.map((promo) => (
                    <SelectItem key={promo} value={promo}>
                      {t("promotion", { year: promo })}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {selectedPromo && (
            <Button
              variant="outline"
              size="lg"
              className="w-full m-auto"
              onClick={() => {
                let redirectUri =
                  process.env.NEXT_PUBLIC_BACKEND_URL + "/calypsso/register";
                if (selectedPromo === possiblePromos[0]) {
                  redirectUri += "?external=true";
                }
                router.push(redirectUri);
              }}
            >
              {t("register")}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
