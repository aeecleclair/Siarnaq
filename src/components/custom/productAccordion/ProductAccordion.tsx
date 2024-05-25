import { AppModulesCdrSchemasCdrProductComplete } from "@/api/hyperionSchemas";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { VariantCardWithOptions } from "./VariantCardWithOptions";
import { useSizeStore } from "../../admin/sellerProducts/useSize";
import { AddingVariantCard } from "./AddingVariantCard";

interface ProductAccordionProps {
  product: AppModulesCdrSchemasCdrProductComplete;
  canAdd?: boolean;
  canEdit?: boolean;
  canRemove?: boolean;
}

export const ProductAccordion = ({
  product,
  canAdd,
  canEdit,
  canRemove,
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
                  // This is a dummy value, it should be managed by the parent component
                  numberSelected={0}
                  canEdit={canEdit}
                  canRemove={canRemove}
                />
              ))}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
