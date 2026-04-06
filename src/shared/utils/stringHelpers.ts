interface CutStringOpts {
    startIndex?: number;
    endIndex?: number;
}

export function cutString(value: string, opts: CutStringOpts = {startIndex: 0, endIndex: value.length - 10}): string{
    const {endIndex = value.length, startIndex = 0} = opts;
    const safeString = value.trim();
    if(value.length < endIndex) return value;
    let newString = '';
    for (let index = startIndex; index < endIndex; index++) {
        newString += safeString[index];
    }
    return `${newString}...`
}