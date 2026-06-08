import { PreacherProfile, VocalExercise } from "../types";

export const PREACHER_PROFILES: PreacherProfile[] = [
  {
    id: "spurgeon",
    name: "Charles Spurgeon",
    title: "O Príncipe dos Pregadores",
    era: "Século XIX (Inglaterra)",
    summary: "Seus sermões arrebatadores reuniam mais de 10.000 pessoas no Tabernáculo Metropolitano de Londres. Unia teologia puritana ortodoxa profunda com uma linguagem simples, vibrante e encadernada por ricas e cativantes histórias humanas.",
    avatar: "Crown",
    techniques: [
      { title: "Ilustrações Vivas", desc: "Acreditava que belas ilustrações eram como janelas em uma casa, lançando luz e facilitando o entendimento de dezenas de conceitos teológicos abstratos." },
      { title: "Apelo Emocional", desc: "Tinha extraordinária audácia em apelar diretamente às dores íntimas do coração das pessoas, instilando a urgency do amor divino de Deus." },
      { title: "Estruturas Transparentes", desc: "Liderava o sermão sob tópicos lógicos e simples, bem delimitados desde a sua introdução envolvente até uma forte e contundente conclusão." }
    ]
  },
  {
    id: "billy_graham",
    name: "Billy Graham",
    title: "O Evangelista das Nações",
    era: "Século XX (Estados Unidos / Internacional)",
    summary: "Pregou pessoalmente o Evangelho de Cristo a mais de 200 milhões de almas em centenas de cruzadas pelo planeta. Notabilizou-se pela simplicidade cristalina de seus discursos morais e uma autoridade respaldada na verdade da Palavra.",
    avatar: "Globe",
    techniques: [
      { title: "Simplicidade Extrema", desc: "Evitava terminologias teológicas obscuras ou floreios intelectuais complexos, mantendo uma fala acessível até para crianças." },
      { title: "Apelo à Decisão Concreta", desc: "Sussurrava ou declamava com fervor ao final de cada sermão um convite imperativo para que os ouvintes tomassem uma decisão imediata de arrependimento." },
      { title: "Uso de Testemunhos Reais", desc: "Adotava notícias do cotidiano e relatos de testemunhas reais modernas como pontes de contato para ilustrar a decadência e necessidade humana." }
    ]
  },
  {
    id: "john_wesley",
    name: "John Wesley",
    title: "O Pregador Itinerante",
    era: "Século XVIII (Inglaterra / Movimento Metodista)",
    summary: "Líder incansável que viajou milhares de quilômetros a cavalo pregando ao ar livre para as massas operárias inglesas excluídas dos templos anglicanos formais. Um expoente de disciplina pessoal e relevância social.",
    avatar: "Horse",
    techniques: [
      { title: "Pregação ao Ar Livre", desc: "Inovou ao ir ao encontro dos operários famintos em minas de carvão e campos abertos, expandindo imensamente a audiência da Palavra." },
      { title: "Preparação e Rigor", desc: "Rígida consagração pessoal rotineira às Escrituras Sagradas, organizando seus esboços de pregações com refinada coerência lógica." },
      { title: "Envolvimento de Apoio", desc: "Estreitava laços pessoais profundos com as pessoas fora do púlpito, consolidando a pregação pública com visitas pastorais intensas." }
    ]
  },
  {
    id: "martyn_lloyd_jones",
    name: "Dr. Martyn Lloyd-Jones",
    title: "O Pregador Expositivo",
    era: "Século XX (País de Gales / Capela de Westminster)",
    summary: "Médico de formação que se tornou um dos teólogos reformados mais contundentes de sua era. Focou intensamente na profundidade da Exegese Bíblica e na lógica vigorosa de pregações expositivas verse-by-verse.",
    avatar: "Activity",
    techniques: [
      { title: "Exegese Detalhada", desc: "Aconselhava a desbravar o texto sagrado com paciência extrema, descobrindo o real sentido original antes de propor aplicações simplificadas." },
      { title: "Poder de Clareza Teológica", desc: "Vigorosa articulação lógica de suas frases para convencer a mente consciente dos fiéis e incitar a uma verdadeira transformação de conceitos." },
      { title: "Mensagem Transformadora", desc: "Convicção de que pregar não se resume a catalogar fatos históricos da Bíblia, mas sim aplicar a verdade para consolar e reordenar a vida das pessoas." }
    ]
  }
];

export const VOCAL_EXERCISES: VocalExercise[] = [
  {
    id: "diaframatica",
    title: "Respiração Diafragmática (Técnica 4-4-4)",
    target: "Estabilização e Suporte do Volume da Voz. Acalma os nervos antes de subir no púlpito.",
    durationSeconds: 120, // 2 mins
    instructions: [
      "Fique de pé com ombros relaxados e coloque uma das mãos sobre o abdômen.",
      "Inspire profunda e silenciosamente pelo nariz por 4 segundos, sentindo a barriga se expandir (não eleve os ombros).",
      "Retenha o ar nos pulmões de forma confortável e conte mentalmente até 4.",
      "Solte o ar de forma lenta, soprando de leve pelos lábios, por 4 segundos."
    ],
    tip: "A respiração diafragmática impede que sua voz fique 'trêmula' ou que falte fôlego no meio das frases longas."
  },
  {
    id: "aquecimento_vocal",
    title: "Aquecimento e Ressonância das Cordas Vocais",
    target: "Prepara a musculatura laríngea e amplia a clareza da entonação.",
    durationSeconds: 120,
    instructions: [
      "Faça um som sussurrado de 'Mmmm' (Humming) de boca fechada, sentindo a vibração leve nos lábios e maçãs do rosto.",
      "Varia o tom subindo e descendo a escala, imitando uma sirene suave de carro, sem forçar as cordas agudas.",
      "Articule o fonema 'Trrr...' ou 'Brrr...' vibrando fartamente a língua e os lábios com ar contínuo por alguns segundos."
    ],
    tip: "Fazer este exercício por 2 a 3 minutos lubrifica a laringe e previne rouquidões ou fadigas no final do sermão."
  },
  {
    id: "diccao",
    title: "Controle de Dicção e Trava-Línguas",
    target: "Treina a articulação ágil de nomes, localidades e termos bíblicos difíceis de ler.",
    durationSeconds: 180, // 3 mins
    instructions: [
      "Fale em voz alta e articulando exaggerate as sílabas do trava-línguas: 'O rato roeu a roupa do rei de Roma, o rei de Roma reclamou da roupa roída do rato.'",
      "Aumente a velocidade passo a passo, mas apenas e somente se mantiver a clareza total de cada palavra.",
      "Tente o segundo clássico: 'Bagre branco, branco bagre. Num prato de trigo para três tigres tristes.'"
    ],
    tip: "Gesticular e mexer amplamente a boca ao praticar estes fonemas destrava os lábios e a língua para o uso do microfone."
  }
];
