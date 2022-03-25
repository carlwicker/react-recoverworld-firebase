import { Table, Button } from "react-bootstrap";
import { SiSpotify, SiBeatport, SiSoundcloud } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import ITrack from "../../../interfaces/ITrack";

interface ITrackList {
  tracks: ITrack[];
  setEditShowTrackModal: any;
  setTrackIndex: any;
  deleteTrackFromTrackListing: Function;
}

export default function TrackList({
  tracks,
  setEditShowTrackModal,
  setTrackIndex,
  deleteTrackFromTrackListing,
}: ITrackList) {
  return (
    <Table striped bordered hover variant="dark" className="mt-5">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Mix</th>
          <th>Social</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        {tracks?.map((track: any, index: number) => {
          let trackIndex = index;
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{track?.title}</td>
              <td>{track?.artist}</td>
              <td>{track?.mix}</td>
              <td>
                {track?.beatport !== "" ? (
                  <SiBeatport style={{ marginRight: "10px" }} />
                ) : (
                  ""
                )}
                {track?.youtube !== "" ? (
                  <BsYoutube style={{ marginRight: "10px" }} />
                ) : (
                  ""
                )}
                {track?.soundcloud !== "" ? (
                  <SiSoundcloud style={{ marginRight: "10px" }} />
                ) : (
                  ""
                )}
                {track?.spotify !== "" ? <SiSpotify /> : ""}
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    setEditShowTrackModal(true);
                    setTrackIndex(trackIndex);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => {
                    deleteTrackFromTrackListing(index);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
