import { useContext } from "react"
import { ViewPortContext } from "./ViewPortContext.context"

export const useViewPortContext = () => {
    const context = useContext(ViewPortContext)
    if(!context) throw new Error(`You can't use this hook without a parent ViewPortProviderComponent`);
    return context;
}