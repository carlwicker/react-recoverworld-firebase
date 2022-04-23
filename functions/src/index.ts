import * as functions from "firebase-functions";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const express = require("express");
const app = express();
let xmlDataToJson: any;

const cors = require("cors")({ origin: true });
app.use(cors);

app.get("/importRelease/:id", (req: any, res: any, next: any) => {
  const ampsuiteId: number = req.params.id;

  async function getXML() {
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
  getXML();
});

exports.app = functions.https.onRequest(app);
