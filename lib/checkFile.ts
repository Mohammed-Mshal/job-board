export type CheckFileResult =
  | {
      code: string;
      params?: Record<string, string | number>;
    }
  | true;

export function checkFile(
  file: File | null,
  maxSize: number,
  allowedTypes: string[]
): CheckFileResult {
  if (!file) {
    return { code: "fileRequired" };
  }
  if (file.size > maxSize) {
    return {
      code: "fileSizeExceeds",
      params: { maxSize: (maxSize / 1024 / 1024).toFixed(1) },
    };
  }
  if (!allowedTypes.includes(file.type)) {
    return { code: "fileTypeNotSupported" };
  }
  return true;
}
