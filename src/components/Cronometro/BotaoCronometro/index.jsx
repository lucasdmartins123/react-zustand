import styles from "./styles.module.css";
import play_arrowImg from "/src/assets/imgs/play_arrow.png";
import pauseImg from "/src/assets/imgs/pause.png";
import audioPlaySom from "/src/assets/sons/play.wav";
import audioPauseSom from "/src/assets/sons/pause.mp3";
import { useCronometroStore } from "../../../store";

export default function BotaoCronometro() {
  const intervaloId = useCronometroStore((state) => state.intervaloId);
  const iniciarCronometro = useCronometroStore((state) => state.iniciarCronometro);
  const pausarCronometro = useCronometroStore((state) => state.pausarCronometro);
  const audioPlay = new Audio(audioPlaySom);
  const audioPause = new Audio(audioPauseSom);
  const textoBotao = intervaloId ? "Pausar" : "Começar";
  const Icone = intervaloId ? pauseImg : play_arrowImg;

  function iniciarOuPausar() {
    if (!intervaloId) {
      audioPlay.play();
      iniciarCronometro();
    } else {
      pausarCronometro();
      audioPause.play();
    }
  }

  return (
    <div className={styles["cronometer__primary-button-wrapper"]}>
      <button onClick={iniciarOuPausar} className={styles["cronometer__primary-button"]}>
        <img className={styles["cronometer__primary-button-icon"]} src={Icone} alt="" />
        <span>{textoBotao}</span>
      </button>
    </div>
  );
}
