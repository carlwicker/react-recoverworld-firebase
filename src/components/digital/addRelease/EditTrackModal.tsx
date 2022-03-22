import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function EditTrackModal({
  showEditTrackModal,
  hideEditTrackModal,
  track,
}: any) {
  const [trackObj, setTrackObj] = useState<any>({});

  useEffect(() => {
    setTrackObj(track);
  }, [track]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
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
        <Form.Group className="mb-3 " controlId="addTrackArtist">
          <Form.Label>Track Artist:</Form.Label>
          <Form.Control
            type="string"
            value={trackObj.artist}
            onChange={(e) => {
              setTrackObj({ ...trackObj, artist: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackTitle">
          <Form.Label>Track Title:</Form.Label>
          <Form.Control
            type="string"
            value={trackObj.title}
            onChange={(e) => {
              setTrackObj({ ...trackObj, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackMix">
          <Form.Label>Track Mix:</Form.Label>
          <Form.Control
            type="string"
            value={trackObj.mix}
            onChange={(e) => {
              setTrackObj({ ...trackObj, mix: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackBeatport">
          <Form.Label>Track Beatport Link:</Form.Label>
          <Form.Control
            type="url"
            value={trackObj.beatport}
            onChange={(e) => {
              setTrackObj({ ...trackObj, beatport: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackYouTube">
          <Form.Label>Track YouTube Link:</Form.Label>
          <Form.Control
            type="url"
            value={trackObj.youtube}
            onChange={(e) => {
              setTrackObj({ ...trackObj, youtube: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackSpotify">
          <Form.Label>Track Spotify Link:</Form.Label>
          <Form.Control
            type="url"
            value={trackObj.spotify}
            onChange={(e) => {
              setTrackObj({ ...trackObj, spotify: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackSoundCloud">
          <Form.Label>Track SoundCloud Link:</Form.Label>
          <Form.Control
            type="url"
            value={trackObj.soundcloud}
            onChange={(e) => {
              setTrackObj({ ...trackObj, spotify: e.target.value });
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-5"
          onClick={() => {
            hideEditTrackModal();
          }}
        >
          Update Track
        </Button>
      </Modal.Body>
    </Modal>
  );
}
