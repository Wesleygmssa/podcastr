// SPA => Tradicional   useEffect(() => {}, []); // Carregados momentos que carrega a tela // não e index pelo google.
// SSR => Dados carregada pela camada de servidor // inde pelo google  //Execita toda vez que usuario entrar na home
// SSG => Versão estatica // não faz requisição nova
import { GetStaticProps } from "next";

export default function Home(props) {
  // useEffect(() => {
  //   fetch("http://localhost:3333/episodes")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  console.log(props.episodes);

  return (
    <>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  );
}

//Html estatico
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8, // Gerar chama api cada 8h
  };
};

// yarn build
// yarn start => tudo funcional do next
