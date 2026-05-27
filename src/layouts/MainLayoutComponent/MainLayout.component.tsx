import { Link, Outlet } from "react-router-dom";
import NotificationsListComponent from "../../notifications/components/NotificationsList.component";

function MainLayoutComponent() {
    return (
        <div className="h-screen">
            <div className="navbar justify-between bg-base-300 text-neutral-content">
                <Link to={''} className="flex gap-x-2.5 items-center">
                    <img src="/JCV.png" alt="" className="rounded-full" width={40} height={40}/>
                    <div className="flex flex-col">
                        <p className="text-base font-bold">JustCV</p>
                        <p className="text-xs">Haciendo las cosas fáciles</p>
                    </div>
                </Link>
                <nav className="flex text-sm mr-5">
                    <Link to={'/aboutUs'}>
                        <p>Acerca de nosotros</p>
                    </Link>
                </nav>
            </div>
            <div className="h-[calc(100dvh-64px)] overflow-y-auto">
                <Outlet/>
            </div>
            <NotificationsListComponent/>
        </div>
    );
}

export default MainLayoutComponent;