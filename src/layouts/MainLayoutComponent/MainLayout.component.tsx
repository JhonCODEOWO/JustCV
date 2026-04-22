import { Link, Outlet } from "react-router-dom";
import FooterComponent from "../../shared/components/FooterComponent/FooterComponent.component";
import NotificationsListComponent from "../../notifications/components/NotificationsList.component";

function MainLayoutComponent() {
    return (
        <div className="h-screen">
            <div className="navbar justify-between bg-base-100 text-neutral-content">
                <Link to={''} className="flex flex-col">
                    <p className="text-base font-bold">JustCV</p>
                    <p className="text-xs">Haciendo las cosas fáciles</p>
                </Link>
                <nav className="flex text-sm">
                    <Link to={'/aboutUs'}>
                        <p>Acerca de nosotros</p>
                    </Link>
                </nav>
            </div>
            <div className="h-[calc(100dvh-64px-160px)] overflow-y-auto">
                <Outlet/>
            </div>
            <NotificationsListComponent/>
            <FooterComponent/>
        </div>
    );
}

export default MainLayoutComponent;