import { Modal, Button, Form } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

interface IEditLabelModal {
  modalEditLabelShow: boolean;
  setEditLabelModalShow: any;
  selectedLabel: any;
}

export default function EditLabelModal({
  modalEditLabelShow,
  setEditLabelModalShow,
  selectedLabel,
}: IEditLabelModal) {
  const [label, setLabel] = useState<any>({});

  async function updateLabelNameInFirestore() {
    await setDoc(doc(db, "labels", selectedLabel.id), {
      labelName: label,
    });
  }

  useEffect(() => {
    setLabel(selectedLabel.name);
  }, []);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalEditLabelShow}
      onHide={() => setEditLabelModalShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Label Name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            updateLabelNameInFirestore();
            setEditLabelModalShow(false);
          }}
        >
          <Form.Group className="mb-3" controlId="editLabelForm">
            <Form.Label>Label Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={selectedLabel.name}
              onChange={(e: any) => {
                setLabel(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              The label name needs to be EXACTLY the same as in Ampsuite.
            </Form.Text>
          </Form.Group>
          <Button type="submit">Update Label Name</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
