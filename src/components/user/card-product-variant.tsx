"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Children, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ProductVariant = {
  price: number
  description?: string
};
type Product = {
  nom: string
  desc: string
  variants: Record<string, ProductVariant>
};

function CardProductVariant({ product, chosenVariant, setChosenVariant, children }) {
  const variants = product.variants;
  const nVariants = Object.keys(variants).length;
  const chosen = (id: string) => { return id === chosenVariant ? "border-4" : "" };
  return (
    <Card className="rounded-xl border bg-card text-card-foreground shadow min-w-[700px] m-auto text-zinc-700">
      <CardHeader>
        <CardTitle>{product.nom}</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span>{product.desc}</span>
        <div className={"grid grid-cols-" + nVariants + " gap-x-3 items-stretch"}>
          {Object.keys(variants).map((id) => (
            <Card key={id} onClick={() => setChosenVariant(id)} className={chosen(id)}>
              <CardHeader>
                <CardTitle>
                  {id}
                </CardTitle>
                <CardDescription>{variants[id].price + "€"}</CardDescription>
              </CardHeader>
              <CardContent>
                {variants[id].description !== "" ? <span>{variants[id].description}</span> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {children}
      </CardFooter>
    </Card>
  );
}

export default function Main() {
  const arr: Product[] = [{ "nom": "Adhésion AECL", desc: "Pour s'amuser et pouvoir participer à tous les évènements", variants: { "Non": { "price": 0, description: "" }, "1 an": { "price": 100, description: "c'est cher" }, "3 ans": { "price": 250, description: "Même s'il y a césure" } } },
  { "nom": "Adhésion USECL", desc: "Pour pouvoir faire du sport", variants: { "Non": { "price": 0, description: "" }, "Oui": { "price": 200, description: "C'est cher" } } },
  { "nom": "Sdec", desc: "Pour avoir les polys", variants: { "Non": { "price": 0, description: "T'as aucun poly" }, "Pack polys": { "price": 300, description: "T'as tous les polys" } } }]
  const n = arr.length;
  const [index, setIndex] = useState(0);
  const [chosenVariants, setChosenVariants] = useState(Array(n).fill("Non"));
  console.log(chosenVariants);
  const changeVariant = (val: string) => {
    const newState = [...chosenVariants];
    newState[index] = val;
    setChosenVariants(newState);
  };
  const bright = (id: number) => { return id === index ? "font-semibold text-primary" : "" };
  const prices = chosenVariants.map((variant, i) => arr[i].variants[variant].price);
  const totalPrice = prices.reduce((a, b) => a + b);
  const currentProduct = arr[index];
  return (<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Achat de produits</h1>
    </div>
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav
        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
      >          {arr.map((produit, i) => (
        <div className={bright(i)}><Button variant="link" onClick={() => setIndex(i)}>{produit.nom}</Button>
          <span>{chosenVariants[i] + " : " + prices[i] + "€"}</span>
        </div>))}
        <span>Prix total : {totalPrice + "€"}</span></nav>
      <div className="grid gap-6">
        <CardProductVariant product={currentProduct} chosenVariant={chosenVariants[index]} setChosenVariant={changeVariant}>
          <div className="grid grid-cols-3 grid-rows-1 gap-4 justify-items-center flex-1">
            <div>
              {index > 0 ? <Button onClick={() => setIndex(index - 1)}>{"<"}</Button> : null}
            </div>
            <div className="col-start-3">
              {index < (n - 1) ? <Button onClick={() => setIndex(index + 1)}>{">"}</Button> : <Button>Paiment</Button>}
            </div>
          </div>
        </CardProductVariant>

      </div>
    </div>
  </main>
  )
}
