import CreateCvForm from "../../CV/components/CreateCvForm/CreateCvForm.component";
import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";

function CreatingCVPageComponent() {
    return ( 
        <section className="p-4 bg-base-300">
            <HeaderComponent level={1} className="mb-5">
                Todo listo, comienza a colocar tu información.
            </HeaderComponent>
            <CreateCvForm/>
        </section>
     );
}

export default CreatingCVPageComponent;