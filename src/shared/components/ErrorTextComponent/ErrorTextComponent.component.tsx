import type { CommonSizes } from "../../types/CommonSizes.type";

interface ErrorTextComponentProps {
    error: string;
    size?: CommonSizes;
}

const sizeClasses: Record<CommonSizes, string> = {
    m: 'text-normal',
    s: 'text-sm',
    xl: 'text-xl',
    xs: 'text-xs',
}

function ErrorTextComponent({error, size = 'xs'}: ErrorTextComponentProps) {
    return ( <span className={`text-error text-lg ${sizeClasses[size]}`}>
        {error}
    </span> );
}

export default ErrorTextComponent;