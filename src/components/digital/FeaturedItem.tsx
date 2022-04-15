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
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        borderRadius: "15px 0px 15px 0px",
        borderBottom: "1px dashed #555",
      }}
    >
      <FeaturedItemHeader
        release={release}
        getFeaturedReleases={getFeaturedReleases}
      />
    </div>
  );
}
