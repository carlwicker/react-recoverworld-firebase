interface ITrack {
  releaseId: number;
  trackNum: number;
  artist: string;
  title: string;
  mix: string;
  beatport: string;
  youtube: string;
  soundcloud: string;
  spotify: string;
}

export interface IReleases {
  releaseId: string;
  artist: string;
  title: string;
  label: string;
  img: string;
  catNum: string;
  tracklisting: ITrack[];
  releaseDate: Date;
  isActive: boolean;
}
