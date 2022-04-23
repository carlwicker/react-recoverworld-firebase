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

  function getXML() {
    let jObj: any;
    let url = `https://recoverworld.ampsuite.com/xml/releases?cid=10&id=${ampsuiteId}`;

    axios
      .get(url)
      .then((response) => {
        const xml: any = response.data;

        const parser: any = new XMLParser();
        if (xml) {
          jObj = parser?.parse(xml);
          xmlDataToJson = jObj.releases.release;
        }
      })
      .catch((err) => next(err));
  }
  getXML();

  res.send(xmlDataToJson);
});

exports.app = functions.https.onRequest(app);
