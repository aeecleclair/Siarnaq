"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function CardProductVariant({ product, chosenVariant, setChosenVariant, children }) {
  const variants = product.variants;
  const nVariants = Object.keys(variants).length.toString();
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
                {variants[id].description}
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


