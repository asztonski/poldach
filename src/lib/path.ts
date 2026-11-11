/** `trailingSlash: true` – "/sprzedaz/" and "/sprzedaz" are one page: compare without the slash */
export const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path);
