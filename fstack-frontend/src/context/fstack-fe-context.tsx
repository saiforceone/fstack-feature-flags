import { createContext, ReactNode, useState } from "react";
import type { FStackFlagsContext } from "../@types/fstack-flags";

export const FStackFEContext = createContext<FStackFlagsContext | null>(null);

export default function FStackFeContextProvider({ children }: { children: ReactNode }): ReactNode {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  return <FStackFEContext.Provider value={{ dataLoading }}>{children}</FStackFEContext.Provider>;
}
