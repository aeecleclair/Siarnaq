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

type ProductVariant = {
  price: number
  description?: string
};


export default function CardProductVariant() {
  const productDescription = "Permet de pratiquer toutes les activités de l'AE";
  const productName = "Adhésion AE";
  const variants: { [id: string]: ProductVariant; } = {
    "Aucun": { "price": 0 }, "1 an": { "price": 200 },
    "3 ans": { "price": 400, description: "Prends en compte toute la scolarité, même en cas de césure" }
  };
  const [toggleValue, setToggleValue] = useState('Aucun');
  const price = variants[toggleValue].price;
  const variantDescription = variants[toggleValue].description;
  return (
    <main className="flex [&>div]:w-full h-screen">
      <Card className="rounded-xl border bg-card text-card-foreground shadow max-w-[700px] m-auto text-zinc-700">
        <CardHeader>
          <CardTitle>
            <span>{productName}</span>
          </CardTitle>
          <CardDescription>
            <span>{price + " €"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span>{productDescription}</span><br />
          <span>{variantDescription}</span>
        </CardContent>
        <CardFooter>
          <ToggleGroup type="single"
            value={toggleValue}
            onValueChange={(value: string) => {
              if (value) setToggleValue(value);
            }}
          >
            {Object.keys(variants).map((id) => (
              <ToggleGroupItem value={id} key={id}>{id}</ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardFooter>
      </Card>
    </main>
  );
}
