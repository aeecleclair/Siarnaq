import { AppModulesCdrSchemasCdrProductComplete } from "@/api/hyperionSchemas";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { VariantCard } from "./VariantCard";
import { useSizeStore } from "../admin/sellerProducts/useSize";

interface ProductAccordionProps {
  product: AppModulesCdrSchemasCdrProductComplete;
}

export const ProductAccordion = ({ product }: ProductAccordionProps) => {
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
              {product.variants.map((variant) => (
                <VariantCard
                  key={variant.id}
                  variant={variant}
                  // This is a dummy value, it should be managed by the parent component
                  numberSelected={0}
                />
              ))}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
