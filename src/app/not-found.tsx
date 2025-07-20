import { inter } from "./[locale]/layout";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <html>
      <body className={inter.className}>
        <section className="flex h-screen flex-col place-content-center text-center">
          <h1 className="text-3xl font-bold">404</h1>
          <span className="font-medium">
            Not found, <span className="italic">fyot</span>
          </span>
        </section>
      </body>
    </html>
  );
}
