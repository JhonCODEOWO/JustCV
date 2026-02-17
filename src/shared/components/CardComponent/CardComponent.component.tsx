interface CardComponentProps {
    title: string;
    content: string;
}

function CardComponent({children, title, content}: React.PropsWithChildren<CardComponentProps>) {
    return (
        <div className="card bg-primary text-primary-content w-96">
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