"use client";

import {
  SellerComplete,
  Status,
  app__modules__cdr__schemas_cdr__ProductComplete,
} from "@/api";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useYear } from "@/hooks/useYear";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AddProductAccordionItem } from "./AddProductAccordionItem";

interface SellerTabContentProps {
  status: Status;
  seller: SellerComplete;
  products: app__modules__cdr__schemas_cdr__ProductComplete[];
  refetchProducts: () => void;
}

export const SellerTabContent = ({
  status,
  seller,
  products,
  refetchProducts,
}: SellerTabContentProps) => {
  const { toast } = useToast();
  const t = useTranslations("sellerTabContent");
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  const userId = searchParams.get("userId");
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();
  const { token } = useTokenStore();
  const { year } = useYear();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      productExpansion[seller.id] === undefined &&
      seller.id === activeSellerId &&
      products &&
      products.length > 0
    ) {
      setExpandedProducts(
        seller.id,
        products.map((product) => product.id),
      );
    }
  }, [
    productExpansion,
    seller.id,
    setExpandedProducts,
    products,
    activeSellerId,
  ]);

  const exportResult = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://hyperion.myecl.fr"}/cdr/sellers/${seller.id}/results/`,
        {
          method: "GET",
          headers: {
            Accept:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error while downloading");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `CdR_${year?.year}_${seller.name}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        description: (error as { detail: String }).detail,
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <TabsContent value={seller.id} className="min-w-96 w-full">
      <div className="flex border-b">
        <AddProductAccordionItem
          seller={seller}
          refreshProduct={refetchProducts}
        />
        <Button className="w-[100px] m-4" onClick={exportResult}>
          Exporter
        </Button>
      </div>

      {products.length > 0 ? (
        <Accordion
          type="multiple"
          value={productExpansion[seller.id]}
          onValueChange={(value) => setExpandedProducts(seller.id, value)}
        >
          {products.map((product) => (
            <ProductAccordion
              key={product.id}
              product={product}
              sellerId={seller.id}
              userId={userId!}
              canAdd={status.status !== "closed"}
              canEdit={
                (product.needs_validation && status.status === "pending") ||
                (status.status === "online" && !product.available_online)
              }
              canRemove={
                status.status === "pending" ||
                (status.status === "online" && !product.available_online)
              }
              canDisable={status.status !== "closed"}
              refreshProduct={refetchProducts}
              isSelectable={status.status === "onsite"}
              isAdmin
            />
          ))}
        </Accordion>
      ) : (
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold">{t("noProductFound")}</h3>
        </div>
      )}
    </TabsContent>
  );
};
