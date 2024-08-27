import { SellerComplete, Status } from "@/api";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

interface SellerTabListProps {
  status: Status;
  sellers: SellerComplete[];
  isAdmin?: boolean;
}

export const SellerTabList = ({
  status,
  sellers,
  isAdmin,
}: SellerTabListProps) => {
  const t = useTranslations("ProductPart");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (sellerId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("sellerId", sellerId);
    const query = current.toString();
    router.push(`admin?${query}`);
  };

  return (
    <TabsList className={`grid w-full grid-flow-row grid-cols-7`}>
      {sellers.map((seller) => (
        <TabsTrigger
          key={seller.id}
          value={seller.id}
          className="min-w-18 w-full"
          onClick={() => handleClick(seller.id)}
        >
          {seller.name}
        </TabsTrigger>
      ))}
      {isAdmin && (
        <>
          <TabsTrigger
            key="cdradmin"
            value="cdradmin"
            className="w-full min-w-18"
            onClick={() => handleClick("cdradmin")}
          >
            Admin
          </TabsTrigger>
          {((isAdmin && status.status == "online") ||
            status.status === "onsite") && (
            <TabsTrigger
              key="cdrrecap"
              value="cdrrecap"
              className="w-full min-w-18"
              onClick={() => handleClick("cdrrecap")}
            >
              {t("summary")}
            </TabsTrigger>
          )}
        </>
      )}
    </TabsList>
  );
};
