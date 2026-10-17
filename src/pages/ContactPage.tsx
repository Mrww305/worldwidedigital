import PageHeader from "../components/PageHeader";
import Contact from "../components/Contact";
import { routeMeta } from "../seo/routes";

const meta = routeMeta("/contact");

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} title={meta.h1} intro={meta.intro} />
      <Contact />
    </>
  );
}
