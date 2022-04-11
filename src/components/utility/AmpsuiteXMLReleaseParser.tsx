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
      setTracklisting([jsonData?.tracks?.track]);
    } else {
      setTracklisting(jsonData?.tracks?.track);
    }
    // console.log(jsonData);
  }, [jsonData]);

  useEffect(() => {
    console.log(tracklisting);
  }, [tracklisting]);

  return (
    <Container>
      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
        }}
      >
        <Row style={{ textAlign: "left" }}>
          <h2>AmpSuite XML Release Parser</h2>
        </Row>
        <Row>
          <div>
            <Form.Control
              style={{ margin: "20px 0" }}
              type="number"
              placeholder="Ampsuite Release ID"
              maxLength={5}
              onChange={(e: any) => {
                setAmpsuiteId(e.target.value);
              }}
            />
          </div>
        </Row>
        <Row style={{ textAlign: "left", padding: "20px 0" }}>
          {tracklisting[0] !== undefined ? (
            <>
              <div>Cat Number: {jsonData?.cat_no}</div>
              <div>Artist: {jsonData?.artists?.artist}</div>
              <div>Title: {jsonData?.title}</div>
              <div>Label: {jsonData?.label}</div>
              <div>Release Date: {jsonData?.release_date}</div>
              <h3 style={{ marginTop: "20px" }}>Tracklisting:</h3>{" "}
            </>
          ) : (
            ""
          )}

          {tracklisting?.map((track: any, index: number) => {
            console.log(track);
            return (
              <div key={index}>
                {track !== undefined ? (
                  <div>
                    {index + 1}: {track?.title} - {track?.artist} (
                    {track?.mix_name})
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </Row>
        <Row>
          <Col
            md={6}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ marginBottom: "50px" }}>
              <Button variant="primary" type="submit">
                Import Release
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
