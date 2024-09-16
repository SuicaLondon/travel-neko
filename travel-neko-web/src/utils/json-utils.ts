export function isJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function tryJsonParse(str: string): any {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
