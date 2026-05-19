/**
 *  Executes a download operation.
 * @param blob The file to download.
 */
export function downloadBlobFile(blob: Blob, fileName: string = ''): void{
    const headString = `${Date.now().toString()}`;
    const finalString = `${headString}-${fileName}`;
    const format = blob.type.split('/')[1];

    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `${finalString}.${format}`;
    a.click();

    URL.revokeObjectURL(url);
}