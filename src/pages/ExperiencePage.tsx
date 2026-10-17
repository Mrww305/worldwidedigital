import PageHeader from "../components/PageHeader";
import Experience from "../components/Experience";
import Ecosystem from "../components/Ecosystem";
import { routeMeta } from "../seo/routes";

const meta = routeMeta("/experience");

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} title={meta.h1} intro={meta.intro} />
      <Experience />
      <Ecosystem />
    </>
  );
}
