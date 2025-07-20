import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
