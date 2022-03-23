import ITrack from "./ITrack";

export default interface IReleases {
  id: string;
  artist: string;
  title: string;
  label: string;
  artwork: string;
  catNum: string;
  trackListing: ITrack[];
  isActive: boolean;
}
