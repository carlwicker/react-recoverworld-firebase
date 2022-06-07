import { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import AddTrackModal from "./AddTrackModal";
import { db } from "../../../firebase";
import EditTrackModal from "./EditTrackModal";
import { collection, addDoc } from "firebase/firestore";
import ITrack from "../../../interfaces/ITrack";
import IRelease from "../../../interfaces/IRelease";
import AddForm from "./AddForm";
import TrackList from "./TrackList";
import AddFormButtons from "./AddFormButtons";
import { Helmet } from "react-helmet-async";

interface IAddRelease {
  isAdmin: boolean;
}

export default function AddRelease({ isAdmin }: IAddRelease) {
  const [release, setRelease] = useState<IRelease | {}>({});
  const [tracks, setTracks] = useState<ITrack[] | []>([]);
  const [showAddTrackModal, setAddShowTrackModal] = useState<boolean>(false);
  const [showEditTrackModal, setEditShowTrackModal] = useState<any>(false);
  const [trackIndex, setTrackIndex] = useState<Number>();

  // Actions
  function deleteTrackFromTrackListing(index: number) {
    let newArr = tracks
      .slice(0, index)
      .concat(tracks.slice(index + 1, tracks.length));
    console.log(newArr);
    setTracks(newArr);
  }

  function applyTrackToTracklisting(trackObj: ITrack) {
    setTracks([...tracks, trackObj]);
  }

  async function applyEditToTracklisting(trackObj: any, trackIndex: number) {
    let newTracksArr: any[] = [];
    console.log(trackIndex);

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

  // Add Release to Firestore
  async function addToFireStoreReleases() {
    const docRef = await addDoc(collection(db, "releases"), {
      ...release,
      trackListing: tracks,
    });
    console.log(docRef, docRef.id);
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

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
          <Container>
            <Row style={{ textAlign: "left" }}>
              <h1>Add Release</h1>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {/* Track Details Form */}
                <AddForm setRelease={setRelease} release={release} />

                {/* Tracklisting Table */}
                <TrackList
                  tracks={tracks}
                  setEditShowTrackModal={setEditShowTrackModal}
                  setTrackIndex={setTrackIndex}
                  deleteTrackFromTrackListing={deleteTrackFromTrackListing}
                />

                {/* Buttons */}
                <AddFormButtons
                  setAddShowTrackModal={setAddShowTrackModal}
                  addToFireStoreReleases={addToFireStoreReleases}
                />
              </Form>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
