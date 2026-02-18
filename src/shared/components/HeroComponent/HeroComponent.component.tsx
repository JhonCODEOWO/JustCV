export interface HeroComponentProps {
    title: string;
    url_img?: string;
    heroContent: string;
    height?: number;
    onStartNowClick: () => void;
}

function HeroComponent({heroContent, title, url_img = '', height = 100, onStartNowClick}: HeroComponentProps) {
    const styles: React.CSSProperties = {
        backgroundImage: `url(${url_img})`,
        height: `${height}dvh`,
    }
    return (
        <div className="hero bg-base-200" style={styles}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold">{title}</h1>
                <p className="py-6">
                    {heroContent}
                </p>
                <button className="btn btn-primary" onClick={onStartNowClick}>Empieza ahora</button>
                </div>
            </div>
        </div>
    );
}

export default HeroComponent;