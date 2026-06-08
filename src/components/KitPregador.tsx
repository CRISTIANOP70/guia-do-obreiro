import React, { useState, useEffect } from "react";
import { PREACHER_PROFILES, VOCAL_EXERCISES } from "../data/preacher";
import { SermonDraft, PreacherProfile, VocalExercise } from "../types";
import { Feather, BookOpen, Clock, Activity, Award, Plus, Trash2, Copy, Check, Play, Pause, RotateCcw, Globe, Flame, Shield, HelpCircle, Save } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface KitPregadorProps {
  isDarkReaderMode?: boolean;
}

export default function KitPregador({ isDarkReaderMode = false }: KitPregadorProps) {
  const [activeTab, setActiveTab] = useState<"orator" | "outline" | "vocal">("orator");

  // State variables for Sermon Builder
  const [drafts, setDrafts] = useState<SermonDraft[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  const [sName, setSName] = useState("");
  const [sTheme, setSTheme] = useState("");
  const [sPassage, setSPassage] = useState("");
  const [sIntro, setSIntro] = useState("");
  const [sPoints, setSPoints] = useState<string[]>([""]);
  const [sIllustration, setSIllustration] = useState("");
  const [sConclusion, setSConclusion] = useState("");

  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState(false);

  // State variables for Vocal Exercise Timer
  const [activeExercise, setActiveExercise] = useState<VocalExercise | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerStage, setTimerStage] = useState<"inspire" | "segure" | "expire">("inspire");
  const [cycleCounter, setCycleCounter] = useState(0);

  // Load sermon drafts on mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem("obreiro_sermon_drafts");
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // Vocal Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerIsActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);

        // Interactive inhale/exhale cycles for Diafragmatica tech (4-4-4 seconds loop)
        if (activeExercise?.id === "diaframatica") {
          setCycleCounter((prev) => {
            const next = (prev + 1) % 12;
            if (next < 4) {
              setTimerStage("inspire");
            } else if (next < 8) {
              setTimerStage("segure");
            } else {
              setTimerStage("expire");
            }
            return next;
          });
        }
      }, 1000);
    } else if (timerSeconds === 0 && timerIsActive) {
      setTimerIsActive(false);
      alert("Excelente! Exercício vocal finalizado com sucesso!");
    }
    return () => clearInterval(interval);
  }, [timerIsActive, timerSeconds, activeExercise?.id]);

  const handleStartExercise = (ex: VocalExercise) => {
    setActiveExercise(ex);
    setTimerSeconds(ex.durationSeconds);
    setTimerIsActive(true);
    setCycleCounter(0);
    setTimerStage("inspire");
  };

  const handlePauseResumeTimer = () => {
    setTimerIsActive(!timerIsActive);
  };

  const handleResetTimer = () => {
    if (activeExercise) {
      setTimerSeconds(activeExercise.durationSeconds);
      setTimerIsActive(false);
      setTimerStage("inspire");
      setCycleCounter(0);
    }
  };

  // Sermon Editor Actions
  const handleAddNewPoint = () => {
    setSPoints([...sPoints, ""]);
  };

  const handleRemovePoint = (pIdx: number) => {
    if (sPoints.length === 1) return;
    const updated = sPoints.filter((_, idx) => idx !== pIdx);
    setSPoints(updated);
  };

  const handlePointChange = (pIdx: number, val: string) => {
    const updated = [...sPoints];
    updated[pIdx] = val;
    setSPoints(updated);
  };

  const handleCreateNewSermon = () => {
    setSelectedDraftId(null);
    setSName("");
    setSTheme("");
    setSPassage("");
    setSIntro("");
    setSPoints([""]);
    setSIllustration("");
    setSConclusion("");
  };

  const handleSaveSermon = () => {
    if (!sName.trim()) {
      alert("Por favor, dê um título ao seu esboço de sermão.");
      return;
    }

    const nextId = selectedDraftId || `sermon_${Date.now()}`;
    const newDraft: SermonDraft = {
      id: nextId,
      title: sName,
      theme: sTheme,
      keyVerse: sPassage,
      introduction: sIntro,
      bodyPoints: sPoints.filter((p) => p.trim() !== ""),
      illustration: sIllustration,
      conclusion: sConclusion,
      createdAt: new Date().toLocaleDateString("pt-BR")
    };

    let updatedList: SermonDraft[] = [];
    if (selectedDraftId) {
      updatedList = drafts.map((d) => (d.id === selectedDraftId ? newDraft : d));
    } else {
      updatedList = [newDraft, ...drafts];
      setSelectedDraftId(nextId);
    }

    setDrafts(updatedList);
    localStorage.setItem("obreiro_sermon_drafts", JSON.stringify(updatedList));
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleDeleteSermon = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Pretende excluir definitivamente este esboço do seu kit?")) {
      const updated = drafts.filter((d) => d.id !== id);
      setDrafts(updated);
      localStorage.setItem("obreiro_sermon_drafts", JSON.stringify(updated));
      if (selectedDraftId === id) {
        handleCreateNewSermon();
      }
    }
  };

  const handleLoadDraft = (d: SermonDraft) => {
    setSelectedDraftId(d.id);
    setSName(d.title);
    setSTheme(d.theme || "");
    setSPassage(d.keyVerse || "");
    setSIntro(d.introduction || "");
    setSPoints(d.bodyPoints.length > 0 ? d.bodyPoints : [""]);
    setSIllustration(d.illustration || "");
    setSConclusion(d.conclusion || "");
  };

  const handleCopySermonToClipboard = (d: SermonDraft, e: React.MouseEvent) => {
    e.stopPropagation();
    // Format full text for pulpit reading
    const textToCopy = `
TÍTULO DO SERMÃO: ${d.title}
TEMA: ${d.theme || "Geral"}
PASSAGEM BÍBLICA: ${d.keyVerse || "Não especificada"}
DATA: ${d.createdAt}

---------------------------------------------------------
1. INTRODUÇÃO (Abertura e Citação):
${d.introduction || "Não escrita."}

2. CORPO DO DISCURSO (Pontos Fundamentais):
${d.bodyPoints.map((pt, idx) => `  - Ponto ${idx + 1}: ${pt}`).join("\n")}

3. ILUSTRAÇÃO OU METÁFORA:
${d.illustration || "Não escrita."}

4. CONCLUSÃO (Apelo à Decisão e Encerramento):
${d.conclusion || "Não escrita."}
---------------------------------------------------------
Criado no Guia Prático do Obreiro
`;

    navigator.clipboard.writeText(textToCopy);
    setCopySuccessId(d.id);
    setTimeout(() => setCopySuccessId(null), 2500);
  };

  const formatTimerValue = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  return (
    <div className="space-y-6">
      {/* Kit header banner */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Feather className="w-5.5 h-5.5 text-amber-500" />
            <span>Kit do Pregador: Comunicação Eficaz no Púlpito</span>
          </h3>
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl">
            Aprimore sua retórica cristã, desenvolva sua clareza de vocalização e crie esboços dinâmicos baseados nas melhores referências e oradores de destaque.
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className={`flex border-b transition-colors duration-300 ${
        isDarkReaderMode ? "border-slate-800" : "border-slate-200"
      }`}>
        {[
          { key: "orator", label: "🎖️ Oradores de Destaque", desc: "Aprenda com Wesley, Spurgeon e Graham" },
          { key: "outline", label: "✍️ Esboçador de Sermões", desc: "Crie e organize suas pregações" },
          { key: "vocal", label: "🫁 Treino de Voz e Dicção", desc: "Exercícios com temporizador dinâmico" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 text-center py-3.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === tab.key
                ? "border-amber-500 text-amber-500 font-bold"
                : isDarkReaderMode
                  ? "border-transparent text-slate-400 hover:text-slate-200"
                  : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="text-xs md:text-sm block">{tab.label}</span>
            <span className="text-[10px] text-slate-400 font-medium hidden md:block">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* Main Content Sections */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === "orator" && (
            <motion.div
              key="orator-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {PREACHER_PROFILES.map((p) => (
                <div key={p.id} className={`border rounded-2xl p-6 shadow-sm space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between ${
                  isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
                }`}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 text-amber-550 rounded-xl">
                        {p.avatar === "Crown" && <Award className="w-6 h-6" />}
                        {p.avatar === "Globe" && <Globe className="w-6 h-6" />}
                        {p.avatar === "Horse" && <Flame className="w-6 h-6" />}
                        {p.avatar === "Activity" && <Activity className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm md:text-base ${isDarkReaderMode ? "text-amber-400" : "text-slate-900"}`}>{p.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span className="text-slate-500 uppercase">{p.title}</span>
                          <span>•</span>
                          <span>{p.era}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-xs md:text-sm leading-relaxed ${isDarkReaderMode ? "text-slate-300" : "text-slate-600"}`}>
                      {p.summary}
                    </p>

                    <div className={`space-y-2.5 pt-3 border-t ${isDarkReaderMode ? "border-slate-850" : "border-slate-100"}`}>
                      <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-bold block">
                        Técnicas Secretas de Sucesso
                      </span>
                      <div className="space-y-2">
                        {p.techniques.map((tech, tIdx) => (
                          <div key={tIdx} className={`p-3 rounded-xl border space-y-1 ${
                            isDarkReaderMode ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50/50 p-3 rounded-xl border border-slate-100"
                          }`}>
                            <span className={`text-xs font-bold block ${isDarkReaderMode ? "text-slate-200" : "text-slate-800"}`}>
                              📍 {tech.title}
                            </span>
                            <p className={`text-xs leading-relaxed ${isDarkReaderMode ? "text-slate-400" : "text-slate-500"}`}>
                              {tech.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "outline" && (
            <motion.div
              key="outline-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Draft list sidebar column */}
              <div className="lg:col-span-1 space-y-4">
                <div className={`border rounded-2xl p-5 shadow-sm space-y-4 transition-colors ${
                  isDarkReaderMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs uppercase font-mono font-bold ${isDarkReaderMode ? "text-slate-400" : "text-slate-500"}`}>Esboços Gravados</h4>
                    <button
                      onClick={handleCreateNewSermon}
                      className="text-xs text-amber-500 hover:text-amber-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Novo</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {drafts.length > 0 ? (
                      drafts.map((d) => {
                        const isSel = selectedDraftId === d.id;
                        const isCopy = copySuccessId === d.id;

                        return (
                          <div
                            key={d.id}
                            onClick={() => handleLoadDraft(d)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer relative group flex justify-between items-start gap-2 ${
                              isSel
                                ? "bg-amber-500 border-amber-600 text-slate-950 font-bold"
                                : isDarkReaderMode
                                  ? "bg-slate-950 hover:bg-slate-800 border-slate-850 text-slate-300"
                                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                            }`}
                          >
                            <div className="space-y-1 min-w-0">
                              <h5 className="text-xs font-bold truncate pr-3">{d.title}</h5>
                              <p className={`text-[10px] truncate ${isSel ? "text-slate-900/80" : "text-slate-500"}`}>
                                Tema: {d.theme || "Livre"} | 📖 {d.keyVerse || "S/Ref"}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => handleCopySermonToClipboard(d, e)}
                                title="Copiar esboço formatado para o clipboard"
                                className={`p-1 hover:bg-slate-100 hover:text-slate-900 rounded ${isSel ? "hover:bg-amber-400 hover:text-slate-950" : ""}`}
                              >
                                {isCopy ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                                )}
                              </button>

                              <button
                                onClick={(e) => handleDeleteSermon(d.id, e)}
                                title="Excluir do kit"
                                className={`p-1 hover:bg-red-50 text-red-600 rounded ${isSel ? "hover:bg-amber-405 text-red-950" : ""}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        Nenhum sermão gravado ainda. Crie o seu primeiro ao lado!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sermon Creator Main input body column */}
              <div className={`lg:col-span-2 border rounded-2xl p-6 shadow-sm space-y-4 transition-colors duration-300 ${
                isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-105" : "bg-white border-slate-200 text-slate-800"
              }`}>
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isDarkReaderMode ? "border-slate-800/80" : "border-slate-100"
                }`}>
                  <h4 className={`font-bold text-sm md:text-base flex items-center gap-2 ${isDarkReaderMode ? "text-amber-400" : "text-slate-900"}`}>
                    <Feather className="w-4.5 h-4.5 text-amber-500" />
                    <span>{selectedDraftId ? "Editando Pregação" : "Novo Esboço de Pregação"}</span>
                  </h4>

                  <div className="flex items-center gap-2">
                    {selectedDraftId && (
                      <button
                        onClick={handleCreateNewSermon}
                        className={`text-xs border px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDarkReaderMode
                            ? "text-slate-300 border-slate-805 hover:bg-slate-800"
                            : "text-slate-500 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Limpar / Novo
                      </button>
                    )}

                    <button
                      onClick={handleSaveSermon}
                      className={`rounded-lg text-xs font-semibold px-4 py-1.5 transition-colors shadow-sm flex items-center gap-1 cursor-pointer ${
                        isDarkReaderMode
                          ? "bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{saveStatus ? "Esboço Guardado!" : "Salvar Esboço"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-black block">Título da Pregação *</label>
                    <input
                      type="text"
                      placeholder="Ex: O Valor de um Caráter Fiel"
                      value={sName}
                      onChange={(e) => setSName(e.target.value)}
                      className={`w-full text-xs md:text-sm border rounded-xl px-3.5 py-2 outline-none transition-colors ${
                        isDarkReaderMode
                          ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                          : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400 font-black block">Tema</label>
                      <input
                        type="text"
                        placeholder="Ex: Altar, Santidade"
                        value={sTheme}
                        onChange={(e) => setSTheme(e.target.value)}
                        className={`w-full text-xs md:text-sm border rounded-xl px-3.5 py-2 outline-none transition-colors ${
                          isDarkReaderMode
                            ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                            : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400 font-black block">Passagem Bíblica</label>
                      <input
                        type="text"
                        placeholder="Ex: Hebreus 12:1"
                        value={sPassage}
                        onChange={(e) => setSPassage(e.target.value)}
                        className={`w-full text-xs md:text-sm border rounded-xl px-3.5 py-2 outline-none transition-colors ${
                          isDarkReaderMode
                            ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                            : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Introduction */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-black flex items-center gap-1">
                      <span>1. Introdução</span>
                      <span className="text-slate-400 font-normal lowercase">(Chame atenção do público)</span>
                    </label>
                    <textarea
                      placeholder="História curta, pergunta provocativa ou o contexto inicial da passagem..."
                      value={sIntro}
                      onChange={(e) => setSIntro(e.target.value)}
                      rows={3}
                      className={`w-full text-xs md:text-sm border rounded-xl p-3 outline-none transition-colors ${
                        isDarkReaderMode
                          ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                          : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                      }`}
                    />
                  </div>

                  {/* Body Points */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono uppercase text-slate-400 font-black flex items-center gap-1">
                        <span>2. Corpo da Pregação (Destaques)</span>
                        <span className="text-slate-400 font-normal lowercase">(Tópicos de estudo)</span>
                      </label>
                      <button
                        onClick={handleAddNewPoint}
                        className="text-xs text-amber-505 hover:text-amber-400 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar Tópico</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {sPoints.map((pt, ptIdx) => (
                        <div key={ptIdx} className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">T{ptIdx + 1}</span>
                          <input
                            type="text"
                            placeholder={`Escreva aqui o ponto principal nº ${ptIdx + 1} de sustentação bíblica...`}
                            value={pt}
                            onChange={(e) => handlePointChange(ptIdx, e.target.value)}
                            className={`w-full text-xs md:text-sm border rounded-xl px-3.5 py-2 outline-none transition-colors ${
                              isDarkReaderMode
                                ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                                : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                            }`}
                          />
                          {sPoints.length > 1 && (
                            <button
                              onClick={() => handleRemovePoint(ptIdx)}
                              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                                isDarkReaderMode
                                  ? "text-red-400 hover:bg-slate-800 hover:text-red-300"
                                  : "text-red-500 hover:bg-red-50 hover:text-red-700"
                              }`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Illustration/Metaphor */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-405 font-black flex items-center gap-1">
                      <span>3. Ilustração ou Analogia</span>
                      <span className="text-slate-400 font-normal lowercase">(Janelas de esclarecimento)</span>
                    </label>
                    <textarea
                      placeholder="Use um testemunho pessoal, história relevante ou metáfora da natureza..."
                      value={sIllustration}
                      onChange={(e) => setSIllustration(e.target.value)}
                      rows={2}
                      className={`w-full text-xs md:text-sm border rounded-xl p-3 outline-none transition-colors ${
                        isDarkReaderMode
                          ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                          : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                      }`}
                    />
                  </div>

                  {/* Conclusion */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-405 font-black flex items-center gap-1">
                      <span>4. Conclusão e Apelo</span>
                      <span className="text-slate-400 font-normal lowercase">(Chamamento ao altar e decisão)</span>
                    </label>
                    <textarea
                      placeholder="Recapitulação rápida e um apelo ao coração para resposta imediata..."
                      value={sConclusion}
                      onChange={(e) => setSConclusion(e.target.value)}
                      rows={2.5}
                      className={`w-full text-xs md:text-sm border rounded-xl p-3 outline-none transition-colors ${
                        isDarkReaderMode
                          ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                          : "bg-slate-50/50 border-slate-200 text-slate-800 focus:border-amber-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vocal" && (
            <motion.div
              key="vocal-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Active Timer visual block panel if exercise started */}
              <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white text-center space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[350px]">
                  {activeExercise ? (
                    <>
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block font-bold">
                          Exercício Ativo
                        </span>
                        <h4 className="font-bold text-sm md:text-base leading-tight">
                          {activeExercise.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Alvo: {activeExercise.target}
                        </p>
                      </div>

                      {/* Interactive Visual Cycle Animation for Diafragmatica */}
                      <div className="py-4 relative flex items-center justify-center">
                        {activeExercise.id === "diaframatica" && timerIsActive && (
                          <div className={`absolute w-36 h-36 rounded-full border opacity-10 transition-all duration-300 ${
                            timerStage === "inspire" ? "border-amber-500 scale-125 animate-ping" : timerStage === "segure" ? "border-amber-200 scale-100" : "border-red-400 scale-75 animate-pulse"
                          }`} />
                        )}

                        <div className="w-32 h-32 rounded-full border-4 border-amber-500 flex flex-col items-center justify-center bg-slate-800/80 shadow-md relative z-10">
                          <span className="text-3xl font-black font-mono tracking-tight text-white">
                            {formatTimerValue(timerSeconds)}
                          </span>
                          {activeExercise.id === "diaframatica" && timerIsActive && (
                            <span className="text-[10px] uppercase font-mono font-extrabold tracking-wide mt-1 text-amber-500">
                              {timerStage === "inspire" ? "🌬️ Inspire" : timerStage === "segure" ? "🛑 Segure" : "💨 Expire"}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={handlePauseResumeTimer}
                            className={`p-2.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                              timerIsActive ? "bg-amber-500 text-slate-950" : "bg-emerald-500 text-white"
                            }`}
                          >
                            {timerIsActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={handleResetTimer}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all"
                          >
                            <RotateCcw className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 italic">
                          Mantenha-se relaxado, postura reta e respire profundamente.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="my-auto space-y-4">
                      <Clock className="w-12 h-12 text-slate-600 mx-auto" />
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-slate-300 block">Nenhum Treino Iniciado</span>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">
                          Selecione um dos exercícios guiados de dicção, respiração ou entonação ao lado e clique em &ldquo;Iniciar&rdquo; para sincronizar o cronômetro.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guided Lessons items columns */}
              <div className="lg:col-span-2 space-y-4">
                {VOCAL_EXERCISES.map((ex) => {
                  const isCur = activeExercise?.id === ex.id;

                  return (
                    <div
                      key={ex.id}
                      className={`border rounded-2xl p-5 shadow-sm space-y-4 transition-all duration-200 ${
                        isCur
                          ? "border-amber-500/80 ring-1 ring-amber-500/5 bg-amber-500/5 shadow-xs"
                          : isDarkReaderMode
                            ? "bg-slate-900 border-slate-805"
                            : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className={`font-bold text-sm md:text-base ${isDarkReaderMode ? "text-amber-400" : "text-slate-900"}`}>{ex.title}</h4>
                          <p className="text-xs text-slate-505">
                            Foco: <span className={`font-medium ${isDarkReaderMode ? "text-slate-300" : "text-slate-700"}`}>{ex.target}</span>
                          </p>
                        </div>

                        <button
                          onClick={() => handleStartExercise(ex)}
                          className={`rounded-lg text-xs font-semibold px-4 py-2 transition-colors shadow-sm flex items-center gap-1 cursor-pointer shrink-0 ${
                            isDarkReaderMode
                              ? "bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold"
                              : "bg-slate-900 text-white hover:bg-slate-800"
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Iniciar ({formatTimerValue(ex.durationSeconds)})</span>
                        </button>
                      </div>

                      <div className={`p-4 rounded-xl border ${
                        isDarkReaderMode ? "bg-slate-950/60 border-slate-800" : "bg-slate-50/50 border-slate-100"
                      }`}>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block pb-1 border-b border-light">
                          Como Praticar (Passo a Passo)
                        </span>
                        <ol className={`space-y-1.5 pt-1.5 list-decimal pl-4.5 text-xs leading-relaxed ${
                          isDarkReaderMode ? "text-slate-300" : "text-slate-605"
                        }`}>
                          {ex.instructions.map((inst, iIdx) => (
                            <li key={iIdx}>{inst}</li>
                          ))}
                        </ol>
                      </div>

                      <p className={`text-xs font-medium p-3 rounded-xl border ${
                        isDarkReaderMode
                          ? "bg-amber-500/5 text-amber-405 border-amber-500/10"
                          : "bg-amber-500/5 text-amber-700 border-amber-500/10"
                      }`}>
                        💡 <span className="font-bold">Dica Exclusiva:</span> {ex.tip}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
