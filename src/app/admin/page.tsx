"use client";

import { SellerTab } from "@/components/admin/sellerProducts/SellerTab";
import { UserSearch } from "@/components/admin/userSearch/UserSearch";
import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCoreUser } from "@/hooks/useCoreUser";
import { useSellers } from "@/hooks/useSellers";
import { useStatus } from "@/hooks/useStatus";
import { useSizeStore } from "@/stores/SizeStore";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const AdminPage = () => {
  const { setSize, size } = useSizeStore();
  const { user, isAdmin } = useCoreUser();
  const { sellers } = useSellers();
  const router = useRouter();
  const { status } = useStatus();

  useEffect(() => {
    if (!user) return;
    const userGroups = user.groups?.map((group) => group.id);
    const isUserInASellerGroup = userGroups?.some((group) =>
      sellers.some((seller) => seller.group_id === group),
    );
    if (!isAdmin && !isUserInASellerGroup) {
      router.push("/");
    }
  }, [isAdmin, router, sellers, user]);

  useEffect(() => {
    if (status?.status) {
      if (status.status === "onsite") {
        setSize(50);
      } else {
        setSize(100);
      }
    }
  }, [status, setSize]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
      <Suspense fallback={<div>Loading...</div>}>
        {status && (
          <Card>
            {status.status === "onsite" ||
            (isAdmin && status.status === "online") ? (
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={100 - size} minSize={10}>
                  <UserSearch />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={size}
                  minSize={10}
                  onResize={setSize}
                >
                  <SellerTab status={status} />
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <SellerTab status={status} />
            )}
          </Card>
        )}
      </Suspense>
    </main>
  );
};

export default AdminPage;
