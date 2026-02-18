import { useNavigate } from "react-router-dom";
import CardComponent from "../../shared/components/CardComponent/CardComponent.component";
import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";
import HeroComponent from "../../shared/components/HeroComponent/HeroComponent.component";

function IndexPageComponent() {
    const navigator = useNavigate();

    function handleStartNowClick(){
        navigator('/creating-cv');
    }
    return (
        <div>
            <HeroComponent 
                title="¡Solo CVealizalo!" 
                heroContent="Con JustCV olvídate de investigar, diseñar, arrastrar elementos y todas las tareas pesadas de crear un CV con formatos específicos, solo coloca tu información y listo"
                url_img="https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp"
                onStartNowClick={handleStartNowClick}
            />

            <section className="py-16 px-6 flex flex-col gap-y-20 items-center justify-center h-dvh">
                <HeaderComponent level={2} className="text-center">
                    <p>¿Porqué deberías utilizar JustCV?</p>
                </HeaderComponent>
                <div className="grid grid-cols-3 mt-3 w-full">
                    <CardComponent 
                        title="Practicidad" 
                        content="Tu solo preocúpate por colocar tus datos lo demás lo hacemos nosotros"
                    />
                    <CardComponent 
                        title="Formatos actuales" 
                        content="Genera CV en cualquier tipo de formato popular actual."
                    />
                    <CardComponent 
                        title="Es gratis" 
                        content="Utilizar este generador no tiene ningún costo, a menos que decidas cooperar para que el dev tome un café por supuesto ;)"
                    />
                </div>
            </section>
            <section className="py-20 px-6 bg-base-300">
                <HeaderComponent level={2} className="text-center mb-3">
                    ¿Como funciona?
                </HeaderComponent>
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="w-73 bg-base-200 p-5 rounded">
                        <HeaderComponent level={3}>
                            Ingresa tu información
                        </HeaderComponent>
                        <p>Si, literalmente solo añade la información de tu perfil profesional ;D</p>
                    </div>
                    <div className="w-73 h-7 flex justify-center">
                        <div className="w-2.5 md:w-full bg-secondary h-full md:h-4"></div>
                    </div>
                    <div className="w-73 bg-base-200 p-5 rounded">
                            <HeaderComponent level={3}>
                                Envía la información
                            </HeaderComponent>
                            <p>No te preocupes por lo demás, déjalo en nuestras manos.</p>
                    </div>
                    <div className="w-73 h-7 flex justify-center">
                        <div className="w-2.5 md:w-full bg-secondary h-full md:h-4"></div>
                    </div>
                    <div className="w-73 bg-base-200 p-5 rounded">
                        <HeaderComponent level={3}>
                                Guarda el PDF generado
                        </HeaderComponent>
                        <p>Listo! una vez hayas enviado tus datos te generaremos un pdf con el formato que hayas elegido.</p>
                    </div>
                </div>
            </section>
            <section className="bg-base-200 py-20 px-5">
                <HeaderComponent level={2} className="text-center mb-10">
                    ¡Pruebalo ahora!
                </HeaderComponent>
                <div className="grid grid-cols-2 gap-x-4 px-7">
                    <div className="bg-base-300 rounded-md p-3">
                        
                    </div>
                    <div className="bg-base-300 rounded-md p-3">
                        <HeaderComponent level={3}>
                            Resultado
                        </HeaderComponent>
                        <iframe src="example.pdf" className="w-full h-150"></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default IndexPageComponent;