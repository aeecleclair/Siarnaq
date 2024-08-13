"use client";

import { StatusDialog } from "@/components/custom/StatusDialog";
import { AssociationPanel } from "@/components/user/AssociationPanel";
import { CentralPanel } from "@/components/user/CentralPanel";
import { useUser } from "@/hooks/useUser";
import { useTokenStore } from "@/stores/token";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { userId } = useTokenStore();
  const { refetch } = useUser(userId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [isEndDialogOpened, setIsEndDialogOpened] = useState(true);

  return (
    <div className="flex min-h-screen w-full flex-col">
      {code === "succeeded" && (
        <StatusDialog
          isOpened={isEndDialogOpened}
          setIsOpened={setIsEndDialogOpened}
          title="Paiement effectué"
          description="Votre paiement a été effectué avec succès"
          status="SUCCESS"
          callback={() => {
            refetch();
            setIsEndDialogOpened(false);
            router.replace("/?sellerId=recap");
          }}
        />
      )}
      {code === "refused" && (
        <StatusDialog
          isOpened={isEndDialogOpened}
          setIsOpened={setIsEndDialogOpened}
          title="Paiement refusé"
          description="Votre paiement a été refusé. Vous pouvez réessayer de payer, si le problème persiste, veuillez nous contacter."
          status="ERROR"
          callback={() => {
            setIsEndDialogOpened(false);
            router.replace("/?sellerId=recap");
          }}
        />
      )}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.32))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <AssociationPanel />
          <CentralPanel />
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t-2">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-balance text-sm leading-loose text-muted-foreground">
              Développé par Éclair
            </p>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a href="" className="font-medium underline underline-offset-4">
                Éclair
              </a>
              . Tout droits réservés.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
