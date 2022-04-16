import IRelease from "../../../interfaces/IRelease";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DigitalReleaseHeader from "./DigitalReleaseHeader";

interface IDigitalReleaseItem {
  release: IRelease;
  updateReleaseList: Function;
}

export default function DigitalReleaseItem({
  release,
  updateReleaseList,
}: IDigitalReleaseItem) {
  async function deleteRelease(releaseId: string) {
    await deleteDoc(doc(db, "releases", releaseId));
    updateReleaseList();
  }

  return (
    <div
      className="mb-2"
      style={{
        display: "flex",
        gap: "5px",
        borderBottom: "1px dashed #555",
      }}
    >
      <DigitalReleaseHeader release={release} deleteRelease={deleteRelease} />
    </div>
  );
}
