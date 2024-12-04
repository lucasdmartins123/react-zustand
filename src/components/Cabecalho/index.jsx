import styles from "./styles.module.css";
import logoImg from "/src/assets/imgs/logo.png";
import focoImg from "/src/assets/imgs/foco.png";
import descansoCurto from "/src/assets/imgs/descanso-curto.png";
import descansoLongo from "/src/assets/imgs/descanso-longo.png";
import { useCronometroStore } from "../../store";

export default function Cabecalho() {
  const modoCronometro = useCronometroStore((state) => state.modoCronometro);

  const [primeiroTexto, segundoTexto] = modoCronometro.frase;

  function getImagem() {
    if (modoCronometro.id === "descanso-curto") {
      return descansoCurto;
    } else if (modoCronometro.id === "descanso-longo") {
      return descansoLongo;
    } else {
      return focoImg;
    }
  }

  return (
    <header className="header">
      <figure className={styles["header__logo-figure"]}>
        <img src={logoImg} alt="Logotipo do Fokus" />
      </figure>

      <section className={styles["header__section-banner-container"]}>
        <h1 className={styles["header__title"]}>
          {primeiroTexto} <strong className={styles["header__title-strong"]}>{segundoTexto}</strong>
        </h1>

        <figure className={styles["header__image-figure"]}>
          <img className={styles["header__image"]} src={getImagem()} alt="" />
        </figure>
      </section>
    </header>
  );
}
