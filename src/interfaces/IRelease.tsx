import { Timestamp } from "firebase/firestore";
import ITrack from "./ITrack";

export default interface IRelease {
  id: string;
  artist: string;
  title: string;
  label: string;
  artwork: string;
  catNum: string;
  trackListing: ITrack[];
  releaseDate: Timestamp;
}
