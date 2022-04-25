import { Form } from "react-bootstrap";

interface IDigitalSearchFilter {
  setSelectedLabel: any;
  labels: any;
}

export default function DigitalSearchFilter({
  setSelectedLabel,
  labels,
}: IDigitalSearchFilter) {
  return (
    <Form>
      <Form.Group controlId="selectLabel">
        <Form.Select
          onChange={(e: any) => {
            setSelectedLabel(e.target.value);
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
    </Form>
  );
}
