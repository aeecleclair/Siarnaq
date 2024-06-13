import { ProductAccordion } from "../custom/productAccordion/ProductAccordion";
import { Accordion } from "../ui/accordion";
import { products } from "./products";
import { sellers } from "./sellers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ProductPanel = () => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || sellers?.at(0)?.id || "";
  const seller = sellers.find((seller) => seller.id === firstSellerId);
  const sellerIndex = sellers.findIndex(
    (seller) => seller.id === firstSellerId,
  );
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !productExpansion[firstSellerId]?.products &&
      productExpansion[firstSellerId]?.loaded
    ) {
      setExpandedProducts(
        firstSellerId,
        products.map((product) => product.id),
      );
    }
  }, [productExpansion, firstSellerId, setExpandedProducts]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{seller ? seller.name : "No seller found"}</CardTitle>
        </CardHeader>
        <CardContent>
          {products ? (
            <Accordion
              type="multiple"
              value={productExpansion[firstSellerId]?.products}
              onValueChange={(value) =>
                setExpandedProducts(firstSellerId, value)
              }
            >
              {products.map((product) => (
                <ProductAccordion
                  key={product.id}
                  product={product}
                  sellerId={seller?.id || ""}
                  showDescription
                />
              ))}
            </Accordion>
          ) : (
            <div className="p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold">No products found</h3>
            </div>
          )}
        </CardContent>
        <CardFooter className="px-6 py-4">
          <div className="flex items-center space-x-2 ml-auto">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                router.replace(
                  `/?sellerId=${sellers[sellerIndex - 1]?.id || ""}`,
                )
              }
              disabled={sellerIndex === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground w-14 flex justify-center">
              {sellerIndex + 1} / {sellers.length}
            </span>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() =>
                router.replace(
                  `/?sellerId=${sellers[sellerIndex + 1]?.id || ""}`,
                )
              }
              disabled={sellerIndex === sellers.length - 1}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
