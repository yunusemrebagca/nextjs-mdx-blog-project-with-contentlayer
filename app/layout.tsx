import "./globals.css";
import { Open_Sans } from "next/font/google";
import { Header } from "components/Header";
import { GlobalContextProvider } from "../context/store";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "My Portfolio Project",
  description: "My Portfolio Project Home Page",
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
      </body>
    </html>
  );
}
