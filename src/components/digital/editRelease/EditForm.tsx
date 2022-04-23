import { Form, InputGroup, FormControl } from "react-bootstrap";
import IRelease from "../../../interfaces/IRelease";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";

interface IEditForm {
  releaseObj: IRelease;
  setReleaseObj: any;
}

export default function EditForm({ releaseObj, setReleaseObj }: IEditForm) {
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
      <Form.Group
        className="mb-3"
        controlId="editRelease"
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
    </>
  );
}
