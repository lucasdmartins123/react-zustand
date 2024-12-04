import { useCronometroStore } from "../../../../store";
import styles from "./styles.module.css";

export default function BotaoModo({ children, modoBotao }) {
  const modoCronometro = useCronometroStore((state) => state.modoCronometro);
  const setModoCronometro = useCronometroStore((state) => state.setModoCronometro);
  const ativo = modoBotao.id === modoCronometro.id;

  function handleClick() {
    setModoCronometro(modoBotao);
  }

  return (
    <button
      className={`
        ${styles["cronometer-modes__button"]}
        ${ativo ? styles["cronometer-modes__button--active"] : ""}
      `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
