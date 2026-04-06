import { useContext } from "react";
import { CvsContext } from "../CvsContext";

export function useCvsContext() {
    const cvsContext = useContext(CvsContext);
    if(!cvsContext) throw new Error("useCvsContext should be used inside CvsProviderComponent or another provider.");
    return cvsContext;
}