import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddTrackModal({
  modalTrackShow,
  hideTrackModal,
  applyTrackToTracklisting,
}: any) {
  const [trackObj, setTrackObj] = useState<any>({});

  useEffect(() => {
    console.log(modalTrackShow);
  }, [modalTrackShow]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalTrackShow}
      // show={modalTrackShow}
      onHide={() => hideTrackModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          Add Track
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 " controlId="addTrackArtist">
          <Form.Label>Track Artist:</Form.Label>
          <Form.Control
            type="string"
            placeholder=""
            onChange={(e) => {
              setTrackObj({ ...trackObj, artist: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackTitle">
          <Form.Label>Track Title:</Form.Label>
          <Form.Control
            type="string"
            placeholder=""
            onChange={(e) => {
              setTrackObj({ ...trackObj, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackMix">
          <Form.Label>Track Mix:</Form.Label>
          <Form.Control
            type="string"
            defaultValue="Original Mix"
            onChange={(e) => {
              setTrackObj({ ...trackObj, mix: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackBeatport">
          <Form.Label>Track Beatport Link:</Form.Label>
          <Form.Control
            type="url"
            defaultValue="http://www.beatport.com/"
            onChange={(e) => {
              setTrackObj({ ...trackObj, beatport: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackYouTube">
          <Form.Label>Track YouTube Link:</Form.Label>
          <Form.Control
            type="url"
            defaultValue="http://www.youtube.com/"
            onChange={(e) => {
              setTrackObj({ ...trackObj, youtube: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackSpotify">
          <Form.Label>Track Spotify Link:</Form.Label>
          <Form.Control
            type="url"
            defaultValue="http://www.spotify.com/"
            onChange={(e) => {
              setTrackObj({ ...trackObj, spotify: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="addTrackSoundCloud">
          <Form.Label>Track SoundCloud Link:</Form.Label>
          <Form.Control
            type="url"
            defaultValue="http://www.soundcloud.com/"
            onChange={(e) => {
              setTrackObj({ ...trackObj, spotify: e.target.value });
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="my-5"
          onClick={() => {
            applyTrackToTracklisting(trackObj);
          }}
        >
          Apply Track To Release
        </Button>
      </Modal.Body>
    </Modal>
  );
}
