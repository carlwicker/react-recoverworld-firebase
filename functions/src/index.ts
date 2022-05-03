import * as functions from "firebase-functions";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const express = require("express");
const app = express();
let xmlDataToJson: any;

const cors = require("cors")({ origin: true });
app.use(cors);

// Get Single Release XML from Ampsuite
app.get("/importRelease/:id", (req: any, res: any, next: any) => {
  const ampsuiteId: number = req.params.id;

  async function getReleaseXML() {
    let jObj: any;
    let url = `https://recoverworld.ampsuite.com/xml/releases?cid=10&id=${ampsuiteId}`;

    await axios
      .get(url)
      .then((response) => {
        const xml: any = response.data;

        const parser: any = new XMLParser();
        if (xml) {
          jObj = parser?.parse(xml);
          xmlDataToJson = jObj.releases.release;
        }
      })
      .then(() => res.send(xmlDataToJson))
      .catch((err) => next(err));
  }
  getReleaseXML();
});

// Get ALL Release XML from Ampsuite
app.get("/importAll", (req: any, res: any, next: any) => {
  async function getReleaseXML() {
    let jObj: any;
    let url =
      "https://recoverworld.ampsuite.com/xml/releases?cid=10&s_date=1900-00-00&e_date=2999-01-01&order=release_date&dir=desc&limit=10";

    await axios
      .get(url)
      .then((response) => {
        const xml: any = response.data;

        const parser: any = new XMLParser();
        if (xml) {
          jObj = parser?.parse(xml);
          xmlDataToJson = jObj.releases.release;
        }
      })
      .then(() => res.send(xmlDataToJson))
      .catch((err) => next(err));
  }
  getReleaseXML();
});

exports.app = functions.https.onRequest(app);
