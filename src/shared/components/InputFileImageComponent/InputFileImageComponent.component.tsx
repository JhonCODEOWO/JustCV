import { useEffect, useRef, useState, type UIEvent } from "react";
import { get, type FieldErrors, type FieldValues, type Path, type UseFormRegister, type UseFormSetError, type UseFormWatch } from "react-hook-form";

interface InputFileImageComponentProps<T extends FieldValues> {
    name: Path<T>;
    register: UseFormRegister<T>,
    errors: FieldErrors<T>,
    label?: string,
    watch: UseFormWatch<T>
    multipleFiles?: boolean;
    /** The max size valid for this field (it doesn't validate it represents only a visual alert) */
    maxSize: number;
}

interface ScrollValues {
    /**
     * Total width of the element considering overflow.
     */
    totalScroll: number, 
    /**
     * The px already scrolled from left side.
     */
    omittedArea: number, 

    /**
     * The client width of the element (the content that user can see)
     */
    viewport: number
}

/**
 * Get size scroll values of a element.
 * @param element The element to retrieve its scroll values.
 * @returns A object with key/value scroll values and client size view.
 */
function getScrollValues(element: HTMLDivElement): ScrollValues{
    //Get size values in px.
    const totalScroll = element.scrollWidth;
    const omittedArea = element.scrollLeft;
    const viewport = element.clientWidth;


    return {totalScroll, omittedArea, viewport}
}

/** 
 * Check limits reached based on the actual client view.
 * @param element The element to analice right and left limits.
 * @returns A boolean values, `true` means the limit was already reached.
 * @notes This function only uses the internal sizes to evaluate every limit.
*/
function elementLimits(element: HTMLDivElement): {leftLimitReached: boolean, rightLimitReached: boolean} {
    const {omittedArea, totalScroll, viewport} = getScrollValues(element);

    return {
        rightLimitReached: viewport + omittedArea >= totalScroll,
        leftLimitReached: omittedArea <= 0.3
    }
}

function InputFileImageComponent<T extends FieldValues>(
    {
        multipleFiles = false,
        errors, 
        label = 'Seleccionar imagen', 
        name, 
        register, 
        watch,
        maxSize,
    }: InputFileImageComponentProps<T>) {

    const carousel = useRef<HTMLDivElement | null>(null);
    const SCROLL_PX = 100;
    const [carouselNavigationStates, setCarouselNavigationStates] = useState<{right: boolean, left: boolean}>({
        left: true,
        right: true,
    });

    const [hover, setHover] = useState<boolean>(false);
    /** Handle the input file Field Values */
    const imagesSelected: FileList | undefined = watch(name);

    /** state that handle a array of Object Urls */
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    /**
     * Effect that handle navigation states every time the imagesSelected and carouse HTML DOM Ref changes
     */
    useEffect(() => {
        if(!carousel.current){
            setCarouselNavigationStates({left: true, right: true});
            return;
        } 

        const element = carousel.current;
        const {viewport, totalScroll} = getScrollValues(element);
            
        if(totalScroll > viewport) setCarouselNavigationStates({left: false, right: false})
    }, [carousel, imagesSelected])

    /**
     * Effect that apply every Object Url from the FileList and apply them on previewUrls state.
     */
    useEffect(() => {
        if (!imagesSelected) {
            setPreviewUrls([]);
            return;
        }

        const files = Array.from(imagesSelected);
        const urls = files.map(file => URL.createObjectURL(file));

        setPreviewUrls(urls);

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagesSelected]);

    const scrollLeft = () => {
        if(!carousel.current) return;
        
        const {omittedArea} = getScrollValues(carousel.current)
        
        const goTo = omittedArea - SCROLL_PX;
        const canGoLeft = goTo < 0.5;

        //Go next px based on the actual viewport plus omitted area.
        carousel.current?.scroll({left: (canGoLeft)? 0: goTo, behavior: 'smooth'});
    }

    const scrollRight = () => {
        if(!carousel.current) return;

        const {omittedArea, totalScroll, viewport} = getScrollValues(carousel.current);
        
        const targetScrollLeft = omittedArea + SCROLL_PX;
        const targetVisibleEnd = targetScrollLeft + viewport;
        const canGoNext = (targetVisibleEnd) <= totalScroll;
        const overflowOffset = !canGoNext? targetVisibleEnd - totalScroll: 0;

        //Go next px based on the actual viewport plus omitted area.
        carousel.current?.scroll({left: targetScrollLeft - overflowOffset, behavior: 'smooth'});
    }

    const handleCarouselScroll = (e: UIEvent<HTMLDivElement>) => {
        const {leftLimitReached, rightLimitReached} = elementLimits(e.currentTarget);
        
        setCarouselNavigationStates({
            left: leftLimitReached,
            right: rightLimitReached
        })
    }

    const error = get(errors, name);

    return (
        <div className="block w-50">
            <label className="fieldset-legend text-xs">{label}</label>
            <fieldset className="fieldset relative rounded h-50 w-full overflow-hidden border border-base-200" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {imagesSelected && imagesSelected.length> 0
                    && 
                    <img src={previewUrls[0]} alt="" className="absolute h-full w-full"/>
                }
                <div className={`absolute h-full w-full transition-colors ${hover? 'bg-base-200': ''}`}></div>
                    <legend className={`flex justify-center items-center absolute h-full w-full transition-opacity ${hover? 'opacity-100': 'opacity-0'}`}>Seleccionar imagen(es)</legend>
                    <input type="file" {...register(name)} multiple={multipleFiles} className="opacity-0 h-full absolute w-full"/>
            </fieldset>
            {
                (imagesSelected && imagesSelected.length > 0 && multipleFiles) &&
                <aside className="flex mt-1 relative items-center">
                    <button className="rounded-full bg-base-100 absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer" disabled={carouselNavigationStates.left} onClick={scrollLeft}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"/></svg>
                    </button>
                    <div className="flex gap-x-3 overflow-hidden" onScroll={(e) => handleCarouselScroll(e)} ref={carousel}>
                        {previewUrls.slice(1).map((url, index) => <img key={index} src={url} className="rounded w-15 h-15" alt=""/>)}
                    </div>
                    <button disabled={carouselNavigationStates.right} className="rounded-full bg-base-100 absolute right-0 cursor-pointer" onClick={scrollRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"/></svg>
                    </button>
                </aside>
            }
            <section className="flex flex-col">
                {error && <label className="text-error text-xs">{error.message}</label>}
                <label className="label text-xs text-info">Tamaño máximo permitido {maxSize} MB</label>
            </section>
        </div>
    );
}

export default InputFileImageComponent;