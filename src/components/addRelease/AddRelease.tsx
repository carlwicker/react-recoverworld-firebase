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
import { BsYoutube, BsSpotify } from "react-icons/bs";
import { SiBeatport, SiSoundcloud, SiSpotify } from "react-icons/si";
import AddTrackModal from "./AddTrackModal";

export default function AddRelease() {
  const [release, setRelease] = useState<any>();
  const [tracks, setTracks] = useState<any>([]);

  const [showTrackModal, setShowTrackModal] = useState<any>(false);

  useEffect(() => {
    console.log(release);
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
              <Form.Select
                aria-label="Select a label..."
                className="mb-3"
                onChange={(e) => {
                  setRelease({ ...release, catNum: e.target.value });
                  console.log(release);
                }}
              >
                <option disabled>Select a label...</option>
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
                  setRelease({ ...release, label: e.target.value });
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
                Image URL:
              </InputGroup.Text>
              <Form.Control
                type="string"
                placeholder=""
                onChange={(e) => {
                  setRelease({ ...release, img: e.target.value });
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
