import React, { useState, useEffect } from "react";
import { ChecklistItem } from "../types";
import { CheckSquare, Square, RotateCcw, Award, Save, Calendar, CheckCircle, FileText, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const INITIAL_CHECKLISTS: ChecklistItem[] = [
  // Antes do Culto - Preparação Pessoal
  { id: "ant_pess_1", text: "Orei fervorosamente a sós antes de sair de casa para servir", checked: false, category: "preparacao_pessoal" },
  { id: "ant_pess_2", text: "Cheguei ao templo com devida antecedência (30-40 mins)", checked: false, category: "preparacao_pessoal" },
  { id: "ant_pess_3", text: "Vesti-me de forma limpa, respeitosa e com decoro cristão", checked: false, category: "preparacao_pessoal" },
  { id: "ant_pess_4", text: "Estou emocionalmente calmo, focado e espiritualmente pronto para ajudar", checked: false, category: "preparacao_pessoal" },
  { id: "ant_pess_5", text: "Defini precisamente com a coordenação qual será minha escala", checked: false, category: "preparacao_pessoal" },

  // Antes do Culto - Preparação do Ambiente
  { id: "ant_amb_1", text: "Abri as portas principais e organizei a recepção das visitas", checked: false, category: "preparacao_ambiente" },
  { id: "ant_amb_2", text: "Verifiquei e ajustei a iluminação e ventilação adequada do templo", checked: false, category: "preparacao_ambiente" },
  { id: "ant_amb_3", text: "Conferi se sanitários estão abastecidos e higienizados", checked: false, category: "preparacao_ambiente" },
  { id: "ant_amb_4", text: "Organizei as cadeiras com alinhamento e calotei espaços livres de circulação", checked: false, category: "preparacao_ambiente" },

  // Antes do Culto - Materiais e Apoio
  { id: "ant_mat_1", text: "Coloquei a BíbliaSagrada e hinários em ordem no púlpito", checked: false, category: "materiais_apoio" },
  { id: "ant_mat_2", text: "Testei as baterias e funcionamento de todos os microfones do altar", checked: false, category: "materiais_apoio" },
  { id: "ant_mat_3", text: "Disponibilizei água fresca para os pregadores e pastores", checked: false, category: "materiais_apoio" },
  { id: "ant_mat_4", text: "Verifiquei se os cálices e pães da Santa Ceia estão preparados (se aplicável)", checked: false, category: "materiais_apoio" },

  // Antes do Culto - Alinhamento com a Liderança
  { id: "ant_alin_1", text: "Conferi quem dirigirá o culto e qual é o plano da programação literária", checked: false, category: "alinhamento" },
  { id: "ant_alin_2", text: "Perguntei se haverá batismo, apresentações ou apelos especiais", checked: false, category: "alinhamento" },
  { id: "ant_alin_3", text: "Recebi instruções específicas dos obreiros veteranos ou pastor local", checked: false, category: "alinhamento" },

  // Durante o Culto - Postura Espiritual e Comportamental
  { id: "dur_post_1", text: "Mantenho-me inteiramente focado na oração e na pregação (sem distrações)", checked: false, category: "postura" },
  { id: "dur_post_2", text: "Evito sussurros ou conversas paralelas desnecessárias com colegas", checked: false, category: "postura" },
  { id: "dur_post_3", text: "Bani integralmente o uso do celular para fins pessoais enquanto sirvo", checked: false, category: "postura" },
  { id: "dur_post_4", text: "Mantenho fisionomia cordial e postura séria de adoração", checked: false, category: "postura" },

  // Durante o Culto - Atendimento e Acolhimento
  { id: "dur_atend_1", text: "Recebi os novos visitantes com doçura sincera e sorriso cordial", checked: false, category: "atendimento" },
  { id: "dur_atend_2", text: "Auxiliei os idosos e mães com crianças a encontrar assentos confortáveis", checked: false, category: "atendimento" },
  { id: "dur_atend_3", text: "Fiz contato visual discreto e amparável com quem precisa de apoio", checked: false, category: "atendimento" },

  // Durante o Culto - Ordem no Culto
  { id: "dur_ord_1", text: "Controlo com discrição o fluxo e a movimentação nos corredores", checked: false, category: "ordem" },
  { id: "dur_ord_2", text: "Apoio a organização e coleta amorosa nos momentos dos dízimos", checked: false, category: "ordem" },
  { id: "dur_ord_3", text: "Zelo para que as crianças não corram no altar nem hajam ruídos altos", checked: false, category: "ordem" },

  // Durante o Culto - Apoio à Liderança
  { id: "dur_apoio_1", text: "Ajusto volumes ou corrijo microfone e som sem interromper a pregação", checked: false, category: "apoio_lideranca" },
  { id: "dur_apoio_2", text: "Permaneço de prontidão física para ajudar no altar se for chamado", checked: false, category: "apoio_lideranca" },
  { id: "dur_apoio_3", text: "Resolvo incidentes discretamente sem gerar alvoroço ou as pessoas notarem", checked: false, category: "apoio_lideranca" },

  // Depois do Culto - Organização Final
  { id: "dep_org_1", text: "Recolhi batinas, jalecos ou microfones guardando-os no armário chaveado", checked: false, category: "organizacao_final" },
  { id: "dep_org_2", text: "Desliguei equipamentos do som, ventiladores, ar condicionados e PCs", checked: false, category: "organizacao_final" },
  { id: "dep_org_3", text: "Organizei as fileiras de cadeiras e recolhi lixos do chão", checked: false, category: "organizacao_final" },
  { id: "dep_org_4", text: "Verifiquei banheiros e certifiquei que as janelas e portas estão trancadas", checked: false, category: "organizacao_final" },

  // Depois do Culto - Cuidado com as Pessoas
  { id: "dep_cuid_1", text: "Fui cumprimentar pessoalmente e dar as boas-vindas às visitas", checked: false, category: "cuidado_pessoas" },
  { id: "dep_cuid_2", text: "Direcionei as pessoas recém-convertidas até a equipe de discipulado/pastor", checked: false, category: "cuidado_pessoas" },
  { id: "dep_cuid_3", text: "Exerci empatia e orei por irmãos doentes ou angustiados após a bênção", checked: false, category: "cuidado_pessoas" },

  // Depois do Culto - Comunicação com a Liderança
  { id: "dep_com_1", text: "Reportei ao coordenador do culto ou pastor as intercorrências de saúde", checked: false, category: "comunicacao_lideranca" },
  { id: "dep_com_2", text: "Relatei de forma sigilosa eventuais desentendimentos ou problemas graves", checked: false, category: "comunicacao_lideranca" },
  { id: "dep_com_3", text: "Recebi a escala e as orientações finais de serviço da semana seguinte", checked: false, category: "comunicacao_lideranca" }
];

interface ChecklistsProps {
  isDarkReaderMode?: boolean;
}

export default function Checklists({ isDarkReaderMode = false }: ChecklistsProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [activeStage, setActiveStage] = useState<"antes" | "durante" | "depois">("antes");
  const [diaryNote, setDiaryNote] = useState("");
  const [churchName, setChurchName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedChecklist = localStorage.getItem("obreiro_checklist_items");
    const savedNote = localStorage.getItem("obreiro_ministry_diary_note");
    const savedChurch = localStorage.getItem("obreiro_church_config");

    if (savedChecklist) {
      setItems(JSON.parse(savedChecklist));
    } else {
      setItems(INITIAL_CHECKLISTS);
    }

    if (savedNote) setDiaryNote(savedNote);
    if (savedChurch) setChurchName(savedChurch);
  }, []);

  const handleToggle = (id: string) => {
    const updated = items.map(it => it.id === id ? { ...it, checked: !it.checked } : it);
    setItems(updated);
    localStorage.setItem("obreiro_checklist_items", JSON.stringify(updated));
  };

  const handleResetStage = () => {
    const currentCategoryPrefixes = {
      antes: ["ant_pess", "ant_amb", "ant_mat", "ant_alin"],
      durante: ["dur_post", "dur_atend", "dur_ord", "dur_apoio"],
      depois: ["dep_org", "dep_cuid", "dep_com"]
    };

    const targetPrefixes = currentCategoryPrefixes[activeStage];
    const updated = items.map(it => {
      const match = targetPrefixes.some(pref => it.id.startsWith(pref));
      return match ? { ...it, checked: false } : it;
    });

    setItems(updated);
    localStorage.setItem("obreiro_checklist_items", JSON.stringify(updated));
  };

  const handleResetAll = () => {
    if (window.confirm("Deseja realmente esvaziar todo o seu progresso da escala atual?")) {
      const reseted = INITIAL_CHECKLISTS;
      setItems(reseted);
      localStorage.setItem("obreiro_checklist_items", JSON.stringify(reseted));
    }
  };

  const handleSaveDiary = () => {
    localStorage.setItem("obreiro_ministry_diary_note", diaryNote);
    localStorage.setItem("obreiro_church_config", churchName);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Helper calculating progress
  const getProgressData = (stage: "antes" | "durante" | "depois") => {
    const prefixes = {
      antes: ["ant_pess", "ant_amb", "ant_mat", "ant_alin"],
      durante: ["dur_post", "dur_atend", "dur_ord", "dur_apoio"],
      depois: ["dep_org", "dep_cuid", "dep_com"]
    };

    const stageItems = items.filter(it => prefixes[stage].some(pref => it.id.startsWith(pref)));
    const total = stageItems.length;
    const checkedCount = stageItems.filter(it => it.checked).length;
    const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

    return { total, checkedCount, percent, stageItems };
  };

  const currentStats = getProgressData(activeStage);
  const totalCompleted = items.filter(it => it.checked).length;
  const overallPercent = items.length > 0 ? Math.round((totalCompleted / items.length) * 100) : 0;

  // Render categories within current stage
  const getSubcategories = (stage: "antes" | "durante" | "depois") => {
    if (stage === "antes") {
      return [
        { key: "preparacao_pessoal", label: "🔒 1. Preparação Pessoal do Obreiro" },
        { key: "preparacao_ambiente", label: "⛪ 2. Preparação Física do Ambiente" },
        { key: "materiais_apoio", label: "🎤 3. Materiais de Apoio e Altar" },
        { key: "alinhamento", label: "💬 4. Alinhamento com a Liderança" }
      ];
    } else if (stage === "durante") {
      return [
        { key: "postura", label: "🙏 1. Postura Espiritual e Foco" },
        { key: "atendimento", label: "👐 2. Atendimento e Recepção" },
        { key: "ordem", label: "🚪 3. Preservação de Ordem e Silêncio" },
        { key: "apoio_lideranca", label: "💡 4. Apoio Imediato à Liderança" }
      ];
    } else {
      return [
        { key: "organizacao_final", label: "🧹 1. Organização e Encerramento Físico" },
        { key: "cuidado_pessoas", label: "❤️ 2. Acolhimento e Consolidação Pessoal" },
        { key: "comunicacao_lideranca", label: "🤝 3. Prestação de Contas e Alinhamento" }
      ];
    }
  };

  const subcats = getSubcategories(activeStage);

  return (
    <div className="space-y-6">
      {/* Overall Progress Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="w-5.5 h-5.5 text-amber-500" />
              <span>Gabarito Diário do Obreiro</span>
            </h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Trabalhe com reverência e exatidão. Complete os procedimentos e tenha certeza de que nenhum detalhe do culto passará despercebido.
            </p>
          </div>
          <div className="shrink-0 text-center md:text-right bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700/50">
            <span className="text-xs uppercase font-mono text-amber-500 font-bold block mb-1">Carga de Conclusão Total</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-mono text-white">{overallPercent}%</span>
              <span className="text-xs text-slate-400 font-mono">({totalCompleted} de {items.length} itens)</span>
            </div>
          </div>
        </div>

        {/* Global Progress slide meter */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Main Workflow panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Setup checklist variables and note tool */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Stage selector */}
          <div className={`border rounded-2xl p-5 shadow-sm space-y-3 transition-colors duration-300 ${
            isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-widest">
              Estágio da Escala
            </span>
            <div className="space-y-2">
              {[
                { id: "antes", title: "1. Antes do Culto", desc: "Preparação Espiritual e Logística" },
                { id: "durante", title: "2. Durante o Culto", desc: "Reverência, Suporte e Proteção" },
                { id: "depois", title: "3. Depois do Culto", desc: "Zelo, Retorno e Comunicação" }
              ].map((stg) => {
                const isActive = activeStage === stg.id;
                const pct = getProgressData(stg.id as any).percent;

                return (
                  <button
                    key={stg.id}
                    onClick={() => setActiveStage(stg.id as any)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-md"
                        : isDarkReaderMode
                          ? "bg-slate-950 hover:bg-slate-800 border-slate-850 hover:border-slate-800 text-slate-300"
                          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold">{stg.title}</h4>
                        <p className={`text-xs ${isActive ? "text-slate-405" : "text-slate-400"}`}>{stg.desc}</p>
                      </div>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isActive ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                        {pct}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleResetAll}
                className="w-full py-2 hover:bg-red-50 text-red-600 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar Tudo</span>
              </button>
            </div>
          </div>

          {/* Ministry Log / Note Scrap book */}
          <div className={`border rounded-2xl p-5 shadow-sm space-y-4 transition-colors duration-300 ${
            isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-805"
          }`}>
            <h4 className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
              isDarkReaderMode ? "text-amber-500 border-slate-850" : "text-slate-900 border-slate-100"
            }`}>
              <FileText className="w-4.5 h-4.5 text-amber-500" />
              <span>Notas Rápidas do Culto</span>
            </h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono uppercase block">Local ou Paróquia</label>
                <input
                  type="text"
                  placeholder="Ex: Igreja Central"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  className={`w-full text-xs border rounded-lg px-3 py-2 outline-none w-full transition-colors ${
                    isDarkReaderMode
                      ? "bg-slate-950 border-slate-850 text-slate-105 focus:border-amber-500"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"
                  }`}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-mono uppercase block">Relatório / Ocorrências Importantes</label>
                <textarea
                  placeholder="Escreva intercorrências de saúde, incidentes do som, nomes de novos convertidos e observações para relatar ao pastor..."
                  value={diaryNote}
                  onChange={(e) => setDiaryNote(e.target.value)}
                  rows={4}
                  className={`w-full text-xs border rounded-lg p-3 outline-none transition-colors ${
                    isDarkReaderMode
                      ? "bg-slate-950 border-slate-850 text-slate-105 focus:border-amber-500"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"
                  }`}
                />
              </div>

              <button
                onClick={handleSaveDiary}
                className={`w-full rounded-xl py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isDarkReaderMode
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaved ? "Salvo com sucesso!" : "Salvar Notas"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right columns: Interactive Checklist Viewer */}
        <div className={`border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-300 ${
          isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-105" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <div className="space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDarkReaderMode ? "border-slate-850" : "border-slate-100"
            }`}>
              <div className="space-y-1">
                <h3 className={`text-base font-bold ${isDarkReaderMode ? "text-amber-400" : "text-slate-900"}`}>
                  Lista de Prontidão: {activeStage === "antes" ? "Antes do Culto" : activeStage === "durante" ? "Durante o Culto" : "Depois do Culto"}
                </h3>
                <p className={`${isDarkReaderMode ? "text-slate-400" : "text-slate-500"} text-xs`}>
                  Marque cada tarefa completada com zelo. O trabalho voluntário santifica o ambiente.
                </p>
              </div>

              <button
                onClick={handleResetStage}
                className={`text-xs border px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDarkReaderMode
                    ? "text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Esvaziar Etapa</span>
              </button>
            </div>

            {/* Checklist Category groups */}
            <div className="space-y-5">
              {subcats.map((sub) => {
                const subItems = currentStats.stageItems.filter(it => it.category === sub.key);
                if (subItems.length === 0) return null;

                return (
                  <div key={sub.key} className="space-y-2.5">
                    <span className={`text-xs font-extrabold tracking-wide font-sans block pb-1 ${
                      isDarkReaderMode ? "text-slate-300" : "text-slate-800"
                    }`}>
                      {sub.label}
                    </span>
                    <div className="space-y-2">
                      {subItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggle(item.id)}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                            item.checked
                              ? isDarkReaderMode
                                ? "bg-slate-950/40 border-slate-900/60 text-slate-500 line-through"
                                : "bg-slate-100/50 border-slate-200 text-slate-400 line-through"
                              : isDarkReaderMode
                                ? "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-200"
                                : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800"
                          }`}
                        >
                          <button
                            className="shrink-0 mt-0.5"
                            aria-label={`Tarefa: ${item.text}`}
                          >
                            {item.checked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-500 fill-emerald-50 shrink-0" />
                            ) : (
                              <Square className={`w-5 h-5 shrink-0 ${isDarkReaderMode ? "text-slate-750 bg-slate-950" : "text-slate-300 bg-white"}`} />
                            )}
                          </button>
                          <span className="text-xs md:text-sm font-medium leading-relaxed">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Footer */}
          {currentStats.percent === 100 && (
            <div className={`mt-8 border rounded-xl p-4 flex items-center gap-3 ${
              isDarkReaderMode ? "bg-emerald-950/20 border-emerald-900/40" : "bg-emerald-50 border-emerald-200"
            }`}>
              <Award className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <span className={`text-sm font-bold block ${isDarkReaderMode ? "text-emerald-400" : "text-emerald-950"}`}>Perfeito! Preparação Completa.</span>
                <p className={`text-xs ${isDarkReaderMode ? "text-emerald-500/80" : "text-emerald-800"}`}>
                  Você concluiu com maestria todos os pontos recomendados nesta etapa. Deus o recompense pela sua dedicação!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
