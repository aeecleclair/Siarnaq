import { SellerComplete, Status } from "@/api";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

interface SellerTabListProps {
  status: Status;
  sellers: SellerComplete[];
}

export const SellerTabList = ({ status, sellers }: SellerTabListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (sellerId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sellerId", sellerId);
    const query = current.toString();
    router.push(`admin?${query}`);
  };

  return (
    <TabsList
      className={`"grid w-full grid-cols-${sellers.length + 1 + (status.status === "onsite" ? 1 : 0)}"`}
    >
      {sellers.map((seller) => (
        <TabsTrigger
          key={seller.id}
          value={seller.id}
          className="w-full min-w-18"
          onClick={() => handleClick(seller.id)}
        >
          {seller.name}
        </TabsTrigger>
      ))}
      <TabsTrigger
        key="cdradmin"
        value="cdradmin"
        className="w-full min-w-18"
        onClick={() => handleClick("cdradmin")}
      >
        Admin
      </TabsTrigger>
      {status.status === "onsite" && (
        <TabsTrigger
          key="cdrrecap"
          value="cdrrecap"
          className="w-full min-w-18"
          onClick={() => handleClick("cdrrecap")}
        >
          Récaputilatif
        </TabsTrigger>
      )}
    </TabsList>
  );
};
