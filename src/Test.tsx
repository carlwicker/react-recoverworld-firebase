import { useState, useEffect } from "react";

export default function Test() {
  const data = require("./json/recoverworld.json");

  const [releases, setReleases] = useState<any>([]);
  let newReleaseList: any[] = [];

  useEffect(() => {
    createFirebaseObjectFromAmpSuiteData();
  }, []);

  function createFirebaseObjectFromAmpSuiteData() {
    const releasesArr = data.releases.release;

    releasesArr.forEach((release: any, index: number) => {
      let unformattedDate = release.release_date;
      unformattedDate = unformattedDate.split("-");
      let firebaseDateFormatted = new Date(
        unformattedDate[0],
        unformattedDate[1] - 1,
        unformattedDate[2]
      );

      let releaseObj = {
        artist: release.artists.artist["#cdata-section"].slice(1, -1),
        title: release.title["#cdata-section"].slice(1, -1),
        label: release.label["#cdata-section"].slice(1, -1),
        artwork: release.covers.cover[3]["#cdata-section"].slice(1, -1),
        catNum: release.cat_no,
        trackListing: [],
        releaseDate: firebaseDateFormatted.getTime(),
        ampsuiteReleaseId: release.id,
      };

      setReleases([...releases, releaseObj]);

      const tracks: [] = release.tracks.track;
      let trackListingArr: any = [];
      let retailerLinks = release.retailer_links.retailer_link;
      console.log(retailerLinks);

      let trackObj = {
        artist: "",
        title: "",
        mix: "",
        beatport: release.digital_link["#cdata-section"].slice(1, -1),
        spotify: "",
        soundcloud: "",
        youtube: "",
        itunes: "",
        recoverworld: "",
      };

      if (Array.isArray(tracks)) {
        if (Array.isArray(retailerLinks)) {
          retailerLinks.map((linkObj: any) => {
            let url = linkObj.link_url["#cdata-section"];
            console.log(url);

            if (url.includes("beatport")) {
              trackObj.beatport = url;
            } else if (url.includes("spotify")) {
              trackObj.spotify = url;
            } else if (url.includes("soundcloud")) {
              trackObj.soundcloud = url;
            } else if (url.includes("youtube")) {
              trackObj.youtube = url;
            } else if (url.includes("recoverworld")) {
              trackObj.recoverworld = url;
            } else if (url.includes("itunes")) {
              trackObj.itunes = url;
            }

            // console.log(trackObj);
          });
          newReleaseList.push(trackObj);
        }

        tracks.forEach((track: any) => {
          trackObj.artist = track.artist["#cdata-section"].slice(1, -1);
          trackObj.title = track.title["#cdata-section"].slice(1, -1);
          trackObj.mix = track.mix_name["#cdata-section"].slice(1, -1);
          trackObj.beatport = release.digital_link["#cdata-section"].slice(
            1,
            -1
          );

          trackListingArr.push(trackObj);
        });
      }
      console.log(newReleaseList);
      console.log(trackListingArr);
      releaseObj.trackListing = trackListingArr;
      console.log(releaseObj);
      // FIRESTORE IT!
    });
  }

  return <div>Hello</div>;
}
