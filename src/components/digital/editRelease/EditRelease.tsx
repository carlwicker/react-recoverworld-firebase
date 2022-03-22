import { useEffect, useState } from "react";
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
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { BsYoutube } from "react-icons/bs";
import { SiBeatport, SiSoundcloud, SiSpotify } from "react-icons/si";
import EditTrackModal from "../addRelease/EditTrackModal";
import AddTrackModal from "../addRelease/AddTrackModal";

export default function EditRelease() {
  let { releaseId }: any = useParams();

  const [releaseObj, setReleaseObj] = useState<any | {}>({});

  const labels: string[] = [
    "Discover Records",
    "Discover Dark",
    "Eve Records",
    "Flux Delux",
    "Iconise Records",
  ];

  const [tracks, setTracks] = useState<any | []>([]);
  const [showEditTrackModal, setShowEditTrackModal] = useState<boolean>(false);

  useEffect(() => {
    async function getReleaseById() {
      const docRef = doc(db, "releases", releaseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReleaseObj({ ...docSnap.data(), id: docSnap.id });
      } else {
        console.log("No such document!");
      }
    }

    getReleaseById();
  }, []);

  useEffect(() => {
    setTracks(releaseObj?.trackListing);
    console.log(releaseObj);
  }, [releaseObj]);

  function deleteTrackFromTrackListing(index: number) {
    let newArr = tracks
      .slice(0, index)
      .concat(tracks.slice(index + 1, tracks.length));
    setTracks(newArr);
  }

  function hideEditTrackModal() {
    setShowEditTrackModal(false);
  }

  function applyTrackToTracklisting(trackObj: any) {
    setTracks([...tracks, trackObj]);
  }

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
            <Form.Group
              className="mb-3"
              controlId="addReleaseLabel"
              style={{ color: "black" }}
            >
              <Form.Select
                value={releaseObj.label}
                onChange={(e) => {
                  setReleaseObj({ ...releaseObj, label: e.target.value });
                }}
              >
                {labels.map((label: string, index: number) => {
                  return (
                    <option key={index} value={label}>
                      {label}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <InputGroup className="mb-3">
              <InputGroup.Text id="catNum" style={{ width: "130px" }}>
                Cat Number:
              </InputGroup.Text>
              <FormControl
                type="string"
                onChange={(e) => {
                  setReleaseObj({ ...releaseObj, catNum: e.target.value });
                }}
                defaultValue={releaseObj.catNum}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="input-artist" style={{ width: "130px" }}>
                Artist:
              </InputGroup.Text>
              <Form.Control
                type="string"
                onChange={(e) => {
                  setReleaseObj({ ...releaseObj, artist: e.target.value });
                }}
                defaultValue={releaseObj.artist}
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
                  setReleaseObj({ ...releaseObj, title: e.target.value });
                }}
                defaultValue={releaseObj.title}
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
                  setReleaseObj({ ...releaseObj, artwork: e.target.value });
                }}
                defaultValue={releaseObj.artwork}
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
                  onClick={() => setShowEditTrackModal(true)}
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
