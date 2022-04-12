import { Card } from "react-bootstrap";
import IRelease from "../../interfaces/IRelease";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import FeaturedItemHeader from "./FeaturedItemHeader";

interface IDigitalReleaseItem {
  release: IRelease;
  getFeaturedReleases: Function;
}

export default function DigitalReleaseItem({
  release,
  getFeaturedReleases,
}: IDigitalReleaseItem) {
  async function deleteRelease(releaseId: string) {
    await deleteDoc(doc(db, "featured", releaseId));
  }

  return (
    <div
      className="mb-2"
      style={{
        display: "flex",
        gap: "5px",
        // backgroundColor: "#333",
        borderRadius: "15px 0px 15px 0px",
        // boxShadow: "0px 0px 15px -2px rgba(0,0,0,0.57)",
        borderBottom: "1px dashed #555",
      }}
    >
      <Card.Body>
        <FeaturedItemHeader
          release={release}
          getFeaturedReleases={getFeaturedReleases}
        />
      </Card.Body>
    </div>
  );
}
