import { SellerComplete, getCdrOnlineSellers } from "@/api";
import { useToken } from "@/hooks/useToken";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  HiCheck,
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
} from "react-icons/hi";

export const AssociationPanel = ({
  onlineSellers,
}: {
  onlineSellers: SellerComplete[];
}) => {
  const searchParams = useSearchParams();
  const firstSellerId =
    searchParams.get("sellerId") || onlineSellers?.at(0)?.id;

  return (
    <div>
      <div className="mx-auto grid w-full max-w-6xl gap-2 mb-6">
        <h1 className="text-3xl font-semibold">Associations</h1>
      </div>
      <nav className="grid gap-4 text-sm text-muted-foreground">
        {onlineSellers.map((seller) => (
          <Link
            key={seller.id}
            href={`/?sellerId=${seller.id}`}
            className={`hover:text-primary ${
              seller.id === firstSellerId ? "font-semibold text-primary" : ""
            }`}
          >
            <div className="flex flex-row items-center">
              {parseInt(seller.id) % 2 === 0 ? (
                <HiCheck className="h-4 w-4 mr-2" />
              ) : (
                <HiOutlineShoppingCart className="h-4 w-4 mr-2" />
              )}
              {seller.name}
              <span className="ml-2">·</span>
              <span className="ml-2">1</span>
            </div>
          </Link>
        ))}
        <Link
          href="/?sellerId=recap"
          className={`hover:text-primary ${
            firstSellerId === "recap" ? "font-semibold text-primary" : ""
          }`}
        >
          <div className="flex flex-row items-center">
            <HiOutlineClipboardList className="h-4 w-4 mr-2" />
            Récapitulatif
            <span className="ml-2">·</span>
            <span className="ml-2">10</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};
