import { useNavigate } from "react-router-dom";
import CardComponent from "../../shared/components/CardComponent/CardComponent.component";
import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";
import HeroComponent from "../../shared/components/HeroComponent/HeroComponent.component";
import header from "../../assets/background-main-hero.jpg"
import FooterComponent from "../../shared/components/FooterComponent/FooterComponent.component";

function IndexPageComponent() {
    const navigator = useNavigate();

    function handleStartNowClick(){
        navigator('/home');
    }

    return (
        <div>
            <HeroComponent 
                title="¡Solo CVealizalo!" 
                heroContent="Con JustCV olvídate de investigar, diseñar, arrastrar elementos y todas las tareas pesadas de crear un CV con formatos específicos, solo coloca tu información y listo"
                url_img={header}
                onStartNowClick={handleStartNowClick}
            />

            <section className="py-16 px-6 flex flex-col gap-y-20 items-center justify-center h-dvh">
                <HeaderComponent level={2} className="text-center">
                    <p>¿Porqué deberías utilizar JustCV?</p>
                </HeaderComponent>
                <div className="flex flex-col gap-4 md:grid md:grid-cols-3 mt-3 w-full">
                    <CardComponent 
                        title="Practicidad" 
                        content="Tu solo preocúpate por colocar tus datos lo demás lo hacemos nosotros"
                        className="bg-primary"
                    />
                    <CardComponent 
                        title="Formatos actuales" 
                        content="Genera CV en cualquier tipo de formato popular actual."
                        className="bg-primary"
                    />
                    <CardComponent 
                        title="Es gratis" 
                        content="Utilizar este generador no tiene ningún costo, a menos que decidas cooperar para que el dev tome un café por supuesto ;)"
                        className="bg-primary"
                    />
                </div>
            </section>
            <section className="py-20 px-6 bg-base-200">
                <HeaderComponent level={2} className="text-center mb-10">
                    ¿Como funciona?
                </HeaderComponent>
                <div className="flex flex-col md:items-stretch md:flex-row items-center justify-center">
                    <div className="w-73 bg-base-300 p-5 rounded">
                        <HeaderComponent level={4}>
                            Ingresa tu información
                        </HeaderComponent>
                        <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="none" stroke="currentColor" strokeWidth="2" d="m11.996 8.336l3.497 3.498zm5.54-.54a.994.994 0 0 1-.004 1.416l-7.451 7.451L6 17.83l1.166-4.08l7.451-7.452a.997.997 0 0 1 1.416-.005z" />
                                </svg>
                        </div>
                        <p className="mt-4">Si, literalmente solo añade la información de tu perfil profesional y guarda la información.</p>
                    </div>
                    <div className="w-73 flex h-7 md:h-auto justify-center items-center">
                        <div className="w-2.5 md:w-full bg-secondary h-full md:h-4"></div>
                    </div>
                    <div className="w-73 bg-base-300 p-5 rounded">
                            <HeaderComponent level={4}>
                                Elige la foto, el formato e idioma.
                            </HeaderComponent>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <g fill="none" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h9m4 0h3m-9 8h9M4 16h3" />
                                        <circle cx="9" cy="16" r="2" />
                                        <circle cx="15" cy="8" r="2" />
                                    </g>
                                </svg>
                            </div>
                            <p className="mt-4">Desde tus CV guardados selecciona los parámetros correspondientes y confirma tu operación. </p>
                    </div>
                    <div className="w-73 flex h-7 md:h-auto justify-center items-center">
                        <div className="w-2.5 md:w-full bg-secondary h-full md:h-4"></div>
                    </div>
                    <div className="w-73 bg-base-300 p-5 rounded">
                        <HeaderComponent level={4}>
                                Guarda el PDF generado
                        </HeaderComponent>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="currentColor" d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z" />
                            </svg>
                        </div>
                        <p className="mt-4">Si, así de sencillo, una vez que hayas enviado tu foto el formato y el idioma te daremos un PDF listo, además la información puedes guardarla para re-editarla si lo necesitas.</p>
                    </div>
                </div>
            </section>
            <FooterComponent/>
        </div>
    );
}

export default IndexPageComponent;