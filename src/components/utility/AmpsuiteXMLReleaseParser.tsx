import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Form, Button, Col } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface IAmpsuiteXMLReleaseParser {
  isAdmin: boolean;
}

export default function AmpsuiteXMLReleaseParser({
  isAdmin,
}: IAmpsuiteXMLReleaseParser) {
  const [jsonData, setJsonData] = useState<any>([]);
  const [ampsuiteId, setAmpsuiteId] = useState<string | undefined>();
  const [tracklisting, setTracklisting] = useState<any>([]);
  const [firebaseReleaseObj, setFirebaseReleaseObj] = useState({
    artist: "",
    title: "",
    label: "",
    artwork: "",
    catNum: "",
    trackListing: [],
    releaseDate: 0,
    ampsuiteId: 0,
  });
  const [linksObj, setLinksObj] = useState<any>({});
  const navigate = useNavigate();

  // var importedReleases = require("../../json/importAll.json");

  // Get Ampsuite Release from Google Cloud Functions
  async function getData() {
    await axios
      .get(
        `https://us-central1-recoverworld-d5ab4.cloudfunctions.net/app/importRelease/${ampsuiteId}`
      )
      .then((res) => setJsonData(res?.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // console.log(jsonData);
    // console.log(linksObj);
  }, [linksObj]);

  // useEffect(() => {
  // console.log(firebaseReleaseObj);
  // console.log(tracklisting);
  // }, [firebaseReleaseObj]);

  // useEffect(() => {
  // console.log(importedReleases);
  // }, [importedReleases]);

  // Write converted Release to Firebase
  async function sendToFirebase() {
    const docRef = await addDoc(collection(db, "releases"), firebaseReleaseObj);
    console.log("Document written with ID: ", docRef.id);
  }

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

    // Handle array of links
    if (Array.isArray(jsonData?.retailer_links?.retailer_link)) {
      jsonData?.retailer_links?.retailer_link?.forEach((link: any) => {
        if (link.link_url?.includes("beatport")) {
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

      // Handle One link
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
  }, [jsonData]);

  useEffect(() => {
    // Put single tracklist Object in Array
    if (!Array.isArray(jsonData?.tracks?.track)) {
      setTracklisting([jsonData?.tracks?.track]);
    } else {
      // Or leave as Array
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
      trackListing: [],
      releaseDate: getFormattedData(),
      ampsuiteId: jsonData.id,
    });
  }, [jsonData]);

  useEffect(() => {
    // Build Firestore Tracklisting

    let trackArr: any = [];
    tracklisting?.forEach((track: any) => {
      trackArr.push({
        artist: track?.artist,
        title: track?.title,
        mix: track?.mix_name,
        beatport: linksObj?.beatport,
        spotify: linksObj?.spotify,
        soundcloud: linksObj?.soundcloud,
        youtube: linksObj?.youtube,
        recoverworld: linksObj?.recoverworld,
        itunes: linksObj?.itunes,
      });

      // Build Final Firebase Release inc. Links & Tracklisting
      setFirebaseReleaseObj({
        ...firebaseReleaseObj,
        trackListing: trackArr,
      });
    });
  }, [tracklisting]);

  // Import ALL Releases

  // Import works by using google cloud function endpoint to
  // create a JSON file.  Due to the size of this file it's best saved
  // and then imported to here via a require for further processing below.

  // function processReleases() {
  //   importedReleases.forEach((release: any) => {
  //     setJsonData(release);

  //     setTimeout(() => {}, 5000);

  //     console.log(firebaseReleaseObj);
  //     // sendToFirebase();
  //   });
  // }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      {isAdmin && (
        <>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(ampsuiteId);
              getData();
            }}
          >
            <Row>
              <h2>AmpSuite XML Release Parser</h2>

              <Col>
                <Form.Control
                  type="number"
                  placeholder="Ampsuite Release ID"
                  maxLength={5}
                  onChange={(e: any) => {
                    setAmpsuiteId(e.target.value);
                  }}
                />
              </Col>
              <Col style={{ display: "flex", gap: "10px" }}>
                <Button type="submit">Fetch Release</Button>
                {/* <Button
              onClick={(e) => {
                processReleases();
              }}
              variant="danger"
            >
              Mass Import
            </Button> */}
              </Col>
            </Row>
          </Form>

          <Row style={{ padding: "20px 0" }}>
            {tracklisting[0] !== undefined && (
              <>
                <div>Cat Number: {jsonData?.cat_no}</div>
                <div>Artist: {jsonData?.artists?.artist}</div>
                <div>Title: {jsonData?.title}</div>
                <div>Label: {jsonData?.label}</div>
                <div>Release Date: {jsonData?.release_date}</div>
                <h3 style={{ marginTop: "20px" }}>Tracklisting:</h3>{" "}
              </>
            )}

            {tracklisting?.map((track: any, index: number) => {
              return (
                <div key={index}>
                  {track !== undefined && (
                    <div>
                      {index + 1}: {track?.title} - {track?.artist} (
                      {track?.mix_name})
                    </div>
                  )}
                </div>
              );
            })}
          </Row>
          <Form
            onSubmit={(e) => {
              sendToFirebase();
              navigate("../");
            }}
          >
            <Row>
              <div style={{ marginBottom: "50px" }}>
                <Button
                  variant={tracklisting[0] !== undefined ? "primary" : "danger"}
                  disabled={tracklisting[0] === undefined}
                  type="submit"
                >
                  Import Release
                </Button>
              </div>
            </Row>
          </Form>
        </>
      )}
    </>
  );
}
