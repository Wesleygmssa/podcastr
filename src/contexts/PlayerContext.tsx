import { createContext } from "react";

type Episode = {
  title: String;
  members: string;
  thumbanail: string;
  duration: string;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
};

// export const PlayerContext = createContext({
//   episodeList: [],
//   currentEpisodeIndex: 0,
// });

export const PlayerContext = createContext({} as PlayerContextData);
