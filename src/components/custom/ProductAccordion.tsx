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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.name_en}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-gray-500">{product.description_en}</p>
        {/* Take care to export all grid-cols-n */}
        <div className={`grid grid-cols-${numberOfCard} gap-4 mt-4`}>
          {product.variants && (
            <>
              {product.variants.map((variant) => (
                <VariantCard key={variant.id} variant={variant} />
              ))}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
