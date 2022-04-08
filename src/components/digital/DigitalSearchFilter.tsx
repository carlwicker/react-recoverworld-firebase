import { Container, Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import IRelease from "../../interfaces/IRelease";

interface IDigitalSearchFilter {
  releases: IRelease[];
  setFilteredReleases: any;
  filteredReleases: IRelease[];
  labelFilteredResults: any;
  setLabelFilteredResults: any;
  setSelectedLabel: any;
  selectedLabel: string;
}

export default function DigitalSearchFilter({
  releases,
  setFilteredReleases,
  filteredReleases,
  labelFilteredResults,
  setLabelFilteredResults,
  selectedLabel,
  setSelectedLabel,
}: IDigitalSearchFilter) {
  const labels = [
    "No Filter...",
    "Discover Records",
    "Discover Dark",
    "EVE Records",
    "Flux Delux",
    "Iconise",
    "Discover Digital",
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSearchTerm("");
  }, [selectedLabel]);

  // Filter Releases by Search Term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredReleases(releases);
    } else {
      const result = releases.filter(
        (release) =>
          release.title.toLocaleLowerCase().includes(searchTerm) ||
          release.artist.toLocaleLowerCase().includes(searchTerm)
      );
      setFilteredReleases(result);
    }
  }, [searchTerm, selectedLabel]);

  // useEffect(() => {
  //   console.log(filteredReleases);
  //   console.log(labelFilteredResults);
  // }, [filteredReleases, labelFilteredResults]);

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
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="releasesSearch">
              <Form.Label>Search Releases</Form.Label>
              <Form.Control
                defaultValue={searchTerm}
                type="text"
                onChange={(e) => {
                  setSearchTerm(e.target.value.toLocaleLowerCase());
                }}
                placeholder="Search..."
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="releasesFilter">
              <Form.Label>Label Filter</Form.Label>
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
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
