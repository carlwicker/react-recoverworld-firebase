import { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function AmpsuiteXMLReleaseParser() {
  const [xmlData, setXMLData] = useState<any>();
  const [jsonData, setJsonData] = useState<any>([]);
  const [ampsuiteId, setAmpsuiteId] = useState<number | undefined>();
  const [tracklisting, setTracklisting] = useState<any>([]);
  const [firebaseReleaseObj, setFirebaseReleaseObj] = useState({
    artist: "",
    title: "",
    label: "",
    artwork: "",
    catNum: "",
    tracklisting: [],
    releaseDate: 0,
    ampsuiteId: 0,
  });
  const [linksObj, setLinksObj] = useState<any>({});

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

  // Parse XML => JSON
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
    // Build Firebase Retailer Array
    let linkTempObj = {
      beatport: "",
      itunes: "",
      spotify: "",
      soundcloud: "",
      youtube: "",
      recoverworld: "",
    };

    if (Array.isArray(jsonData?.retailer_links?.retailer_link)) {
      jsonData?.retailer_links?.retailer_link?.forEach((link: any) => {
        if (link?.link_url?.includes("beatport")) {
          linkTempObj.beatport = link.link_url;
        } else if (link.link_url.includes("spotify")) {
          linkTempObj.spotify = link.link_url;
        } else if (link.link_url.includes("soundcloud")) {
          linkTempObj.soundcloud = link.link_url;
        } else if (link.link_url.includes("youtube")) {
          linkTempObj.youtube = link.link_url;
        } else if (link.link_url.includes("recoverworld")) {
          linkTempObj.recoverworld = link.link_url;
        } else if (link?.link_url?.includes("itunes")) {
          linkTempObj.itunes = link.link_url;
        }
      });
      setLinksObj(linkTempObj);
    } else if (!Array.isArray(jsonData?.retailer_links?.retailer_link)) {
      let link = jsonData?.retailer_links?.retailer_link?.link_url;
      if (link?.includes("beatport")) {
        linkTempObj.beatport = link;
      } else if (link?.includes("spotify")) {
        linkTempObj.spotify = link;
      } else if (link?.includes("soundcloud")) {
        linkTempObj.soundcloud = link;
      } else if (link?.includes("youtube")) {
        linkTempObj.youtube = link;
      } else if (link?.includes("recoverworld")) {
        linkTempObj.recoverworld = link;
      } else if (link?.includes("itunes")) {
        linkTempObj.itunes = link;
      }
      setLinksObj(linkTempObj);
    }
  }, [jsonData.id]);

  useEffect(() => {
    // Put single tracklist Object in Array
    if (!Array.isArray(jsonData?.tracks?.track)) {
      setTracklisting([jsonData?.tracks?.track]);
    } else {
      setTracklisting(jsonData?.tracks?.track);
    }

    // Convert Date to Firebase Date Format
    function getFormattedData() {
      if (ampsuiteId !== undefined) {
        let unformattedDate = jsonData?.release_date;
        unformattedDate = unformattedDate?.split("-");
        let firebaseDateFormatted = new Date(
          unformattedDate[0],
          unformattedDate[1] - 1,
          unformattedDate[2]
        );
        return firebaseDateFormatted?.getTime();
      } else {
        return 0;
      }
    }

    // Firebase Release Obj
    setFirebaseReleaseObj({
      artist: jsonData?.artists?.artist,
      title: jsonData?.title,
      label: jsonData?.label,
      artwork: jsonData?.covers?.cover[1],
      catNum: jsonData?.cat_no,
      tracklisting: [],
      releaseDate: getFormattedData(),
      ampsuiteId: jsonData.id,
    });
  }, [jsonData]);

  useEffect(() => {
    console.log(linksObj);
  }, [linksObj]);

  useEffect(() => {
    // console.log(firebaseReleaseObj);
  }, [firebaseReleaseObj]);

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

        <Alert variant="danger" style={{ textAlign: "left" }}>
          CORS Must be enabled in your browers.
        </Alert>

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
              <Button
                variant={tracklisting[0] !== undefined ? "primary" : "danger"}
                disabled={tracklisting[0] === undefined}
                type="submit"
              >
                Import Release
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
