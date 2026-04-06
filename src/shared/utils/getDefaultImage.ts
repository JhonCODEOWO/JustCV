export async function getDefaultImage(): Promise<Blob>{
    const response = await fetch('/userImageDefault.jpg')
    return await response.blob();
}