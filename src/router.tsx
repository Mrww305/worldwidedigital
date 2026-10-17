"use client";

/* Minimal history-API router.
   The site only has a handful of static routes, so a full routing library
   would be more dependency than it is worth. Every route is prerendered to
   its own HTML file at build time; this router only handles client-side
   navigation between them. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { normalizePath } from "./lib/path";

type RouterValue = { path: string; navigate: (to: string) => void };

const RouterContext = createContext<RouterValue>({
  path: "/",
  navigate: () => {},
});

export function RouterProvider({
  initialPath = "/",
  children,
}: {
  initialPath?: string;
  children: ReactNode;
}) {
  const [path, setPath] = useState(() => {
    if (typeof window !== "undefined") return normalizePath(window.location.pathname);
    return normalizePath(initialPath);
  });

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === "undefined") return;
    const next = normalizePath(to);
    if (normalizePath(window.location.pathname) === next) return;
    window.history.pushState({}, "", to);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/* Internal links go through pushState; external / mailto / tel / hash links
   keep their native behaviour. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const isExternal = /^(https?:|mailto:|tel:|#)/.test(to);

  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (isExternal || event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
