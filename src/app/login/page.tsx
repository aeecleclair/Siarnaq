"use client";

import MyECLButton from "../../components/login/MyECLButton";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const possiblePromos = Array.from({ length: 5 }).map((_, index) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - index);
    return date.getFullYear().toString();
  });

  const [selectedPromo, setSelectedPromo] = useState<string | undefined>(
    undefined,
  );
  return (
    <div className="flex [&>div]:w-full h-screen">
      <Card className="rounded-xl border bg-card text-card-foreground shadow max-w-[700px] m-auto text-zinc-700">
        <CardHeader>
          <CardTitle>{`Chaîne de rentrée ${new Date().getFullYear()}`}</CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <p>
              Consequat sint incididunt laborum ipsum. Nostrud enim culpa
              consequat laborum eiusmod minim consectetur deserunt sunt proident
              adipisicing. Adipisicing quis magna ea magna sint minim nostrud do
              ullamco non commodo adipisicing. Nisi elit veniam nostrud esse
              fugiat culpa. Excepteur ex minim sint cillum ipsum et ex pariatur
              nostrud. Laborum eiusmod tempor dolor sunt. In aute ad dolor non
              laborum ea nulla fugiat.
            </p>
            <p>
              Anim consectetur qui excepteur aute exercitation deserunt do nulla
              eiusmod magna tempor qui. Sunt velit commodo enim occaecat
              incididunt non nostrud dolor velit. Consequat non laborum aliquip
              incididunt eu. Ullamco exercitation magna in non nostrud elit
              cupidatat ad minim nostrud. Enim tempor commodo ad magna.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <span className="m-auto">Vous avez déjà un compte MyECL ?</span>
          <form>
            <div className="grid w-full items-center gap-4">
              <MyECLButton />
            </div>
          </form>
          <TextSeparator text="Sinon" />
          <span className="m-auto">
            Pour commencer, veuillez sélectionner votre promo :
          </span>
          <div key="curriculum" className="h-full gap-4 flex flex-col">
            <Select value={selectedPromo} onValueChange={setSelectedPromo}>
              <SelectTrigger className="w-full m-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {possiblePromos.map((promo) => (
                    <SelectItem key={promo} value={promo}>
                      Promo {promo}
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
              {"S'inscrire"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
