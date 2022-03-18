interface ITrack {
  trackId: number;
  trackNum: number;
  label: string;
  artist: string;
  title: string;
  beatport: string;
  youtube: string;
  soundcloud: string;
  spotify: string;
}

export interface IReleases {
  releaseId: string;
  label: string;
  artist: string;
  title: string;
  tracklisting: ITrack[];
}
