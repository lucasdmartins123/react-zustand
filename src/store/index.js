import { create } from "zustand";
import audioTempoFinalizadoSom from "/src/assets/sons/beep.mp3";

const audioTempoFinalizado = new Audio(audioTempoFinalizadoSom);

export const MODO_CRONOMETRO = {
  FOCO: {
    id: "foco",
    nome: "Foco",
    frase: ["Otimize sua produtividade", "mergulhe no que importa"],
    tempoInicialEmSegundos: 30,
  },
  DESCANSO_CURTO: {
    id: "descanso-curto",
    nome: "Descanso Curto",
    frase: ["Que tal dar uma respirada?", "Faça uma pausa curta."],
    tempoInicialEmSegundos: 5,
  },
  DESCANSO_LONGO: {
    id: "descanso-longo",
    nome: "Descanso Longo",
    frase: ["Hora de voltar à superfície", "Faça uma pausa longa."],
    tempoInicialEmSegundos: 15,
  },
};

export const useCronometroStore = create((set) => ({
  modoCronometro: MODO_CRONOMETRO.FOCO,
  tempoEmSegundos: MODO_CRONOMETRO.FOCO.tempoInicialEmSegundos,

  setModoCronometro: (novoModo) => {
    set({
      modoCronometro: novoModo,
      tempoEmSegundos: novoModo.tempoInicialEmSegundos,
    });
  },

  intervaloId: null,

  iniciarCronometro: () => {
    const novoId = setInterval(contagemRegressiva, 1000);

    set({ intervaloId: novoId });
  },

  pausarCronometro: () => {
    set((estado) => {
      clearInterval(estado.intervaloId);
      return { intervaloId: null };
    });
  },
}));

function contagemRegressiva() {
  const tempoAtual = useCronometroStore.getState().tempoEmSegundos;
  const pausarCronometro = useCronometroStore.getState().pausarCronometro;

  if (tempoAtual > 0) {
    decrementarTempo();
  } else {
    pausarCronometro();
    redifinirTempo();
    audioTempoFinalizado.play();
  }
}

function decrementarTempo() {
  useCronometroStore.setState((state) => ({
    tempoEmSegundos: state.tempoEmSegundos - 1,
  }));
}

function redifinirTempo() {
  useCronometroStore.setState((state) => ({
    tempoEmSegundos: state.modoCronometro.tempoInicialEmSegundos,
  }));
}
