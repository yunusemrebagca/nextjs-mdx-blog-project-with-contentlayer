import "./globals.css";
import { Open_Sans } from "next/font/google";
import { Header } from "components/Header";
import { GlobalContextProvider } from "../context/store";
import { Footer } from "@/components/Footer";
import { Metadata } from "next/types";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: "Blogga", template: "%s | Blogga" },

  description: "my personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        {" "}
        <GlobalContextProvider>
          <Header />
          {children}
        </GlobalContextProvider>
        <Footer />
      </body>
    </html>
  );
}
