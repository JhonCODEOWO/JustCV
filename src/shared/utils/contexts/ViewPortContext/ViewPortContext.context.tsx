import { createContext } from "react";
import type { DeviceType } from "./types/DeviceType";

interface ViewPortContextType {
    deviceType: DeviceType;
}

export const ViewPortContext = createContext<ViewPortContextType | null>(null);