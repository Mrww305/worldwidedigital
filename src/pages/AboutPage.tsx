import PageHeader from "../components/PageHeader";
import Profile from "../components/Profile";
import Competencies from "../components/Competencies";
import { routeMeta } from "../seo/routes";

const meta = routeMeta("/about");

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} title={meta.h1} intro={meta.intro} />
      <Profile />
      <Competencies />
    </>
  );
}
