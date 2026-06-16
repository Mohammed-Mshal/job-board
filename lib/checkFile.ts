export type CheckFileResult = { error: string } | true;

export function checkFile(
    file: File | null,
    maxSize: number,
    allowedTypes: string[]
): CheckFileResult {
    if (!file) {
        return { error: "File is required" };
    }
    if (file.size > maxSize) {
        return { error: `File size exceeds ${(maxSize / 1024 / 1024).toFixed(1)}MB limit` };
    }
    if (!allowedTypes.includes(file.type)) {
        return { error: `File type "${file.type}" is not supported` };
        
    }
    return true;
}