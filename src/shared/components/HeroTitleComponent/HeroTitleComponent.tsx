import HeaderWithContentComponent, { type position } from "../HeaderWithContentComponent/HeaderWithContentComponent";

interface HeroTitleComponentProps {
    title: string;
    children?: React.ReactNode;
    content: string;
    textPosition?: position;
    imgSrc?: string;
}

function HeroTitleComponent({children, title, content = "", textPosition = 'start', imgSrc=""}: HeroTitleComponentProps) {
    return ( 
        <div className="relative h-30">
            {imgSrc.trim().length > 0 
                &&
                <div className="absolute h-full overflow-hidden z-0">
                    <img src={imgSrc} className="object-center w-full"/>
                </div> 
            }
            <HeaderWithContentComponent 
                level={1} 
                title={title} 
                content={content} 
                positionText={textPosition} 
                className="bg-transparent absolute z-10 p-5"
            >
                {children}
            </HeaderWithContentComponent>
        </div>
     );
}

export default HeroTitleComponent;