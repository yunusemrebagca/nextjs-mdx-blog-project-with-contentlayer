"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const GlobalContext = createContext<ContextProps>({
  currentPage: 1,
  setCurrentPage: (): string => "",
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || `${1}`)
  );

  return (
    <GlobalContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
