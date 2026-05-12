import React, { useContext, useEffect, useState } from "react";
import { ViewPortContext } from "../ViewPortContext.context";
import type { DeviceType } from "../types/DeviceType";

interface ViewPortProviderComponentProps {
    children: React.ReactNode;
}


function getDeviceType(width: number): DeviceType {
    if (width < 768) return 'smartphone';
    if (width < 1024) return 'tablet';

    return 'computer';
}

function ViewPortProviderComponent({children}: ViewPortProviderComponentProps) {
    const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType(window.innerWidth));

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            setDeviceType(getDeviceType(window.innerWidth))
        })
    }, [])

    return ( 
        <ViewPortContext.Provider value={{deviceType}}>
            {children}
        </ViewPortContext.Provider>
     );
}

export default ViewPortProviderComponent;