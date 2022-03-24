import { Form, InputGroup, FormControl } from "react-bootstrap";
import IRelease from "../../../interfaces/IRelease";

interface IAddForm {
  setRelease: any;
  release: any;
}

export default function AddForm({ setRelease, release }: IAddForm) {
  const labels = [
    "Select a label...",
    "Discover Records",
    "Discover Dark",
    "Eve Records",
    "Flux Delux",
    "Iconise Records",
  ];

  return (
    <>
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
