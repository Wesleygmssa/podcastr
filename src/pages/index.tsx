// SPA => Tradicional   useEffect(() => {}, []); // Carregados momentos que carrega a tela // não e index pelo google.
// SSR => Dados carregada pela camada de servidor // inde pelo google  //Execita toda vez que usuario entrar na home
// SSG => Versão estatica // não faz requisição nova
import { parseISO, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString.ts";
import styles from "./home.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = useContext(PlayerContext);

  /* **Podendo o push **** utilizando imutabilidade questão de performasse */
  /* **Criando uma nova informação de tudo que já existe */
  const episodeList = [...latestEpisodes, ...allEpisodes];

  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Útimos lançamentos </h2>

        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id} className={styles.teste}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="contain"
                />

                <div className={styles.episodeDatails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playList(episodeList, index);
                  }}
                >
                  <img src="play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 100 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="contain"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        playList(episodeList, index + latestEpisodes.length);
                      }}
                    >
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

//Html estatico
export const getStaticProps: GetStaticProps = async () => {
  //_limit=12&_sort=published_at&_order=desc
  const { data } = await api.get("episodes", {
    //passando parametros com axios
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  //Transformação de dados
  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        //convertendo horas
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2); //pegar ultimos episodios
  const allEpisodes = episodes.slice(2); // restante dos episodes

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // Gerar chama api cada 8h
  };
};

// yarn build
// yarn start => tudo funcional do next
