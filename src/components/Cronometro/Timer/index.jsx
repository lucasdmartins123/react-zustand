import { useCronometroStore } from "../../../store";
import styles from "./styles.module.css";

export default function Timer() {
  const tempoEmSegundos = useCronometroStore((state) => state.tempoEmSegundos);
  const formatTempo = new Date(tempoEmSegundos * 1000).toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });

  return <div className={styles["cronometer-timer"]}>{formatTempo}</div>;
}
