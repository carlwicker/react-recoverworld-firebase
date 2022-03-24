import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditTrackModal({
  showEditTrackModal,
  hideEditTrackModal,
  applyEditToTracklisting,
  tracks,
  trackIndex,
}: any) {
  const [trackObj, setTrackObj] = useState<any | {}>({});

  useEffect(() => {
    if (trackIndex !== undefined && tracks !== []) {
      setTrackObj(tracks[trackIndex]);
    }
  }, [tracks, trackIndex]);

  return (
    <Modal
      size="lg"
      centered
      show={showEditTrackModal}
      onHide={() => hideEditTrackModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          Edit Track
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group className="mb-3 " controlId="addTrackTitle">
            <Form.Label>Track Title:</Form.Label>
            <Form.Control
              type="text"
              value={trackObj?.title || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, title: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="addTrackArtist">
            <Form.Label>Track Artist:</Form.Label>
            <Form.Control
              type="text"
              value={trackObj?.artist || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, artist: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="addTrackMix">
            <Form.Label>Track Mix:</Form.Label>
            <Form.Control
              type="text"
              value={trackObj?.mix || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, mix: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="addTrackBeatport">
            <Form.Label>Track Beatport Link:</Form.Label>
            <Form.Control
              type="url"
              value={trackObj?.beatport || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, beatport: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="addTrackYouTube">
            <Form.Label>Track YouTube Link:</Form.Label>
            <Form.Control
              type="url"
              value={trackObj?.youtube || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, youtube: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="addTrackSpotify">
            <Form.Label>Track Spotify Link:</Form.Label>
            <Form.Control
              type="url"
              value={trackObj?.spotify || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, spotify: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="addTrackSoundCloud">
            <Form.Label>Track SoundCloud Link:</Form.Label>
            <Form.Control
              type="url"
              value={trackObj?.soundcloud || ""}
              onChange={(e) => {
                setTrackObj({ ...trackObj, soundcloud: e.target.value });
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="mt-5"
            onClick={() => {
              applyEditToTracklisting(trackObj, trackIndex);
              hideEditTrackModal();
            }}
          >
            Update Track
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
