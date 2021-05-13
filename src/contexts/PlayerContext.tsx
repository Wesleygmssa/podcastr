import { createContext } from "react";

type Episode = {
  title: String;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  play: (episode) => void;
};

/* ***Poderia ser dessa forma
export const PlayerContext = createContext({
  episodeList: [],
  currentEpisodeIndex: 0,
}); */

export const PlayerContext = createContext({} as PlayerContextData);
