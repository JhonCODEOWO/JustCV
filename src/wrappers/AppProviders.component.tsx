import NotificationProviderComponent from "../notifications/NotificationsProvider.component";
import ViewPortProviderComponent from "../shared/utils/contexts/ViewPortContext/wrapper/ViewPortProviderComponent.component";

interface AppProvidersComponentProps {
    children: React.ReactNode;
}

function AppProvidersComponent({children}: AppProvidersComponentProps) {

    return (
        <ViewPortProviderComponent>
            <NotificationProviderComponent>
                {children}
            </NotificationProviderComponent>
        </ViewPortProviderComponent>
    );
}

export default AppProvidersComponent;