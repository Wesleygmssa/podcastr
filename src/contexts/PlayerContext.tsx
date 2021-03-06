import { createContext, ReactNode, useContext, useState } from "react";

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
  isShuffLing: boolean;
  play: (episode: Episode) => void;
  setPlayState: (state: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleShuffle: () => void;
  playList: (list: Episode[], index: number) => void;
  hasNext: boolean;
  hasPrevius: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
};

type PlayContextProviderProps = {
  children: ReactNode;
};

/* ***Poderia ser dessa forma
export const PlayerContext = createContext({
  episodeList: [],
  currentEpisodeIndex: 0,
}); */

/***
 *** variavel para armarzenar dados do contexto *****
 ** */

export const PlayerContext = createContext({} as PlayerContextData);

//*****Contexto que estava no APP*******
export function PlayerContextProvider({ children }: PlayContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffLing, setIsShuffLing] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  /**
   **** EX: 12 episodios ****
   ***/
  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying); //true || false
  }

  function toggleLoop() {
    setIsLooping(!isLooping); //true || false
  }

  function toggleShuffle() {
    setIsShuffLing(!isShuffLing); //true || false
  }

  function setPlayState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevius = currentEpisodeIndex > 0;
  const hasNext = currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffLing) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevius) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    /* ***
     *Aqui esta variavel global da aplica????o
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
        playPrevious,
        playNext,
        hasPrevius,
        hasNext,
        toggleLoop,
        isLooping,
        toggleShuffle,
        isShuffLing,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
