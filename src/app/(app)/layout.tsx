
import { redirect } from "next/navigation";

import Home from "./page";
import Header from "../components/landing-page/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
       <Header />
        {children}
    </>
  );
}
