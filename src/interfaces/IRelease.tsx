interface ITrack {
  trackId: number;
  trackNum: number;
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
  catNum: string;
  artist: string;
  title: string;
  tracklisting: ITrack[];
  isActive: boolean;
}
