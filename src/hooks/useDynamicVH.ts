import { useEffect } from "react";

/**
 * useDynamicVH
 * ------------
 * Computes the true visible viewport height (window.innerHeight * 0.01) and
 * registers it as the CSS custom property `--vh` on <html>.
 *
 * Listens to `resize`, `orientationchange` and the VisualViewport API so the
 * mobile browser address-bar collapsing never causes layout jumps.
 * Usage in CSS: height: calc(var(--vh, 1vh) * 100);
 */
export function useDynamicVH(): void {
  useEffect(() => {
    const root = document.documentElement;

    const setVH = (): void => {
      const vh = (window.visualViewport?.height ?? window.innerHeight) * 0.01;
      root.style.setProperty("--vh", `${vh}px`);
    };

    setVH();

    window.addEventListener("resize", setVH, { passive: true });
    window.addEventListener("orientationchange", setVH, { passive: true });
    window.visualViewport?.addEventListener("resize", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
      window.visualViewport?.removeEventListener("resize", setVH);
    };
  }, []);
}

export default useDynamicVH;
