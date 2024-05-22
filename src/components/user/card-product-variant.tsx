"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type ProductVariant = {
  price: number
  description?: string
};


export default function CardProductVariant() {
  const productDescription = "Permet de pratiquer toutes les activités de l'AE.";
  const productName = "Adhésion AE";
  const variants: { [id: string]: ProductVariant; } = {
    "Non": { "price": 0, description: "Attention, vous ne pourrez pas participer ..." },
    "1 an": { "price": 200, description: "Uniquement 1 année" },
    "3 ans": { "price": 400, description: "Prends en compte toute la scolarité, même en cas de césure." }
  };
  const [toggleValue, setToggleValue] = useState('Non');
  const price = variants[toggleValue].price;
  const variantDescription = (id: string) => variants[id].description;
  const cardColor = (id: string) => ((id === toggleValue) ? "zinc-300" : "white");
  return (
    <main className="flex [&>div]:w-full h-screen">
      <Card className="rounded-xl border bg-card text-card-foreground shadow min-w-[700px] m-auto text-zinc-700">
        <CardHeader>
          <CardTitle>Sélection des produits</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="Produit">
              <AccordionTrigger>{productName + " - " + toggleValue + " : " + price + " €"}</AccordionTrigger>
              <AccordionContent>
                <span>{productDescription}</span>
                <div className="grid grid-cols-3 gap-x-3 items-stretch">
                  {Object.keys(variants).map((id) => (
                    <Card key={id} onClick={() => setToggleValue(id)} className={"bg-" + cardColor(id) + " border" + ((id === toggleValue) ? "-[20px]" : "")}>
                      <CardHeader>
                        <CardTitle>
                          {id}
                        </CardTitle>
                        <CardDescription>{variants[id].price + "€"}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {variantDescription(id) !== "" ? <span>{variantDescription(id)}</span> : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
