import { useEffect, useState } from "react";
import { Container, Row, Form, Button, Col, Table } from "react-bootstrap";
import { BsYoutube, BsSpotify } from "react-icons/bs";
import { SiBeatport, SiSoundcloud, SiSpotify } from "react-icons/si";
import AddTrackModal from "./AddTrackModal";

export default function AddRelease() {
  const [release, setRelease] = useState<any>();
  const [tracks, setTracks] = useState<any>([]);

  const [showTrackModal, setShowTrackModal] = useState<any>(false);

  useEffect(() => {
    // console.log(release);
    // console.log(tracks);
    // console.log(modalTrackShow);
  }, [release, showTrackModal]);

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

  function hideTrackModal() {
    setShowTrackModal(false);
  }

  return (
    <>
      <AddTrackModal
        modalTrackShow={showTrackModal}
        hideTrackModal={hideTrackModal}
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
              <Form.Label>Label:</Form.Label>
              <Form.Select
                aria-label="Select a label..."
                className="mb-3"
                onChange={(e) => {
                  setRelease({ ...release, label: e.target.value });
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
            <Form.Group className="mb-3 " controlId="addReleaseCatalogNumber">
              <Form.Label>Catalog Number:</Form.Label>
              <Form.Control
                type="string"
                placeholder=""
                onChange={(e) => {
                  setRelease({ ...release, catNum: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addReleaseArtist">
              <Form.Label>Artist:</Form.Label>
              <Form.Control
                type="string"
                placeholder=""
                onChange={(e) => {
                  setRelease({ ...release, artist: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="addReleaseTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="string"
                placeholder=""
                onChange={(e) => {
                  setRelease({ ...release, title: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="addReleaseImageLink">
              <Form.Label>Link to Release Image:</Form.Label>
              <Form.Control
                type="string"
                placeholder="https://"
                onChange={(e) => {
                  setRelease({ ...release, img: e.target.value });
                }}
              />
            </Form.Group>
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
                        <SiBeatport style={{ marginRight: "10px" }} />
                        <BsYoutube style={{ marginRight: "10px" }} />
                        <SiSoundcloud style={{ marginRight: "10px" }} />
                        <SiSpotify />
                      </td>
                      <td>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          style={{ marginRight: "10px" }}
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
              <Col>
                <Button
                  variant="primary"
                  onClick={() => setShowTrackModal(true)}
                  className="my-5"
                >
                  Add Track
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}
