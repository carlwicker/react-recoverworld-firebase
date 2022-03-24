import { useState } from "react";
import { Container, Row, Form, Button, Col, Table } from "react-bootstrap";
import { BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud, SiSpotify } from "react-icons/si";
import AddTrackModal from "./AddTrackModal";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import EditTrackModal from "./EditTrackModal";
import { collection, addDoc } from "firebase/firestore";
import ITrack from "../../../interfaces/ITrack";
import IRelease from "../../../interfaces/IRelease";
import AddForm from "./AddForm";

export default function AddRelease() {
  const [release, setRelease] = useState<IRelease | {}>({});
  const [tracks, setTracks] = useState<ITrack[] | []>([]);
  const [showAddTrackModal, setAddShowTrackModal] = useState<boolean>(false);
  const [showEditTrackModal, setEditShowTrackModal] = useState<any>(false);
  const [trackIndex, setTrackIndex] = useState<Number>();

  // Actions
  function deleteTrackFromTrackListing(index: number) {
    let newArr = tracks
      .slice(0, index)
      .concat(tracks.slice(index + 1, tracks.length));
    console.log(newArr);
    setTracks(newArr);
  }

  function applyTrackToTracklisting(trackObj: ITrack) {
    setTracks([...tracks, trackObj]);
  }

  async function applyEditToTracklisting(trackObj: any, trackIndex: number) {
    let newTracksArr: any[] = [];
    console.log(trackIndex);

    tracks.forEach((track: any, index: number) => {
      if (index === trackIndex) {
        newTracksArr.push(trackObj);
      } else newTracksArr.push(track);
    });
    setTracks(newTracksArr);
  }

  // Modal Controllers
  function hideAddTrackModal() {
    setAddShowTrackModal(false);
  }

  function hideEditTrackModal() {
    setEditShowTrackModal(false);
  }

  // Add Release to Firestore
  async function addToFireStoreReleases() {
    const docRef = await addDoc(collection(db, "releases"), {
      ...release,
      trackListing: tracks,
    });
    console.log(docRef, docRef.id);
  }

  return (
    <>
      {/* Add / Edit Modals */}
      <AddTrackModal
        showAddTrackModal={showAddTrackModal}
        hideTrackModal={hideAddTrackModal}
        applyTrackToTracklisting={applyTrackToTracklisting}
      />

      <EditTrackModal
        showEditTrackModal={showEditTrackModal}
        hideEditTrackModal={hideEditTrackModal}
        applyEditToTracklisting={applyEditToTracklisting}
        tracks={tracks}
        trackIndex={trackIndex}
      />

      {/* Main Page */}
      <Container>
        <Row style={{ textAlign: "left" }}>
          <h1>Add Release</h1>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* Track Details Form */}
            <AddForm setRelease={setRelease} release={release} />

            {/* Tracklisting Table */}
            <Table striped bordered hover variant="dark" className="mt-5">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Mix</th>
                  <th>Social</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                {tracks?.map((track: any, index: number) => {
                  let trackIndex = index;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{track?.title}</td>
                      <td>{track?.artist}</td>
                      <td>{track?.mix}</td>
                      <td>
                        {track?.beatport !== "" ? (
                          <SiBeatport style={{ marginRight: "10px" }} />
                        ) : (
                          ""
                        )}
                        {track?.youtube !== "" ? (
                          <BsYoutube style={{ marginRight: "10px" }} />
                        ) : (
                          ""
                        )}
                        {track?.soundcloud !== "" ? (
                          <SiSoundcloud style={{ marginRight: "10px" }} />
                        ) : (
                          ""
                        )}
                        {track?.spotify !== "" ? <SiSpotify /> : ""}
                      </td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            setEditShowTrackModal(true);
                            setTrackIndex(trackIndex);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            deleteTrackFromTrackListing(index);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* Add Track  */}
            <Row>
              <Col style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="primary"
                  onClick={() => {
                    setAddShowTrackModal(true);
                  }}
                  className="my-5"
                >
                  Add Track
                </Button>

                <Link to="/digital">
                  <Button
                    variant="danger"
                    className="my-5"
                    onClick={() => addToFireStoreReleases()}
                  >
                    Submit Release
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}
