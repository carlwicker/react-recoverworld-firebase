import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IEditFormButtons {
  setAddShowTrackModal: any;
  updateFireStoreReleases: Function;
}

export default function EditFomButtons({
  setAddShowTrackModal,
  updateFireStoreReleases,
}: IEditFormButtons) {
  return (
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
            onClick={() => {
              updateFireStoreReleases();
              setAddShowTrackModal(false);
            }}
          >
            Update Release
          </Button>
        </Link>
      </Col>
    </Row>
  );
}
