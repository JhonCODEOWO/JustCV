import { Link, Outlet } from "react-router-dom";
import FooterComponent from "../../shared/components/FooterComponent/FooterComponent.component";

function MainLayoutComponent() {
    return (
        <div className="h-screen">
            <div className="navbar justify-between bg-neutral text-neutral-content">
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
            <div className="">
                <Outlet/>
            </div>
            <FooterComponent/>
        </div>
    );
}

export default MainLayoutComponent;