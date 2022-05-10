import { useEffect, useState } from "react";
import { Row, Form } from "react-bootstrap";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import EditTrackModal from "../addRelease/EditTrackModal";
import AddTrackModal from "../addRelease/AddTrackModal";
import ITrack from "../../../interfaces/ITrack";
import TrackList from "./TrackList";
import EditForm from "./EditForm";
import EditFomButtons from "./EditFomButtons";

interface IEditRelease {
  isAdmin: boolean;
}

export default function EditRelease({ isAdmin }: IEditRelease) {
  let { releaseId }: any = useParams();
  const [releaseObj, setReleaseObj] = useState<any | {}>({});

  const labels: string[] = [
    "Discover Records",
    "Discover Dark",
    "Eve Records",
    "Flux Delux",
    "Iconise Records",
  ];

  const [tracks, setTracks] = useState<ITrack[] | []>([]);
  const [showAddTrackModal, setAddShowTrackModal] = useState<boolean>(false);
  const [showEditTrackModal, setEditShowTrackModal] = useState<any>(false);
  const [trackIndex, setTrackIndex] = useState<Number | undefined>(undefined);

  // Actions
  function deleteTrackFromTrackListing(index: number) {
    let newArr: ITrack[] = tracks
      .slice(0, index)
      .concat(tracks.slice(index + 1, tracks.length));
    setTracks(newArr);
  }

  function applyTrackToTracklisting(trackObj: ITrack) {
    setTracks([...tracks, trackObj]);
  }

  async function applyEditToTracklisting(trackObj: any, trackIndex: number) {
    let newTracksArr: any[] = [];

    tracks.forEach((track: any, index: number) => {
      if (index === trackIndex) {
        newTracksArr.push(trackObj);
      } else newTracksArr.push(track);
    });
    setTracks(newTracksArr);
  }

  // Modal Controllers
  function hideAddTrackModal() {
    setAddShowTrackModal(false);
  }

  function hideEditTrackModal() {
    setEditShowTrackModal(false);
  }

  // Get Release form Firebase.
  useEffect(() => {
    async function getReleaseById() {
      const docRef = doc(db, "releases", releaseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReleaseObj({ ...docSnap.data(), id: docSnap.id });
      } else {
        console.log("No such document!");
      }
    }
    getReleaseById();
  }, []);

  // Intiate Tracks Array
  useEffect(() => {
    setTracks(releaseObj.trackListing);
  }, [releaseObj.trackListing]);

  // Update Release in Firestore
  async function updateFireStoreReleases() {
    const releaseRef = await doc(db, "releases", releaseId);
    setDoc(releaseRef, { ...releaseObj, trackListing: tracks });
  }

  return (
    <>
      {isAdmin && (
        <>
          {/* Add / Edit Modals */}
          <AddTrackModal
            showAddTrackModal={showAddTrackModal}
            hideTrackModal={hideAddTrackModal}
            applyTrackToTracklisting={applyTrackToTracklisting}
          />

          <EditTrackModal
            showEditTrackModal={showEditTrackModal}
            hideEditTrackModal={hideEditTrackModal}
            applyEditToTracklisting={applyEditToTracklisting}
            tracks={tracks}
            trackIndex={trackIndex}
          />

          {/* Main Page */}
          <Row style={{ textAlign: "left" }}>
            <h2>Edit Release</h2>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* Track Details Form */}
              <EditForm releaseObj={releaseObj} setReleaseObj={setReleaseObj} />

              {/* Tracklisting Table */}
              <TrackList
                tracks={tracks}
                setTrackIndex={setTrackIndex}
                setEditShowTrackModal={setEditShowTrackModal}
                trackIndex={trackIndex}
                deleteTrackFromTrackListing={deleteTrackFromTrackListing}
              />

              {/* Buttons */}
              <EditFomButtons
                setAddShowTrackModal={setAddShowTrackModal}
                updateFireStoreReleases={updateFireStoreReleases}
              />
            </Form>
          </Row>
        </>
      )}
    </>
  );
}
