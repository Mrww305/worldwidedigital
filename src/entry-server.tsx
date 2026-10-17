import { renderToString } from "react-dom/server";
import App from "./App";
import { ROUTES, routeMeta, SITE_ORIGIN } from "./seo/routes";

/* Used only by scripts/prerender.mjs at build time.
   `prerender` switches MotionConfig to reduced motion so every section
   renders visible (no opacity:0 entrance styles) in the static HTML. */
export function render(path: string): string {
  return renderToString(<App initialPath={path} prerender />);
}

export { ROUTES, routeMeta, SITE_ORIGIN };
