import {
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import IRelease from "../../interfaces/IRelease";

interface IDigitalSearchFilter {
  releases: IRelease[];
  setFilteredReleases: any;
  filteredReleases: IRelease[];
  setLabelFilteredResults: any;
  setSelectedLabel: any;
  selectedLabel: string;
  labels: any;
}

export default function DigitalSearchFilter({
  releases,
  setFilteredReleases,
  filteredReleases,
  setLabelFilteredResults,
  selectedLabel,
  setSelectedLabel,
  labels,
}: IDigitalSearchFilter) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSearchTerm("");
  }, [selectedLabel]);

  // Filter Releases by Search Term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredReleases(releases);
    } else if (searchTerm.length >= 2) {
      const result = releases.filter(
        (release) =>
          release.title.toLocaleLowerCase().includes(searchTerm) ||
          release.artist.toLocaleLowerCase().includes(searchTerm)
      );
      setFilteredReleases(result);
    }
  }, [searchTerm, selectedLabel]);

  // Label Filter
  useEffect(() => {
    function labelFilter() {
      if (selectedLabel === "No Filter...") {
        setLabelFilteredResults(filteredReleases);
      } else {
        const result = filteredReleases?.filter((release) =>
          release.label
            .toLocaleLowerCase()
            .includes(selectedLabel.toLocaleLowerCase())
        );
        setLabelFilteredResults(result);
      }
    }
    labelFilter();
  }, [selectedLabel, filteredReleases, searchTerm]);

  return (
    <Form>
      <Row>
        <Col className="md-3" syle={{}}>
          <div style={{ opacity: "1" }}>
            <Form.Group className="mb-3" controlId="releasesFilter">
              <Form.Select
                onChange={(e: any) => {
                  setSelectedLabel(e.target.value);
                  setLabelFilteredResults(filteredReleases);
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
          </div>
        </Col>
      </Row>
    </Form>
  );
}
