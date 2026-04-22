import HeaderComponent from "../HeaderComponent/HeaderComponent.component";

type position = 'center' | 'start' | 'end';

interface HeaderWithContentComponentProps {
    level: 2 | 3 | 4;
    children?: React.ReactNode;
    title: string;
    content: string;
    className?: string;
    positionText?: position;
}

const positionClasses: Record<position, string> = {
    'center': 'justify-center text-center items-center',
    'start': 'justify-start text-start',
    'end': 'justify-end text-end',
}

function HeaderWithContentComponent({level, children, content, title, className, positionText = 'start'}: HeaderWithContentComponentProps) {
    const globalClasses = 'w-full';
    return (
        <div className={ `${children != null? 'flex items-center gap-x-3': ''} ${className ?? ''} ${globalClasses}`}>
            <div className={`flex flex-col ${positionClasses[positionText]} flex-1`}>
                <HeaderComponent level={level}>
                    {title}
                </HeaderComponent>
                <p>
                    {content}
                </p>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default HeaderWithContentComponent;