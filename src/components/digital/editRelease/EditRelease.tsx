import {
  Container,
  Row,
  Form,
  InputGroup,
  FormControl,
  Table,
  Col,
  Button,
} from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

export default function EditRelease() {
  let { releaseId }: any = useParams();
  return (
    <>
      <Container>
        <Row style={{ textAlign: "left" }}>
          <h1>Edit Release</h1>

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
                  //   setRelease({ ...release, label: e.target.value });
                  //   console.log(release);
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
                // onChange={(e) => {
                //   setRelease({ ...release, catNum: e.target.value });
                // }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-artist" style={{ width: "130px" }}>
                Artist:
              </InputGroup.Text>
              <Form.Control
                type="string"
                // onChange={(e) => {
                //   setRelease({ ...release, artist: e.target.value });
                // }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-title" style={{ width: "130px" }}>
                Title:
              </InputGroup.Text>
              <Form.Control
                type="string"
                placeholder=""
                // onChange={(e) => {
                //   setRelease({ ...release, title: e.target.value });
                // }}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-image" style={{ width: "130px" }}>
                Artwork URL:
              </InputGroup.Text>
              <Form.Control
                type="string"
                placeholder=""
                // onChange={(e) => {
                //   setRelease({ ...release, artwork: e.target.value });
                // }}
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
                {/* {tracks?.map((track: any, index: number) => {
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
                })} */}
              </tbody>
            </Table>
            {/* Add Track  */}
            <Row>
              <Col style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="primary"
                  //   onClick={() => setShowTrackModal(true)}
                  className="my-5"
                >
                  Add Track
                </Button>

                <Link to="/digital">
                  <Button
                    variant="danger"
                    className="my-5"
                    // onClick={() => addToFireStoreReleases()}
                  >
                    Update Release
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
