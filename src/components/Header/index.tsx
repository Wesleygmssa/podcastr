import styles from "./styles.module.scss";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
export function Header() {
  //Fezendo a transformação da data
  const currentDate = format(new Date(), "EEEEEE, d MMMM", { locale: ptBR });
  return (
    <header className={styles.headerContainer}>
      <img src="logo.svg" alt="podcast" />
      <p>O Melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}
