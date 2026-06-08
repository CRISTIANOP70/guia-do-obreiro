export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: number; // index of options
  explanation: string;
}

export interface StudyModule {
  id: number;
  title: string;
  subtitle: string;
  introduction: string;
  sections: {
    title: string;
    content: string;
    verses?: { text: string; reference: string }[];
    points?: string[];
    comparisonTable?: {
      titleA: string;
      titleB: string;
      items: { itemA: string; itemB: string }[];
    };
  }[];
  bibleBase: {
    verse: string;
    reference: string;
    commentary: string;
  };
  reflectionQuestions: string[];
  quiz: QuizQuestion[];
}

export interface QAItem {
  id: number;
  question: string;
  answer: string;
  reference: string;
  category: "Chamado" | "Caráter & Vida Espiritual" | "Ética & Equipe" | "Correção & Serviço";
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: "preparacao_pessoal" | "preparacao_ambiente" | "materiais_apoio" | "alinhamento" | "postura" | "atendimento" | "ordem" | "apoio_lideranca" | "organizacao_final" | "cuidado_pessoas" | "comunicacao_lideranca";
}

export interface SermonDraft {
  id: string;
  title: string;
  theme: string;
  keyVerse: string;
  introduction: string;
  bodyPoints: string[];
  illustration: string;
  conclusion: string;
  createdAt: string;
}

export interface PreacherProfile {
  id: string;
  name: string;
  title: string;
  era: string;
  summary: string;
  avatar: string;
  techniques: { title: string; desc: string }[];
}

export interface VocalExercise {
  id: string;
  title: string;
  target: string;
  durationSeconds: number;
  instructions: string[];
  tip: string;
}
