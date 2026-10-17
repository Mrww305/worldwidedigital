import { Link } from "../router";
import { ROUTES, routeHref } from "../seo/routes";

export default function NotFoundPage() {
  return (
    <section className="relative z-10 px-5 pb-24 pt-40 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-[10px] tracking-[0.34em] text-signal">[ 404 ]</p>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-ink">
          Signal lost
        </h1>
        <p className="mt-6 max-w-xl font-body text-[15px] font-light leading-[1.85] text-dim">
          This coordinate does not exist on the Deep Space CV. Return to the home
          page or jump straight to a section.
        </p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10.5px] tracking-[0.24em]">
          {ROUTES.map((route) => (
            <li key={route.path}>
              <Link to={routeHref(route)} className="text-dim transition-colors hover:text-signal">
                {route.navNumber} {route.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
