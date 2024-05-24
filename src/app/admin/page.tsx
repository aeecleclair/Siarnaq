"use client";

import { SellerTab } from "@/components/admin/sellerProducts/SellerTab";
import { useSizeStore } from "@/components/admin/sellerProducts/useSize";
import { UserSearch } from "@/components/admin/userSearch/UserSearch";
import { Card } from "@/components/ui/card";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const AdminPage = () => {
  const { setSize } = useSizeStore();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
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
    </main>
  );
};

export default AdminPage;
