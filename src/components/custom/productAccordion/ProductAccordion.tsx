import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { AddingVariantCard } from "./AddingVariantCard";
import { VariantCardWithOptions } from "./VariantCardWithOptions";
import { app__modules__cdr__schemas_cdr__ProductComplete } from "@/api";
import { useSizeStore } from "@/stores/SizeStore";

interface ProductAccordionProps {
  product: app__modules__cdr__schemas_cdr__ProductComplete;
  canAdd?: boolean;
  canEdit?: boolean;
  canRemove?: boolean;
  canDisable?: boolean;
  sellerId: string;
}

export const ProductAccordion = ({
  product,
  canAdd,
  canEdit,
  canRemove,
  canDisable,
  sellerId,
}: ProductAccordionProps) => {
  const { size } = useSizeStore();
  const numberOfCard = Math.round(size / 20);

  return (
    <AccordionItem value={product.id}>
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">{product.name_en}</h3>
          <p className="text-sm text-gray-500">{product.description_en}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {/* Take care to export all grid-cols-n
        Can't find a better way to do it for naw */}
        <div className="hidden grid-cols-5" />
        <div className="hidden grid-cols-4" />
        <div className="hidden grid-cols-3" />
        <div className="hidden grid-cols-2" />
        <div className="hidden grid-cols-1" />
        <div className={`grid grid-cols-${numberOfCard} gap-4`}>
          {product.variants && (
            <>
              {canAdd && <AddingVariantCard />}
              {product.variants.map((variant) => (
                <VariantCardWithOptions
                  key={variant.id}
                  variant={variant}
                  productId={product.id}
                  sellerId={sellerId}
                  canEdit={canEdit}
                  canRemove={canRemove}
                  canDisable={canDisable}
                />
              ))}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
