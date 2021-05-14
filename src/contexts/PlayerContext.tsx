import { createContext, ReactNode, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  setPlayState: (state: boolean) => void;
  togglePlay: () => void;
  playList: (list: Episode[], index: number) => void;
};

type PlayContextProviderProps = {
  children: ReactNode;
};

/* ***Poderia ser dessa forma
export const PlayerContext = createContext({
  episodeList: [],
  currentEpisodeIndex: 0,
}); */

//variavel para armarzenar dados do contexto
export const PlayerContext = createContext({} as PlayerContextData);

//Contexto que estava no APP;
export function PlayerContextProvider({ children }: PlayContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  // EX: 12 episodios
  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying); //true || false
  }
  function setPlayState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    /* ***
     *Aqui esta variavel global da aplicação
     **** */
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayState,
        playList,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
