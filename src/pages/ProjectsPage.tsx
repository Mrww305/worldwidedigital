import PageHeader from "../components/PageHeader";
import ProjectsGrid from "../components/ProjectsGrid";
import { routeMeta } from "../seo/routes";

const meta = routeMeta("/projects");

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} title={meta.h1} intro={meta.intro} />
      <ProjectsGrid />
    </>
  );
}
