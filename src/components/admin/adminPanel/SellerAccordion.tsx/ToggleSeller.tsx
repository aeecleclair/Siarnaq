import {
  CoreGroupSimple,
  SellerBase,
  SellerComplete,
  deleteCdrSellersSellerId,
  postCdrSellers,
} from "@/api";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";

interface ToggleSellerProps {
  group: CoreGroupSimple;
  sellers: SellerComplete[];
  setRefetchGroups: (arg0: boolean) => void;
  setRefetchSellers: (arg0: boolean) => void;
}

export const ToggleSeller = ({
  group,
  sellers,
  setRefetchGroups,
  setRefetchSellers,
}: ToggleSellerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const sellerIds = sellers.map((seller) => seller.group_id);
  async function createSeller(group: CoreGroupSimple) {
    setIsLoading(true);
    const body: SellerBase = {
      group_id: group.id,
      name: group.name,
      order: sellers.length + 1,
    };
    const { data, error } = await postCdrSellers({
      body: body,
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setRefetchGroups(true);
    setRefetchSellers(true);
    setIsLoading(false);
  }

  async function deleteSeller(groupId: string) {
    setIsLoading(true);
    const { data, error } = await deleteCdrSellersSellerId({
      path: { seller_id: groupId },
    });
    if (error) {
      console.log(error);
      setIsLoading(false);
      return;
    }
    setRefetchGroups(true);
    setRefetchSellers(true);
    setIsLoading(false);
  }
  return (
    <div key={group.id} className="flex flex-row justify-between">
      <span>{group.name}</span>
      {sellerIds.includes(group.id) ? (
        <LoadingButton
          size="icon"
          variant="destructive"
          className="h-8"
          isLoading={isLoading}
          onClick={() =>
            deleteSeller(
              sellers.find((seller) => seller.group_id === group.id)!.id,
            )
          }
        >
          <HiTrash className="w-5 h-5" />
        </LoadingButton>
      ) : (
        <LoadingButton
          variant="outline"
          size="icon"
          className="h-8"
          isLoading={isLoading}
          onClick={() => createSeller(group)}
        >
          <HiPlus className="w-5 h-5" />
        </LoadingButton>
      )}
    </div>
  );
};
