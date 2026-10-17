/* Normalises a URL pathname so that "/about", "/about/" and "/about?x=1"
   all resolve to the same route key. Kept dependency-free so both the
   client router and the build-time prerenderer can use it. */

export function normalizePath(raw: string): string {
  if (!raw) return "/";
  let path = raw.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}
