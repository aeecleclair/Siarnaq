import MyECLButton from "../../components/login/MyECLButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import * as React from "react";

const Login = () => {
  return (
    <div className="flex [&>div]:w-full h-screen">
      <Card className="rounded-xl border bg-card text-card-foreground shadow max-w-[700px] m-auto text-zinc-700">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
          <CardDescription>
            Si vous possédez déjà un compte MyECL, vous pouvez vous connecter
            avec.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <MyECLButton />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-row justify-between">
          <Button variant="link">
            <Link href="/register">Créer un compte</Link>
          </Button>
          <Button variant="link">
            <Link href="/recover">Mot de passe oublié ?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
