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
    "Select a label...",
    "Discover Records",
    "Discover Dark",
    "EVE Records",
    "Flux Delux",
    "Flux Delux Digital",
    "Iconise",
    "Discover Digital",
    "Recover",
  ];

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
    <Form>
      <Row>
        <Col className="md-3" syle={{}}>
          <div>
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
        {/* <Col>
          <Form.Group className="mb-3" controlId="releasesSearch">
            <Form.Label>Search Releases</Form.Label>
            <Form.Control
              defaultValue={searchTerm}
              type="text"
              onChange={(e) => {
                setSearchTerm(e.target.value.toLocaleLowerCase());
              }}
              placeholder="Search..."
              disabled
            />
          </Form.Group>
        </Col> */}
      </Row>
      {/* <Row>
        <div>
          <DropdownButton
            as={ButtonGroup}
            title="Select a Label..."
            id="bg-nested-dropdown"
            onChange={(e: any) => {
              setSelectedLabel(e.target.value);
              setLabelFilteredResults(filteredReleases);
            }}
          >
            {labels.map((label: string, index: number) => {
              return (
                <Dropdown.Item key={index} eventKey={index} value={label}>
                  {label}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </Row> */}
    </Form>
  );
}
