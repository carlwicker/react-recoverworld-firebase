import { Form, InputGroup, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Helmet } from "react-helmet-async";

interface IAddForm {
  setRelease: any;
  release: any;
}

export default function AddForm({ setRelease, release }: IAddForm) {
  const [labels, setLabels] = useState<any>([]);

  // Get Labels from Firestore
  async function getLabelsFromFirestore() {
    let labelsArr: any = ["Select A Label..."];
    const querySnapshot = await getDocs(collection(db, "labels"));
    querySnapshot.forEach((doc) => {
      labelsArr.push(doc.data().labelName);
    });
    setLabels(labelsArr);
  }

  useEffect(() => {
    getLabelsFromFirestore();
  }, []);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      <Form.Group
        className="mb-3"
        controlId="editRelease"
        style={{ color: "black" }}
      >
        <Form.Select
          onChange={(e) => {
            setRelease({ ...release, label: e.target.value });
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
            setRelease({ ...release, catNum: e.target.value });
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
          Artwork URL:
        </InputGroup.Text>
        <Form.Control
          type="string"
          placeholder=""
          onChange={(e) => {
            setRelease({ ...release, artwork: e.target.value });
          }}
        />
      </InputGroup>
    </>
  );
}
