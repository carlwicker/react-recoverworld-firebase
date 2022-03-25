import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IAddFormButtons {
  setAddShowTrackModal: any;
  addToFireStoreReleases: Function;
}

export default function AddFormButtons({
  setAddShowTrackModal,
  addToFireStoreReleases,
}: IAddFormButtons) {
  return (
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
  );
}
