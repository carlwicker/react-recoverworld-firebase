import { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { json } from "stream/consumers";
import ITrack from "../../interfaces/ITrack";

export default function AmpsuiteXMLReleaseParser() {
  const [xmlData, setXMLData] = useState<any>();
  const [jsonData, setJsonData] = useState<any>([]);
  const [ampsuiteId, setAmpsuiteId] = useState<number>();
  const [tracklisting, setTracklisting] = useState<any>([]);

  // Get Ampsuite XML by AmpSuite Id
  useEffect(() => {
    axios
      .get(
        `https://recoverworld.ampsuite.com/xml/releases?cid=10&id=${ampsuiteId}`,
        {}
      )
      .then(function (response) {
        setXMLData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [ampsuiteId]);

  // Parse XML => Set JSON
  useEffect(() => {
    async function getAmpsuiteRelease() {
      const parser: any = new XMLParser();
      if (xmlData && jsonData !== []) {
        let jObj: any = parser?.parse(xmlData);
        setJsonData(jObj.releases.release);
      }
    }
    getAmpsuiteRelease();
  }, [xmlData]);

  useEffect(() => {
    // Check if Object or Array
    if (!Array.isArray(jsonData?.tracks?.track)) {
      console.log([jsonData?.tracks?.track]);
    } else {
      console.log([jsonData?.tracks?.track]);
    }
  }, [jsonData]);

  const [tracklistArr, setTracklistArr] = useState<ITrack[] | []>([]);

  useEffect(() => {
    // console.log(tracklistArr);
  }, [tracklistArr]);

  return (
    <Container>
      <Row style={{ textAlign: "left" }}>
        <h2>XML AmpSuite Release Parser</h2>
      </Row>
      <Row style={{ textAlign: "left", padding: "20px 0" }}>
        <div>Artist: {jsonData?.artists?.artist}</div>
        <div>Title: {jsonData?.title}</div>
        <div>Label: {jsonData?.label}</div>
        <div>Release Date: {jsonData?.release_date}</div>
      </Row>
      <Row>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          <Col
            md={6}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Form.Control
              type="number"
              placeholder="Ampsuite Release ID"
              maxLength={5}
              onChange={(e: any) => {
                setAmpsuiteId(e.target.value);
              }}
            />
            <div>
              <Button variant="primary" type="submit">
                Import Release
              </Button>
            </div>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}
