import { Row, Col, Form, Button, Table } from "react-bootstrap";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import EditLabelModal from "./EditLabelModal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface IAdmin {
  isAdmin: boolean;
}

interface ILabel {
  id: string;
  name: string;
}

export default function Admin({ isAdmin }: IAdmin) {
  const [labels, setLabels] = useState<ILabel[] | []>([]);
  const [modalEditLabelShow, setEditLabelModalShow] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<any>({ name: "", id: "" });

  async function getLabels() {
    const querySnapshot = await getDocs(collection(db, "labels"));

    const q = query(collection(db, "labels"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let labels: any = [];
      querySnapshot.forEach((doc) => {
        labels.push({ id: doc.id, name: doc.data().labelName });
      });
      setLabels(labels);
    });
  }

  useEffect(() => {
    getLabels();
  }, []);

  async function addLabel(labelName: string) {
    const docRef = await addDoc(collection(db, "labels"), { labelName });
    console.log("Document written with ID: ", docRef.id);
  }

  async function deleteLabel(id: string) {
    await deleteDoc(doc(db, "labels", id));
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      {isAdmin && (
        <>
          <EditLabelModal
            modalEditLabelShow={modalEditLabelShow}
            setEditLabelModalShow={setEditLabelModalShow}
            selectedLabel={selectedLabel}
          />

          <Row>
            <h2>Import AmpSuite Release</h2>

            <>
              <Link to="/admin/import">
                <Button>Import Release from AmpSuite</Button>
              </Link>
            </>
          </Row>

          <Row style={{ paddingTop: "30px" }}>
            <h2>Labels</h2>
          </Row>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Label Name</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {labels?.map((label: ILabel, index: number) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle" style={{ width: "100%" }}>
                      {label.name}
                    </td>
                    <td
                      className="align-middle"
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="outline-warning"
                        onClick={() => {
                          setSelectedLabel({ name: label.name, id: label.id });
                          setEditLabelModalShow(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          deleteLabel(label.id);
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

          <Form
            onSubmit={(e: any) => {
              e.preventDefault();
              addLabel(e.target[0].value);
              e.target[0].value = "";
            }}
          >
            <Form.Label>Add Label</Form.Label>
            <Row>
              <Col>
                <Form.Group controlId="addRecordLabel">
                  <Form.Control type="text" placeholder="Label Name" />
                  <Form.Text className="text-muted">
                    The label name needs to be EXACTLY the same as in Ampsuite.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Button type="submit">Add Label</Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </>
  );
}
