"use client";

import { SellerTab } from "@/components/admin/sellerProducts/SellerTab";
import { UserSearch } from "@/components/admin/userSearch/UserSearch";
import { Card } from "@/components/ui/card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useToken } from "@/hooks/useToken";
import { useSizeStore } from "@/stores/SizeStore";
import { createClient } from "@hey-api/client-fetch";
import { Suspense } from "react";

const AdminPage = () => {
  const { setSize } = useSizeStore();
  const { getToken } = useToken();

  getToken().then((token) => {
    createClient({
      // set default base url for requests
      baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      // set default headers for requests
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  });

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
      <Suspense fallback={<div>Loading...</div>}>
        <Card>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={10}>
              <UserSearch />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={10} onResize={setSize}>
              <SellerTab />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </Suspense>
    </main>
  );
};

export default AdminPage;
