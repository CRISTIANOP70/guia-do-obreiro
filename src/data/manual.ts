import { StudyModule } from "../types";

export const STUDY_MODULES: StudyModule[] = [
  {
    id: 1,
    title: "Módulo 1 — O Chamado do Obreiro",
    subtitle: "Fundamentos, Identidade e Vocação de Serviço",
    introduction: "Antes de aprender o que fazer na igreja, o obreiro precisa entender quem ele é diante de Deus. O ministério não começa no altar, começa no coração. Este módulo vai estabelecer os fundamentos do chamado divino, corrigindo visões distorcidas e alinhando o obreiro à vontade do Senhor.",
    bibleBase: {
      verse: "Rogai, pois, ao Senhor da seara que mande obreiros para a sua seara.",
      reference: "Mateus 9:38",
      commentary: "O ministério é uma iniciativa de Deus para cuidar do Seu povo, caracterizado por ser um trabalho árduo de colheita e dedicação constante."
    },
    sections: [
      {
        title: "O que é Ser Obreiro de Verdade?",
        content: "Ser obreiro não é simplesmente ocupar uma função organizacional, usar um uniforme ou carregar um título eclesiástico destacado. Obreiro verdadeiro é aquele que foi intencionalmente separado por Deus para servir no anonimato, focado unicamente no crescimento espiritual do Reino de Deus e no apoio à igreja, independentemente do reconhecimento humano ou privilégios sociais.",
        points: [
          "Serve voluntariamente mesmo quando ninguém está observando seu trabalho.",
          "Permanece fiel e dedicado mesmo sem aplausos de terceiros.",
          "Compreende de forma convicta que a obra pertence a Deus e não a ele próprio.",
          "Encara o papel como uma vocação espiritual interna, e não como promoção social secular."
        ]
      },
      {
        title: "Diferença Essencial entre Cargo, Função e Chamado",
        content: "Um dos erros mais comuns e prejudiciais dentro do ambiente de liderança é confundir essas três dimensões diferentes:",
        points: [
          "Cargo: É uma posição organizacional mutável e puramente administrativa. Pode ser atribuído por nomeação e extinto de acordo com as necessidades ou alterações na liderança local. Não define caráter ou maturidade espiritual.",
          "Função: Reflete a atividade prática e temporária exercida no dia a dia da igreja (ex: arrumação de cadeiras, portaria, som, recepção). Pode ser reajustada ou alterada a qualquer momento pela coordenação.",
          "Chamado: Dimensão espiritual e eterna decorrente de um propósito soberano de Deus para com o indivíduo. É permanente e continua ativo no coração mesmo que o cargo temporário se encerre."
        ]
      },
      {
        title: "Divisor de Águas: Servir x Aparecer",
        content: "O real divisor de águas na jornada do obreiro é saber discernir se suas reais aspirações no altar de Deus estão fundamentadas no desejo sincero de servir ou na vaidade de ter visibilidade. Servir a Deus é um supremo privilégio, nunca um palco pessoal.",
        comparisonTable: {
          titleA: "Aparecer (Motivação Carnal)",
          titleB: "Servir (Motivação Espiritual)",
          items: [
            { itemA: "Busca constante por reconhecimento de líderes e irmãos.", itemB: "Busca unicamente agradar e honrar a Deus." },
            { itemA: "Quer alta visibilidade e destaque nas atividades dominicais.", itemB: "Não depende ou se altera por ausência de aplausos." },
            { itemA: "Entristece-se ou reclama quando não é notado ou elogiado.", itemB: "Obedece e trabalha com alegria mesmo no anonimato." },
            { itemA: "Serve apenas enquanto está sob olhar de supervisores.", itemB: "Permanece firme e zeloso em qualquer posição designada." }
          ]
        },
        verses: [
          { text: "Quem quiser tornar-se importante entre vocês deverá ser servo.", reference: "Marcos 10:43" },
          { text: "Não fostes vós que me escolhestes; pelo contrário, eu vos escolhi.", reference: "João 15:16" }
        ]
      }
    ],
    reflectionQuestions: [
      "Eu sirvo por amor genuíno à obra de Deus ou para obter prestígio e reconhecimento social?",
      "Caso o meu cargo atual me fosse retirado hoje, eu continuaria servindo nos bastidores com a mesma alegria?",
      "Estou realmente disposto a aprender com mansidão antes de assumir papéis de liderança?"
    ],
    quiz: [
      {
        id: 1,
        question: "De acordo com o Módulo 1, o que define essencialmente o 'Chamado'?",
        options: [
          "Uma posição administrativa indicada pela liderança local que nunca pode mudar.",
          "Algo espiritual e eterno oriundo de Deus, que não depende de títulos humanos.",
          "O direito exclusivo de usar uniformes e liderar frentes de pregação.",
          "A quantidade de tarefas públicas realizadas e o prestígio alcançado."
        ],
        correctOption: 1,
        explanation: "O chamado é de origem divina, com raízes espirituais profundas e propósitos eternos, persistindo mesmo perante mudanças administrativas."
      },
      {
        id: 2,
        question: "Qual atitude melhor caracteriza um obreiro focado no 'Aparecer'?",
        options: [
          "Organizar o ambiente do templo sem a presença de outras pessoas.",
          "Permanecer fiel no serviço discreto, mesmo no anonimato.",
          "Entristecer-se ou desmotivar-se quando as suas ações não são notadas ou elogiadas.",
          "Respeitar de forma voluntária as escalas montadas pelos líderes."
        ],
        correctOption: 2,
        explanation: "A busca por aprovação humana, aplausos e visibilidade gera frustração imediata quando o obreiro não recebe a atenção que esperava."
      }
    ]
  },
  {
    id: 2,
    title: "Módulo 2 — O Caráter do Obreiro",
    subtitle: "Integridade, Santidade Prática e Vida Devocional",
    introduction: "O ministério não é sustentado apenas por talentos, dons e carisma. Ao longo da história bíblica, Deus nunca priorizou a habilidade intelectual em detrimento do caráter íntimo do servo. O obreiro aprovado cuida de sua alma antes de tentar cuidar da obra de Deus.",
    bibleBase: {
      verse: "Sede santos, porque eu sou santo.",
      reference: "1 Pedro 1:16",
      commentary: "A santidade do obreiro é uma exigência ética fundamentada na própria natureza de Deus, manifestando-se de forma prática no cotidiano."
    },
    sections: [
      {
        title: "Santidade Prática no Cotidiano",
        content: "A santidade não deve ser reduzida a um conceito teológico abstrato ou à conformidade com regras meramente rígidas e externas. Ela constitui uma prática consciente, diária e responsável que guia toda a conduta do obreiro em três principais pilares:",
        points: [
          "Pensamentos: O que alimentamos na mente molda nosso coração. 'Tudo o que é puro... nisso pensai' (Filipenses 4:8).",
          "Palavras: Palavras devem edificar e abençoar, jamais ser veículos de mentira, fofoca ou murmuração destrutiva.",
          "Comportamento: Significa agir com coerência moral irrepreensível, tanto dentro do templo quanto na vida familiar, acadêmica e profissional."
        ]
      },
      {
        title: "A Vida Devocional como Combustível do Ministério",
        content: "A ausência de uma rotina ativa e intensa de relacionamento com Deus esvazia a autoridade espiritual do obreiro, transformando o serviço sagrado em mero ativismo burocrático e cansativo. Sem intimidade, o servo torna-se frio, vulnérável ao pecado e espiritualmente seco.",
        points: [
          "Estudo da Palavra: Reter e meditar nas Escrituras para aplicá-las em si mesmo antes de usá-las para exortar a outros ('Lâmpada para os meus pés é a tua palavra' - Salmo 119:105).",
          "Oração Constante: Menos peticionismo por interesses próprios e mais cultivo de relacionamento dependente com Deus ('Orai sem cessar' - 1 Tess. 5:17).",
          "Jejum e Consagração: Disciplinas que ensinam o espírito a subjugar as urgências e vontades da carne, trazendo sensibilidade e discernimento divino."
        ],
        verses: [
          { text: "Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as fontes da vida.", reference: "Provérbios 4:23" }
        ]
      }
    ],
    reflectionQuestions: [
      "Sou a mesma pessoa íntegra quando ninguém no templo está me vendo?",
      "Tenho priorizado a leitura pessoal da Bíblia e a oração fora das obrigações do culto?",
      "Minhas conversas descontraídas condizem com a seriedade da minha vocação espiritual?"
    ],
    quiz: [
      {
        id: 1,
        question: "Segundo o Módulo 2, o que ocorre quando o obreiro negligencia a sua vida devocional?",
        options: [
          "Seu serviço flui com mais dinâmica por ter mais tempo livre.",
          "Ele se torna frio espiritualmente, vulnerável ao pecado e atua apenas sob força humana.",
          "A igreja o promove rapidamente para poupar seu cansaço físico.",
          "Ele ganha mais autonomia e discernimento na tomada de decisões práticas."
        ],
        correctOption: 1,
        explanation: "Sem a comunhão íntima através do estudo bíblico, oração e jejum, o trabalho ministerial torna-se meramente um esforço humano vulnerável e suscetível ao cansaço."
      }
    ]
  },
  {
    id: 3,
    title: "Módulo 3 — Conduta e Ética do Obreiro",
    subtitle: "Postura no Templo, Relacionamento Interpessoal e Bom Testemunho",
    introduction: "A igreja constitui tanto uma família espiritual quanto um ambiente que envolve ordem, etiqueta e compromisso mútuo. Deus chama e comissiona pessoas maduras, responsáveis, equilibradas emocionalmente e éticas no trato com o próximo.",
    bibleBase: {
      verse: "Tudo, porém, seja feito com decência e ordem.",
      reference: "1 Coríntios 14:40",
      commentary: "A liturgia e as relações interpessoais na igreja exigem bom senso, autocontrole e reverência constante para honrar a Deus."
    },
    sections: [
      {
        title: "Conduta Correta Dentro do Templo",
        content: "A atitude do obreiro durante os cultos atua como espelho direto e referencial para toda a comunidade. Deve-se zelar pelo ambiente solene da adoração evitando qualquer tipo de distração.",
        points: [
          "Reverência e Atenção: Estar inteiramente compenetrado no culto e nas mensagens e não disperso no celular ou distraído.",
          "Sem Conversas Paralelas: Sussurros ou brincadeiras triviais quebram a concentração dos congregantes e demonstram desrespeito espiritual.",
          "Não Circular Sem Necessidade: Evitar o trânsito excessivo e desordenado pelos corredores para não atrapalhar o andamento do serviço sagrado.",
          "Submissão Voluntária: Acatar as orientações da escala e as decisões pastorais com dedicação e sem criar facções ou contendas inflamadas."
        ]
      },
      {
        title: "Ética no Relacionamento com as Pessoas",
        content: "O obreiro lida diretamente com dores, fraquezas humanas, desabafos e, ocasionalmente, fofocas. A conduta ética preserva corações e mantém a comunhão pacífica dos santos intacta.",
        points: [
          "Discrição nos Segredos: É inadmissível que o obreiro repasse confidências ou use problemas de ovelhas em rodas de conversa. Deve saber guardar informações delicadas.",
          "Ética no Falar: Banir completamente piadas ofensivas, reclamações públicas sobre escalas de trabalho e julgamentos apressados das fraquezas alheias.",
          "Ética no Aconselhamento: Saber ouvir com empatia, não tentar assumir ilegalmente a prerrogativa pastoral e encaminhar casos que fujam de seu limite à liderança qualificada."
        ]
      },
      {
        title: "Conduta Fora da Igreja (Bom Testemunho)",
        content: "O obreiro não depõe seu cargo quando cruza o limite do templo. Pelo contrário, as suas ações no círculo familiar, no ambiente profissional de negócios e em suas redes sociais transmitem uma mensagem perene que pode aproximar ou repelir as almas de Cristo Jesus.",
        points: [
          "Honestidade máxima nas negociações financeiras.",
          "Uso comedido e edificante das redes sociais digitais.",
          "Respeito às leis públicas, autoridades do país e linguagem impecável."
        ],
        verses: [
          { text: "Vós sois a luz do mundo. Não se pode esconder uma cidade edificada sobre um monte.", reference: "Mateus 5:14" },
          { text: "Portai-vos com sabedoria para com os que estão de fora.", reference: "Colossenses 4:5" }
        ]
      }
    ],
    reflectionQuestions: [
      "Minha conduta pessoal no anonimato honra a respeitabilidade das autoridades da minha congregação?",
      "Sou conhecido como alguém que resolve conflitos em paz ou como um elemento que propaga fofoca?",
      "Minhas postagens públicas em redes de internet promovem o Evangelho ou causam escândalo de conduta?"
    ],
    quiz: [
      {
        id: 1,
        question: "Qual postura é considerada essencial para o obreiro no andamento das programações de culto?",
        options: [
          "Circular livremente pelos corredores e conversar com visitas para demonstrar dinamismo.",
          "Manter-se atento e reverente, evitando conversas paralelas e trânsito desordenado.",
          "Resolver conflitos difíceis no templo de forma chamativa para mostrar autoridade.",
          "Delegar tarefas a terceiros e usar o celular para monitorar o andamento da liturgia."
        ],
        correctOption: 1,
        explanation: "Para garantir o foco na pregação e reverência a Deus, o obreiro atua de maneira silenciosa, concentrada, acolhedora e ordeira."
      }
    ]
  },
  {
    id: 4,
    title: "Módulo 4 — Obreiro no Culto",
    subtitle: "Atuação da Portaria, Direção de Cerimonial e Proteção Espiritual",
    introduction: "O culto é um momento sagrado de encontro da igreja com seu Criador. O obreiro constitui um cooperador ativo para salvaguardar a harmonia espiritual do ambiente, cuidando dos aspectos visíveis e garantindo serenidade nos bastidores.",
    bibleBase: {
      verse: "Ora, somos cooperadores de Deus.",
      reference: "1 Coríntios 3:9",
      commentary: "Zelar pelo culto é cooperar de forma voluntária e coordenada para que o povo congregado possa usufruir da presença de Deus sem distorções."
    },
    sections: [
      {
        title: "A Portaria: Cuidado, Acolhimento e Vigilância",
        content: "Muitas vezes, a portaria representa o primeiro contato que um visitante aflito faz com o povo de Deus. Não se resume a um mero ato burocrático de abrir portas ou guiar assentos, mas envolve um verdadeiro serviço de amor genuíno e acolhimento cuidadoso.",
        points: [
          "Receber com amor e cortesia todos os que adentram o templo sagrado.",
          "Observar com atenção o fluxo, oferecendo acolhimento imediato a idosos, deficientes e mães com crianças.",
          "Proteger com discrição o templo, percebendo condutas suspeitas ou de perturbação e agindo com mansidão e prudência pastoral.",
          "Zelar para que a recepção seja cordial, calada e reverente e não um ponto de fofoca e tagarelice constante."
        ]
      },
      {
        title: "O Obreiro na Direção do Culto",
        content: "Quando designado para a condução formal de um culto, o obreiro assume uma tremenda e solene responsabilidade de moderação teológica e litúrgica diante do rebanho.",
        points: [
          "Exige intensa preparação bíblica, oração devota e comunhão íntima antecipada.",
          "Requer pontualidade rigorosa e acompanhamento minucioso do roteiro.",
          "Zelo pelo uso do tempo (evitar prolongamentos desnecessários ou improvisos longos).",
          "Postura de humilde condutor: Lembrar sempre que o centro absoluto de toda a adoração é Deus, nunca o próprio pregador ou dirigente."
        ]
      },
      {
        title: "Suporte, Apoio e Intervenções de Sabedoria",
        content: "Nem todo obreiro está no púlpito direcionando o culto; a vasta maioria desempenha um papel fulcral de suporte silencioso nos bastidores, corrigindo pequenas lacunas físicas e imprevistos estruturais sem chamar a atenção sobre si.",
        points: [
          "Auxiliar o pastor entregando-lhe água de maneira discreta.",
          "Zelar pelo controle térmico do templo (ventiladores e ar condicionado).",
          "Intervir em momentos de tumulto ou escândalo (ex: indivíduos embriagados, crianças correndo no altar) de maneira calada, mansa, sem reações espalhafatosas ou agressivas."
        ],
        verses: [
          { text: "Servi uns aos outros, cada um conforme o dom que recebeu.", reference: "1 Pedro 4:10" }
        ]
      }
    ],
    reflectionQuestions: [
      "Estou ciente do impacto que meu sorriso receptivo na portaria causa em um visitante desanimado?",
      "Consigo zelar de forma discreta pela ordem física sem me tornar uma presença arrogante ou ranzinza?",
      "Tenho o cuidado de apoiar a liderança nos mínimos detalhes práticos sem precisar ser solicitado a todo instante?"
    ],
    quiz: [
      {
        id: 1,
        question: "De acordo com as orientações do Módulo 4, qual é o papel essencial do obreiro que serve na portaria do templo?",
        options: [
          "Concentrar-se em debater teologia profunda com quem vai chegando.",
          "Atuar como um recepcionista amoroso, atencioso e vigilante com discrição.",
          "Deixar as portas livres de controle para focar apenas nas músicas do culto.",
          "Cobrar dízimos e ofertas obrigatórias logo na entrada de cada visitante."
        ],
        correctOption: 1,
        explanation: "O obreiro da portaria atua como o primeiro toque de amor e segurança da igreja, acolhendo as ovelhas e zelando pela ordem do ambiente."
      }
    ]
  },
  {
    id: 5,
    title: "Módulo 5 — Atividades Práticas do Obreiro",
    subtitle: "Zelo, Limpeza do Templo, Eventos e Organização Material",
    introduction: "Muitos consideram as atividades físicas e práticas da igreja de menor relevância ou puramente secundárias. Mas, no Reino de Deus, o prático e o espiritual caminham em absoluta harmonia. Todo trabalho feito com amor glorifica ao Senhor.",
    bibleBase: {
      verse: "Tudo o que fizerem, façam de todo o coração, como para o Senhor.",
      reference: "Colossenses 3:23",
      commentary: "A atitude espiritual de excelência e dedicação se expressa tanto na pregação quanto no zelo em recolher os lixos e perfilar os assentos."
    },
    sections: [
      {
        title: "A Mentalidade de Serviço Prático",
        content: "A nobreza no serviço do Reino reside unicamente na fidelidade. Não existem tarefas de menor importância perante os olhos de Cristo, que lavou voluntariamente os pés lamacentos de Seus discípulos.",
        points: [
          "Arrumar o templo e limpar os sanitários constitui real ministério.",
          "Zelar pela manutenção e qualidade dos equipamentos de som é adoração prática.",
          "Resolver imprevistos logísticos (cadeiras extras, falta de água) reflete cuidado da liderança de Deus."
        ]
      },
      {
        title: "Preparação Anterior e Posterior ao Culto",
        content: "Um culto de ordem exige preparação metódica que se inicia várias horas antes da congregação chegar e permanece mesmo após a oração de bênção de término:",
        points: [
          "Antes do Culto: Testar cabos e microfones para evitar falhas ou distrações logísticas, conferir a limpeza dos sanitários, disponibilizar copos de água fresca no altar e organizar as bíblias e folhetos de leitura.",
          "Depois do Culto: Verificar se todos os microfones e luzes foram devidamente desligados para economizar energia, examinar se algum objeto de valor foi deixado nos assentos, recolher lixos remanescentes e trancar portas com absoluta segurança física."
        ]
      },
      {
        title: "Serviço Prático em Eventos e Trabalho de Equipe",
        content: "Eventos e grandes congressos exigem planejamento dinâmico estruturado e sintonia total das equipes de recepção e apoio. É nesse cenário que o orgulho de posições individuais deve ser extinto, primando pela cooperação mútua em amor.",
        points: [
          "Zelar pelas escalas e respeitar as orientações estritas dos coordenadores designados.",
          "Ajudar o companheiro de ministério sem comentários sarcásticos ou sentimentos de inveja e disputa por espaço público.",
          "Estar pronto para ouvir muito, aceitar correções rápidas e guardar silêncio oportuno perante momentos de crise pontual."
        ],
        verses: [
          { text: "Melhor é serem dois do que um, porque têm melhor paga do seu trabalho.", reference: "Eclesiastes 4:9" }
        ]
      }
    ],
    reflectionQuestions: [
      "Eu realizo as tarefas de higienização do templo com o mesmo entusiasmo que tenho ao subir no púlpito da igreja?",
      "Tenho sido pontual com os horários de preparação prévia combinados com a minha equipe?",
      "Trabalho de forma harmoniosa em equipe ou insisto em agir de modo centralizador e individualista?"
    ],
    quiz: [
      {
        id: 1,
        question: "Por que as tarefas de arrumação física e higienização do templo são consideradas ministério espiritual?",
        options: [
          "Porque ajudam o obreiro a obter uma remuneração eclesiástica digna.",
          "Porque livram o pastor destas obrigações civis secundárias.",
          "Porque no Reino de Deus o prático e o espiritual caminham em união para glorificar a Deus e acolher o Seu povo.",
          "Porque permitem obter elogios públicos e aumentar a visibilidade diante do rebanho."
        ],
        correctOption: 2,
        explanation: "Todo trabalho voltado para o bem-estar e o acolhimento do rebanho e feito com amor representa adoração verdadeira de excelência."
      }
    ]
  },
  {
    id: 6,
    title: "Módulo Final — O Obreiro Aprovado",
    subtitle: "Consagração do Serviço, Autoavaliação e o Compromisso Firme com o Altar",
    introduction: "Chegar ao final de um longo ciclo de fundamentação prática não representa o fim das disciplinas de aprendizado, mas sim o início de uma desafiadora jornada contundente de amadurecimento e serviço diligente sob o olhar atento do Senhor.",
    bibleBase: {
      verse: "Procure apresentar-se a Deus aprovado, como obreiro que não tem do que se envergonhar.",
      reference: "2 Timóteo 2:15",
      commentary: "A autêntica aprovação é concedida por Deus, decorrente de uma caminhada perseverante pautada na verdade, integridade e fidelidade moral."
    },
    sections: [
      {
        title: "O que Define Legitimamente o Obreiro Aprovado?",
        content: "Aprendemos ao longo deste manual que o crivo de aprovação ministerial de Deus difere de forma extrema dos critérios valorizados pelas ambições mundanas de status:",
        points: [
          "Não é medido por anos de membresia institucional estática.",
          "Não advém de influências financeiras ou posse de títulos imponentes.",
          "Diz respeito à integridade demonstrada no silêncio e nas pequeninas coisas da vida cotidiana.",
          "Obreiro aprovado é confiável, submisso à liderança constituída e age como um pacificador que dissipa fofocas e une o corpo."
        ]
      },
      {
        title: "Perseverança nos Negócios do Reino",
        content: "Muitos iniciam as suas atividades eclesiásticas com ardente zelo, entusiasmo e dedicação arrebatada, mas abandonam a obra perante as primeiras tribulações, rusgas da equipe ou ausência de elogios. Começar com empolgação é trivial, mas permanecer fiel até o fim constitui o verdadeiro teste de maturidade do caráter cristão.",
        points: [
          "Cultivar vigilância implacável contra o orgulho e complexos de superioridade.",
          "Aceitar repressões e orientações da liderança local com humilde discernimento.",
          "Manter a constância inabalável na vida devocional secreta independentemente de suas atribulações particulares."
        ]
      },
      {
        title: "O Termo de Compromisso Solene",
        content: "Diante de Deus e das testemunhas congregadas, o obreiro aprovado assume o compromisso vitalício de servir à igreja local, de forma submissa, com o coração puro, resguardando a ética, defendendo a unidade comum e promovendo a santidade prática diária no poder do Espírito Santo.",
        verses: [
          { text: "Sê fiel até à morte, e dar-te-ei a coroa da vida.", reference: "Apocalipse 2:10" },
          { text: "Muito bem, servo bom e fiel. Sobre o pouco foste fiel, sobre o muito te colocarei.", reference: "Mateus 25:21" }
        ]
      }
    ],
    reflectionQuestions: [
      "Quais áreas do meu caráter pessoal ainda clamam por correção dolorosa perante a presença santificadora de Deus?",
      "Eu atuo prioritariamente buscando a aprovação imediata das pessoas ou o julgamento eterno do Senhor?",
      "Assumo com temor e alegria este honroso encargo vitalício de servir e auxiliar a igreja local?"
    ],
    quiz: [
      {
        id: 1,
        question: "Com base no Módulo Final, o principal teste de maturidade do obreiro verdadeiro é:",
        options: [
          "Sua capacidade teológica de vencer debates complexos perante dissidentes.",
          "A empolgação com que começa as novas frentes pastorais.",
          "A sua constância, perseverança e fidelidade espiritual ao longo do tempo.",
          "O número de tarefas que ele assume sozinho de forma centralizadora."
        ],
        correctOption: 2,
        explanation: "Começar bem é importante, mas o obreiro aprovado se descobre na perseverança leal diante do tempo, desafios e frustrações rotineiras."
      }
    ]
  }
];
