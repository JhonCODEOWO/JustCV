import NotificationProviderComponent from "../notifications/NotificationsProvider.component";

interface AppProvidersComponentProps {
    children: React.ReactNode;
}

function AppProvidersComponent({children}: AppProvidersComponentProps) {

    return (
        <NotificationProviderComponent>
            {children}
        </NotificationProviderComponent>
    );
}

export default AppProvidersComponent;