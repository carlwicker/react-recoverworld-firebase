import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export default function Test() {
  const data = require("./json/importAll.json");

  async function addToFirebase(releaseObj: any) {
    const docRef = await addDoc(collection(db, "releases"), releaseObj);
    console.log("Document written with ID: ", docRef.id);
  }

  useEffect(() => {
    createFirebaseReleaseArrayFromAmpSuiteData();
  }, []);

  function createFirebaseReleaseArrayFromAmpSuiteData() {
    let releaseObj: any = {
      artist: "",
      title: "",
      label: "",
      artwork: "",
      catNum: "",
      trackListing: [],
      releaseDate: 0,
      ampsuiteId: null,
    };

    const releasesArr = data;

    releasesArr.forEach((release: any, index: number) => {
      console.log(release);

      // Create Links Obj
      let retailerLinks = release.retailer_links.retailer_link;
      let linksObj: any = {
        beatport: "",
        spotify: "",
        soundcloud: "",
        itunes: "",
        recoverworld: "",
        youtube: "",
      };

      if (Array.isArray(retailerLinks)) {
        retailerLinks.forEach((link: any) => {
          let url: string = link.link_url;

          if (url.includes("beatport")) {
            linksObj.beatport = url;
          } else if (url.includes("spotify")) {
            linksObj.spotify = url;
          } else if (url.includes("soundcloud")) {
            linksObj.soundcloud = url;
          } else if (url.includes("itunes")) {
            linksObj.itunes = url;
          } else if (url.includes("recoverworld")) {
            linksObj.recoverworld = url;
          } else if (url.includes("youtube")) {
            linksObj.youtube = url;
          }
        });
      }

      // Format to Firebase Data
      let unformattedDate = release.release_date;
      unformattedDate = unformattedDate.split("-");
      let firebaseDateFormatted = new Date(
        unformattedDate[0],
        unformattedDate[1] - 1,
        unformattedDate[2]
      );

      // Set Release Details
      releaseObj.artist = release.artists.artist;
      releaseObj.title = release.title;
      releaseObj.label = release.label;
      releaseObj.artwork = release.covers.cover[1];
      releaseObj.catNum = release.cat_no;
      releaseObj.releaseDate = firebaseDateFormatted.getTime();
      releaseObj.ampsuiteId = release.id;

      // AmpSuite Tracklist is Array...
      const tracks = release.tracks.track;

      if (Array.isArray(tracks)) {
        let formattedTrackArr: any = [];
        tracks.forEach((track: any) => {
          let trackObj = {
            artist: track.artist,
            title: track.title,
            mix: track.mix_name,
            beatport: release.digital_link,
            spotify: linksObj.spotify,
            soundcloud: linksObj.soundcloud,
            youtube: linksObj.youtube,
            recoverworld: linksObj.recoverworld,
            itunes: linksObj.itunes,
          };
          formattedTrackArr.push(trackObj);
        });
        releaseObj.trackListing = formattedTrackArr;
      }

      // Ampsuite Single Track TrackListing Object...
      if (!Array.isArray(tracks)) {
        let track: any = tracks;
        let formattedTrackArr: any = [];

        let trackObj = {
          artist: track.artist,
          title: track.title,
          mix: track.mix_name,
          beatport: release.digital_link,
          spotify: linksObj.spotify,
          soundcloud: linksObj.soundcloud,
          youtube: linksObj.youtube,
          recoverworld: linksObj.recoverworld,
          itunes: linksObj.itunes,
        };
        formattedTrackArr.push(trackObj);
        releaseObj.trackListing = formattedTrackArr;
      }
      console.log(releaseObj);

      // addToFirebase(releaseObj);
    });
  }

  return <div>Hello</div>;
}
