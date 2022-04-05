import { useState, useEffect } from "react";

export default function Test() {
  const data = require("./json/recoverworld.json");
  // console.log(data.releases.release[15]);

  const [release, setRelease] = useState<any>({});
  const [trackListing, setTrackListing] = useState<any>([]);

  const [beatportUrl, setBeatportUrl] = useState<string>("");
  const [spotifyUrl, setSpotifyUrl] = useState<string>("");
  const [soundcloudUrl, setSoundcloudUrl] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [itunesUrl, setItunesUrl] = useState<string>("");

  useEffect(() => {
    trackListing.forEach((track: any) => {
      // console.log(track);
      setTrackListing([{ ...track, soundcloud: soundcloudUrl }]);
    });
  }, [beatportUrl, spotifyUrl, soundcloudUrl, youtubeUrl, itunesUrl]);

  useEffect(() => {}, [beatportUrl]);

  useEffect(() => {
    // console.log(trackListing);
    console.log(release);
  }, [release, trackListing]);

  useEffect(() => {
    setRelease({ ...release, trackListing: trackListing });
  }, [trackListing]);

  function createFirebaseObjectFromAmpSuiteData() {
    const releases = data.releases.release;
    releases.map((release: any, index: number) => {
      // Convert Date to TimeStamp
      let unformattedDate = release.release_date;
      unformattedDate = unformattedDate.split("-");
      let newDate = new Date(
        unformattedDate[0],
        unformattedDate[1] - 1,
        unformattedDate[2]
      );

      setRelease({
        artist: release.artists.artist["#cdata-section"].slice(1, -1),
        title: release.title["#cdata-section"].slice(1, -1),
        label: release.label["#cdata-section"].slice(1, -1),
        artwork: release.covers.cover[3]["#cdata-section"].slice(1, -1),
        catNum: release.cat_no,
        trackListing: [],
        releaseDate: newDate.getTime(),
        ampsuiteReleaseId: release.id,
      });

      // Create Tracklisting Array
      function getTracks() {
        if (release.tracks.track.length > 1) {
          release.tracks.track.map((track: any, index: number) => {
            // console.log(track);
          });
          // }
        } else {
          setTrackListing([
            {
              artist: release.tracks.track.artist["#cdata-section"].slice(
                1,
                -1
              ),
              title: release.tracks.track.title["#cdata-section"].slice(1, -1),
              mix: release.tracks.track.mix_name["#cdata-section"].slice(1, -1),
              beatport: release.digital_link["#cdata-section"].slice(1, -1),
              spotify: "",
              soundcloud: "",
              youtube: "",
            },
          ]);

          // Send to firebase here!!!
        }
      }
      getTracks();

      // Retailer Links
      function getLinks() {
        const retailLinks = release.retailer_links["retailer_link"];

        if (Array.isArray(retailLinks)) {
          retailLinks.forEach((linkObj: any) => {
            const url = linkObj.link_url["#cdata-section"];

            if (url.includes("soundcloud")) {
              setSoundcloudUrl(url);
            } else if (url.includes("beatport")) {
              setBeatportUrl(url);
            } else if (url.includes("spotify")) {
              setSpotifyUrl(url);
            } else if (url.includes("itunes")) {
              setItunesUrl(url);
            } else if (url.includes("youtube")) {
              setYoutubeUrl(url);
            }
          });
        }
      }
      getLinks();
    });
  }

  useEffect(() => {
    createFirebaseObjectFromAmpSuiteData();
  }, []);

  return <div>Hello</div>;
}
