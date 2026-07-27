export function resolveAssetPath(src?: string): string {
  if (!src) {
    return "";
  }

  // External URLs (http://, https://, etc.)
  if (/^(?:[a-z]+:)?\/\//i.test(src)) {
    return src;
  }

  // Remove leading slash if any (e.g. "/brand/logouah.png" -> "brand/logouah.png")
  const cleanPath = src.startsWith("/") ? src.slice(1) : src;

  // In Vite dev server (npm run dev), Vite serves public/ folder directly at root
  if (import.meta.env.DEV) {
    return cleanPath;
  }

  // In production build (static hosting, GitHub Pages, file:// protocol):
  const isInsideDist =
    window.location.pathname.endsWith("/dist/") ||
    window.location.pathname.endsWith("/dist/index.html");

  if (!isInsideDist && !cleanPath.startsWith("dist/")) {
    return `dist/${cleanPath}`;
  }

  return cleanPath;
}
