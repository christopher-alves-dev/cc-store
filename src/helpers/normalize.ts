export const normalizeFileName = (file: File): File => {
  const blob = file.slice(0, file.size, file.type);
  const normalizedFileName = normalize(file.name);

  const renamedFile = new File([blob], normalizedFileName, { type: file.type });
  return renamedFile;
};

export const normalize = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^\w-.]/g, "");
