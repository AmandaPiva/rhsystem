
import { redirect } from "next/navigation";

import Home from "./page";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
    {/* //   <Header /> */}
        {children}
    </>
  );
}
