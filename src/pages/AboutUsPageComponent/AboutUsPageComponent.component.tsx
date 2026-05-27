import HeaderComponent from "../../shared/components/HeaderComponent/HeaderComponent.component";
import HeroComponent from "../../shared/components/HeroComponent/HeroComponent.component";

function AboutUsComponentPage() {
    return (
        <>
            <HeroComponent url_img="/aboutus.jpg" heroContent="¡Crear y generar CVs nunca había sido tan fácil!" title="JustCv"/>

            <div className="mx-auto">
                <section className="bg-base-300 rounded p-10 text-center h-[50dvh] flex items-center justify-center">
                    <p className="text-xl font-light">JustCV es una herramienta gratuita que tiene como misión permitirle a sus usuarios generar de manera rápida y sencilla formatos estándar de Curriculum Vitae.</p>
                </section>
                <section className="bg-base-200 rounded h-screen flex items-center justify-center">
                    <div>
                        <HeaderComponent level={2} className="mb-10 text-center">
                            Nuestros valores
                        </HeaderComponent>
                        <div className="flex flex-col items-center md:flex-row md:items-stretch gap-3 w-300 mx-auto">
                            <div className="bg-base-300 p-3 w-100">
                                <HeaderComponent level={4}>
                                    Practicidad
                                </HeaderComponent>
                                <p>
                                    Ofrecer un servicio que siempre busca permitir a sus usuarios realizar sus actividades de la forma más práctica posible.
                                </p>
                            </div>
                            <div className="bg-base-300 p-3 w-100">
                                <HeaderComponent level={4}>
                                    Calidad
                                </HeaderComponent>
                                <p>
                                    La meta final siempre será alcanzar resultados de alta calidad para los usuarios ofreciendo siempre resultados que permitan aprovechar nuestra herramienta lo máximo posible.
                                </p>
                            </div>
                            <div className="bg-base-300 p-3 w-100">
                                <HeaderComponent level={4}>
                                    Simplicidad
                                </HeaderComponent>
                                <p>
                                    La simplicidad es parte fundamental en cada uno de los proyectos, pues con ella buscamos permitirle a nuestros usuarios utilizar e interactuar con las herramientas de una manera simple pero funcional y fácil de comprender.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="bg-base-300 rounded p-10">
                            <HeaderComponent level={2} className="text-center">
                                ¿Quieres conocer más?
                            </HeaderComponent>
                            <p className="m-5 text-xl">Así como JustCv existen otros proyectos de mi autoría que podrían interesarte.</p>
                            <div className="flex gap-x-4 w-1/2 justify-center">
                                <img src="/me.png" alt="" className="rounded-full" width={100} height={100}/>
                                <div className="flex flex-col gap-y-3">
                                    <a href="https://github.com/JhonCODEOWO" className="flex gap-x-1.5 text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                                        </svg>
                                        JhonCODEOWO
                                    </a>
                                    <a href="https://imjhondev.netlify.app/" className="flex gap-x-1.5 text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="currentColor" d="M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" />
                                        </svg>
                                        im.jhon.dev
                                    </a>
                                </div>
                            </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AboutUsComponentPage;