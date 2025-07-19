export const s3Upload = async (file: File, presignedUrl: string): Promise<string> => {
    const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type,
        },
        body: file,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    // Return the URL of the uploaded file
    return presignedUrl.split('?')[0]; // Assuming the URL is the base URL without query parameters
}