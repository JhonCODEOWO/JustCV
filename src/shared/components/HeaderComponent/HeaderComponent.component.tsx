import type { JSX } from "react";

interface HeaderComponentProps {
    level: 1 | 2 | 3 | 4;
    children: React.ReactNode,
    className?: string;
}

function HeaderComponent({level, children, className}: HeaderComponentProps) {
    const Tag = (`h${level}`) as keyof JSX.IntrinsicElements;

    const styles: Record<1 | 2 | 3 | 4, string> = {
        1: 'text-5xl',
        2: 'text-4xl',
        3: 'text-3xl',
        4: 'text-2xl'
    };

    const styleClasses: string = `font-bold ${className ?? ''} ${styles[level]}`;
    return ( 
        <Tag className={styleClasses}>
            {children}
        </Tag>
     );
}

export default HeaderComponent;