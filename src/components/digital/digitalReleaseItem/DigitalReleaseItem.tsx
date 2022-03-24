import { Card, ListGroup } from "react-bootstrap";
import IRelease from "../../../interfaces/IRelease";
import ITrack from "../../../interfaces/ITrack";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DigitalTrack from "./DigitalTrack";
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
    <Card className="mb-2">
      <Card.Body>
        <DigitalReleaseHeader release={release} deleteRelease={deleteRelease} />

        <Card>
          <ListGroup as="ol" numbered>
            {release.trackListing.map((track: ITrack, index: number) => {
              return <DigitalTrack track={track} key={index} />;
            })}
          </ListGroup>
        </Card>
      </Card.Body>
    </Card>
  );
}
