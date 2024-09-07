export function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
  });
}
