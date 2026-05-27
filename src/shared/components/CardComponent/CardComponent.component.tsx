interface CardComponentProps {
    title: string;
    content: string;
    className?: string;
}

function CardComponent({children, title, content, className}: React.PropsWithChildren<CardComponentProps>) {
    return (
        <div className={`card text-primary-content ${className}`}>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default CardComponent;