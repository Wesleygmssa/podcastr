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
  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Útimos lançamentos</h2>
<<<<<<< HEAD
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <>
                <li key={episode.id}>
                  <Image
                    className={styles.image}
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episodeDetails}>
                    <a href="">{episode.title}</a>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar espisódio" />
                  </button>
                </li>
              </>
=======

        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id} className={styles.teste}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDatails}>
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type="button">
                  <img src="play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
>>>>>>> 084a9d7fbf99e1947563bc802f13ae05974c1fe6
            );
          })}
        </ul>
      </section>

<<<<<<< HEAD
      <section className={styles.allEpisodes}></section>
=======
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td>
                    <Image width={120} height={120} src={episode.thumbnail} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
>>>>>>> 084a9d7fbf99e1947563bc802f13ae05974c1fe6
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

<<<<<<< HEAD
  const latestEpisodes = episodes.slice(0, 2); // ultimos
  const allEpisodes = episodes.slice(2); // tamanho do array
=======
  const latestEpisodes = episodes.slice(0, 2); //pegar ultimos episodios
  const allEpisodes = episodes.slice(2); // restante dos episodes
>>>>>>> 084a9d7fbf99e1947563bc802f13ae05974c1fe6

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
