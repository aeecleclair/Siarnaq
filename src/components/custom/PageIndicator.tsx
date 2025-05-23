import { GetCdrOnlineSellersResponse } from "@/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface PageIndicatorProps {
  currentSellerId: string;
  onlineSellers: GetCdrOnlineSellersResponse;
}

export const PageIndicator = ({
  currentSellerId,
  onlineSellers,
}: PageIndicatorProps) => {
  const router = useRouter();

  const availablePagesIds = [
    ...onlineSellers.map((seller) => seller.id),
    "info",
    "recap",
  ];

  const pageIndex = availablePagesIds?.findIndex(
    (sellerId) => sellerId === currentSellerId,
  );

  return (
    <div className="flex items-center space-x-2 ml-auto">
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (!onlineSellers || pageIndex === undefined) {
            return;
          }
          router.push(`/?sellerId=${availablePagesIds[pageIndex - 1]}`);
        }}
        disabled={pageIndex === 0}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      {availablePagesIds && pageIndex !== undefined && (
        <span className="text-sm font-medium text-muted-foreground w-14 flex justify-center">
          {pageIndex + 1} / {availablePagesIds.length}
        </span>
      )}
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (!availablePagesIds || pageIndex === undefined) {
            return;
          }
          router.replace(`/?sellerId=${availablePagesIds[pageIndex + 1]}`);
        }}
        disabled={pageIndex === (availablePagesIds?.length ?? 0) - 1}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
