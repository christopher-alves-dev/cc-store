export const normalizeFileName = (file: File): File => {
  const blob = file.slice(0, file.size, file.type);
  const normalizedFileName = file.name
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^\w-.]/g, "");

  const renamedFile = new File([blob], normalizedFileName, { type: file.type });
  return renamedFile;
};
