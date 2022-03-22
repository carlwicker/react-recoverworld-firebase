import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Form,
  Button,
  Col,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud, SiSpotify } from "react-icons/si";
import AddTrackModal from "./AddTrackModal";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import EditTrackModal from "./EditTrackModal";

import { collection, addDoc } from "firebase/firestore";

export default function AddRelease() {
  const [release, setRelease] = useState<any>();
  const [tracks, setTracks] = useState<any>([]);

  const [showAddTrackModal, setAddShowTrackModal] = useState<any>(false);
  const [showEditTrackModal, setEditShowTrackModal] = useState<any>(false);
  const [trackToEdit, setTrackToEdit] = useState<any>({});

  useEffect(() => {
    // console.log(release);
    // console.log(tracks);
    // console.log(modalTrackShow);
  }, [release, showAddTrackModal, tracks]);

  function deleteTrackFromTrackListing(index: number) {
    let newArr = tracks
      .slice(0, index)
      .concat(tracks.slice(index + 1, tracks.length));
    console.log(newArr);
    setTracks(newArr);
  }

  function applyTrackToTracklisting(trackObj: any) {
    setTracks([...tracks, trackObj]);
  }

  function hideAddTrackModal() {
    setAddShowTrackModal(false);
  }

  function hideEditTrackModal() {
    setEditShowTrackModal(false);
  }

  async function addToFireStoreReleases() {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "releases"), {
      ...release,
      trackListing: tracks,
    });
    console.log(docRef, docRef.id);
  }

  return (
    <>
      <AddTrackModal
        showAddTrackModal={showAddTrackModal}
        hideTrackModal={hideAddTrackModal}
        applyTrackToTracklisting={applyTrackToTracklisting}
      />

      <Container>
        <Row style={{ textAlign: "left" }}>
          <h1>Add Release</h1>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Group className="mb-3" controlId="addReleaseLabel">
              <Form.Select
                aria-label="Select a label..."
                className="mb-3"
                onChange={(e) => {
                  setRelease({ ...release, label: e.target.value });
                  console.log(release);
                }}
              >
                <option>Select a label...</option>
                <option value="Discover Records">Discover Records</option>
                <option value="Discover Dark">Discover Dark</option>
                <option value="Eve Records">Eve Records</option>
                <option value="Flux Delux">Flux Delux</option>
                <option value="Iconise Records">Iconise Records</option>
              </Form.Select>
            </Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text id="catNum" style={{ width: "130px" }}>
                Cat Number:
              </InputGroup.Text>
              <FormControl
                type="string"
                onChange={(e) => {
                  setRelease({ ...release, catNum: e.target.value });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-artist" style={{ width: "130px" }}>
                Artist:
              </InputGroup.Text>
              <Form.Control
                type="string"
                onChange={(e) => {
                  setRelease({ ...release, artist: e.target.value });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-title" style={{ width: "130px" }}>
                Title:
              </InputGroup.Text>
              <Form.Control
                type="string"
                placeholder=""
                onChange={(e) => {
                  setRelease({ ...release, title: e.target.value });
                }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-image" style={{ width: "130px" }}>
                Artwork URL:
              </InputGroup.Text>
              <Form.Control
                type="string"
                placeholder=""
                onChange={(e) => {
                  setRelease({ ...release, artwork: e.target.value });
                }}
              />
            </InputGroup>

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
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{track.title}</td>
                      <td>{track.artist}</td>
                      <td>{track.mix}</td>
                      <td>
                        {track.beatport !== "" ? (
                          <SiBeatport style={{ marginRight: "10px" }} />
                        ) : (
                          ""
                        )}
                        {track.youtube !== "" ? (
                          <BsYoutube style={{ marginRight: "10px" }} />
                        ) : (
                          ""
                        )}
                        {track.soundcloud !== "" ? (
                          <SiSoundcloud style={{ marginRight: "10px" }} />
                        ) : (
                          ""
                        )}
                        {track.spotify !== "" ? <SiSpotify /> : ""}
                      </td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            setEditShowTrackModal(true);
                            setTrackToEdit(track);
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
                      <EditTrackModal
                        showEditTrackModal={showEditTrackModal}
                        hideEditTrackModal={hideEditTrackModal}
                        track={trackToEdit}
                      />
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
                  onClick={() => setAddShowTrackModal(true)}
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
