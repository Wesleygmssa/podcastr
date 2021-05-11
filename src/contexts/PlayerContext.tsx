import { createContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbanail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
};

// export const PlayerContext = createContext({
//   episodeList: [],
//   currentEpisodeIndex: 0,
// });

export const PlayerContext = createContext({} as PlayerContextData);
