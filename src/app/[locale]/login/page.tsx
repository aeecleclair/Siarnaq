"use client";

import MyECLButton from "../../../components/login/MyECLButton";

import { TextSeparator } from "@/components/custom/TextSeparator";
import { useYear } from "@/hooks/useYear";
import { useRouter } from "@/i18n/navigation";

import { useTranslations } from "next-intl";
import { useState } from "react";

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

const Login = () => {
  const t = useTranslations("login");
  const router = useRouter();
  const { year } = useYear();

  const [accountType, setAccountType] = useState<string | undefined>(undefined);
  return (
    <div className="flex [&>div]:w-full h-[--custom-vh] bg-muted/40">
      <Card className="rounded-xl border bg-card text-muted-foreground shadow max-w-[700px] m-auto">
        <CardHeader>
          <CardTitle>{t("title", { year: year.toString() })}</CardTitle>
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
          <span className="m-auto">{t("selectAccountType")}</span>
          <span className=" text-center text-sm text-orange-500">
            {t("usePersonalEmail")}
          </span>
          <div key="curriculum" className="h-full gap-4 flex flex-col">
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger className="w-full m-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="student">{t("student")}</SelectItem>
                  <SelectItem value="external">{t("external")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {accountType && (
            <Button
              variant="outline"
              size="lg"
              className="w-full m-auto"
              onClick={() => {
                let redirectUri =
                  process.env.NEXT_PUBLIC_BACKEND_URL + "/calypsso/register";
                if (accountType === "external") redirectUri += "?external=true";
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
