"use client";

import {
  SellerComplete,
  Status,
  app__modules__cdr__schemas_cdr__ProductComplete,
  getCdrSellersSellerIdResults,
} from "@/api";
import { ProductAccordion } from "@/components/custom/productAccordion/ProductAccordion";
import { Accordion } from "@/components/ui/accordion";
import { TabsContent } from "@/components/ui/tabs";
import { useProductExpansionStore } from "@/stores/productExpansionStore";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AddProductAccordionItem } from "./AddProductAccordionItem";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/hooks/useToken";

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
  const t = useTranslations("sellerTabContent");
  const searchParams = useSearchParams();
  const activeSellerId = searchParams.get("sellerId");
  const userId = searchParams.get("userId");
  const { productExpansion, setExpandedProducts } = useProductExpansionStore();

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
  const { isTokenExpired } = useToken();

  const exportResult = async () => {
    const {data: data} = await getCdrSellersSellerIdResults({
                path: {
                  seller_id: seller.id,
                },
              });
   

    const blob: Blob = await (data as Response).blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rapport.xlsx'); // nom du fichier à sauvegarder
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // Nettoyage

  }

  return (
    <TabsContent value={seller.id} className="min-w-96 w-full">
      <div className="flex border-b">
        <AddProductAccordionItem
        seller={seller}
        refreshProduct={refetchProducts}
        />
        <Button
          className="w-[100px] m-4"
          onClick={exportResult}
        >
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
