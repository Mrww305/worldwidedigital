"use client";

import { PROJECTS } from "../data/projects";
import { Reveal } from "./Section";

export default function ProjectsGrid() {
  return (
    <section aria-labelledby="projects-h" className="relative z-10 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 id="projects-h" className="sr-only">
          Live projects and deployments
        </h2>

        <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <li key={project.id} className="bg-black">
              <Reveal className="h-full" delay={index * 0.04}>
                <article className="flex h-full flex-col gap-4 p-7 transition-colors duration-500 hover:bg-[#080b0c] md:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[9.5px] tracking-[0.26em]">
                    <span className="text-signal">{project.tag}</span>
                    <span className="border border-line px-2 py-1 text-faint">{project.status}</span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-ink md:text-[1.7rem]">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-signal"
                    >
                      {project.name}
                    </a>
                  </h3>

                  <p className="font-body text-[13.5px] font-light leading-[1.8] text-dim">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 font-mono text-[10px] tracking-[0.22em]">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-dim transition-colors hover:text-signal"
                    >
                      OPEN <span aria-hidden="true">↗</span>
                      <span className="sr-only">— {project.name}</span>
                    </a>
                    {project.repo && project.repo !== project.url ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-faint transition-colors hover:text-signal"
                      >
                        SOURCE <span aria-hidden="true">↗</span>
                        <span className="sr-only">— {project.name} repository on GitHub</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
