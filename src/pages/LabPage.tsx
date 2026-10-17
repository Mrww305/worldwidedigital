import PageHeader from "../components/PageHeader";
import PoCLab from "../components/PoCLab";
import { routeMeta } from "../seo/routes";

const meta = routeMeta("/lab");

export default function LabPage() {
  return (
    <>
      <PageHeader eyebrow={meta.eyebrow} title={meta.h1} intro={meta.intro} />
      <PoCLab />
    </>
  );
}
