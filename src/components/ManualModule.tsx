import React, { useState, useEffect } from "react";
import { StudyModule } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Clock, BookOpen, HelpCircle, Check, RotateCcw, MessageSquare, AlertCircle, Award } from "lucide-react";

interface ManualModuleProps {
  module: StudyModule;
  onComplete: (moduleId: number) => void;
  isCompleted: boolean;
  isDarkReaderMode?: boolean;
}

export default function ManualModule({ module, onComplete, isCompleted, isDarkReaderMode = false }: ManualModuleProps) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Load reflections from localStorage
  useEffect(() => {
    const savedReflections = localStorage.getItem(`reflections_module_${module.id}`);
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    } else {
      setReflections({});
    }

    // Reset quiz states when change module
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);
    setActiveSection(0);
  }, [module.id]);

  const handleReflectionChange = (qIndex: number, text: string) => {
    const updated = { ...reflections, [qIndex]: text };
    setReflections(updated);
    localStorage.setItem(`reflections_module_${module.id}`, JSON.stringify(updated));
  };

  const handleOptionSelect = (qId: number, optIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIndex });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    module.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOption) {
        score++;
      }
    });
    setQuizScore(score);
    setSubmittedQuiz(true);
    if (score === module.quiz.length) {
      onComplete(module.id);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(0);
  };

  return (
    <div id={`module-study-${module.id}`} className="space-y-6">
      {/* Intro Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="space-y-4 max-w-2xl relative z-10">
          <span className="text-amber-500 font-mono text-sm tracking-widest uppercase font-semibold">
            Curso de Capacitação
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {module.title}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {module.introduction}
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>{module.sections.length} Tópicos Práticos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Média: 15-20 min de leitura</span>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-1 text-emerald-400">
                <Check className="w-4 h-4" />
                <span>Módulo Concluído</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scripture Foundation */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold mt-1">
            v.
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider text-amber-500 font-semibold">
              Base Bíblica Fundamental
            </span>
            <p className="text-slate-800 italic font-medium text-lg leading-relaxed">
              &ldquo;{module.bibleBase.verse}&rdquo;
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-sm font-semibold font-mono text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">
                {module.bibleBase.reference}
              </span>
              <p className="text-slate-500 text-xs italic">
                {module.bibleBase.commentary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Step Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block px-1">
            Tópicos do Módulo
          </span>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
            {module.sections.map((sect, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 shrink-0 lg:shrink ${
                  activeSection === idx
                    ? "bg-slate-900 border-amber-500 text-white font-medium shadow-md"
                    : isDarkReaderMode
                      ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono ${
                    activeSection === idx ? "bg-amber-500 text-slate-900 font-bold" : "bg-slate-100 text-slate-500"
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="truncate">{sect.title}</span>
                </div>
              </button>
            ))}

            {/* Quiz & Reflection navigation triggers */}
            <button
              onClick={() => setActiveSection(module.sections.length)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 shrink-0 lg:shrink ${
                activeSection === module.sections.length
                  ? "bg-amber-500 border-amber-600 text-slate-950 font-semibold shadow-md"
                  : "bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20 text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                <span>Avaliação Prática</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className={`border rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col transition-colors duration-300 ${
          isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <AnimatePresence mode="wait">
            {activeSection < module.sections.length ? (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-grow"
              >
                <div>
                  <h3 className={`text-xl font-bold mb-2 border-b pb-3 transition-colors ${
                    isDarkReaderMode ? "text-amber-400 border-slate-800" : "text-slate-900 border-slate-100"
                  }`}>
                    {module.sections[activeSection].title}
                  </h3>
                  <p className={`text-base leading-relaxed whitespace-pre-line transition-colors ${
                    isDarkReaderMode ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {module.sections[activeSection].content}
                  </p>
                </div>

                {/* Bullets points if exist */}
                {module.sections[activeSection].points && (
                  <div className={`space-y-3 p-4 rounded-xl border transition-colors ${
                    isDarkReaderMode ? "bg-slate-950/70 border-slate-800/80 text-slate-300" : "bg-slate-50 border-slate-105 text-slate-700"
                  }`}>
                    <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold block">
                      Ensinos Fundamentais
                    </span>
                    <ul className="space-y-2.5">
                      {module.sections[activeSection].points?.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm">
                          <Check className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Comparison Table if exists (e.g. Servir x Aparecer) */}
                {module.sections[activeSection].comparisonTable && (
                  <div className={`border rounded-xl overflow-hidden shadow-sm transition-colors ${
                    isDarkReaderMode ? "border-slate-850" : "border-slate-200"
                  }`}>
                    <div className="grid grid-cols-2 bg-slate-900 text-white font-mono text-xs font-semibold px-4 py-2.5">
                      <div>{module.sections[activeSection].comparisonTable?.titleA}</div>
                      <div className="border-l border-slate-700 pl-4">{module.sections[activeSection].comparisonTable?.titleB}</div>
                    </div>
                    <div className={`divide-y ${isDarkReaderMode ? "divide-slate-800" : "divide-slate-100"}`}>
                      {module.sections[activeSection].comparisonTable?.items.map((row, rIdx) => (
                        <div key={rIdx} className={`grid grid-cols-2 gap-4 p-3 text-xs md:text-sm transition-colors ${
                          isDarkReaderMode ? "bg-slate-950 hover:bg-slate-900/60" : "bg-white hover:bg-slate-50"
                        }`}>
                          <div className="text-red-650 font-medium flex items-start gap-1">
                            <span className="text-red-500 shrink-0">✕</span>
                            <span>{row.itemA}</span>
                          </div>
                          <div className={`text-emerald-500 font-medium flex items-start gap-1 border-l pl-4 ${
                            isDarkReaderMode ? "border-slate-800" : "border-slate-100"
                          }`}>
                            <span className="text-emerald-500 shrink-0">✓</span>
                            <span>{row.itemB}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section Scripture Verses */}
                {module.sections[activeSection].verses && (
                  <div className={`rounded-xl p-4 border space-y-3 transition-colors ${
                    isDarkReaderMode ? "bg-slate-950/70 border-slate-850" : "bg-slate-50 border-slate-100"
                  }`}>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                      Referências de Apoio
                    </span>
                    {module.sections[activeSection].verses?.map((v, vIdx) => (
                      <div key={vIdx} className="border-l-2 border-amber-500 pl-3 py-1">
                        <p className={`text-sm font-medium italic ${isDarkReaderMode ? "text-slate-200" : "text-slate-800"}`}>
                          &ldquo;{v.text}&rdquo;
                        </p>
                        <span className="text-xs font-mono text-amber-600 font-semibold">{v.reference}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Read Button */}
                <div className={`pt-4 border-t flex justify-end ${isDarkReaderMode ? "border-slate-800" : "border-slate-100"}`}>
                  <button
                    onClick={() => {
                      if (activeSection < module.sections.length - 1) {
                        setActiveSection(activeSection + 1);
                      } else {
                        setActiveSection(module.sections.length);
                      }
                    }}
                    className={`border border-transparent px-5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isDarkReaderMode
                        ? "bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {activeSection < module.sections.length - 1 ? "Próximo Tópico →" : "Ir para Avaliação →"}
                  </button>
                </div>
              </motion.div>
            ) : (
              // Quiz and Reflection questionnaire page
              <motion.div
                key="assessment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-grow"
              >
                <div>
                  <h3 className={`text-xl font-bold mb-2 border-b pb-3 flex items-center gap-2 ${
                    isDarkReaderMode ? "text-amber-400 border-slate-800" : "text-slate-900 border-slate-100"
                  }`}>
                    <Award className="w-6 h-6 text-amber-500" />
                    <span>Caderno de Exercícios e Quiz</span>
                  </h3>
                  <p className={`${isDarkReaderMode ? "text-slate-400" : "text-slate-500"} text-sm`}>
                    Para consolidar seu progresso na matéria, responda às questões reflexivas de autoavaliação e faça o teste final do módulo.
                  </p>
                </div>

                {/* Reflection questions inputs */}
                <div className="space-y-4">
                  <div className={`flex items-center gap-2 font-semibold text-sm ${isDarkReaderMode ? "text-slate-200" : "text-slate-800"}`}>
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Autoavaliação Pessoal (Suas anotações são salvas localmente)</span>
                  </div>
                  <div className="space-y-4">
                    {module.reflectionQuestions.map((qText, qIdx) => (
                      <div key={qIdx} className={`space-y-2 p-4 rounded-xl border ${
                        isDarkReaderMode ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50/50 border-slate-200/50"
                      }`}>
                        <label className={`text-sm font-medium leading-relaxed block ${isDarkReaderMode ? "text-slate-300" : "text-slate-700"}`}>
                          {qIdx + 1}. {qText}
                        </label>
                        <textarea
                          placeholder="Digite aqui sua reflexão sincera..."
                          value={reflections[qIdx] || ""}
                          onChange={(e) => handleReflectionChange(qIdx, e.target.value)}
                          rows={3}
                          className={`w-full text-sm rounded-xl px-4 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all placeholder:text-slate-400 ${
                            isDarkReaderMode
                              ? "bg-slate-900 border-slate-800 text-slate-100"
                              : "bg-white border-slate-200 text-slate-800"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Multiple Choice Quiz Section */}
                <div className={`space-y-5 border-t pt-6 ${isDarkReaderMode ? "border-slate-850" : "border-slate-100"}`}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className={`flex items-center gap-2 font-bold text-sm ${isDarkReaderMode ? "text-slate-200" : "text-slate-800"}`}>
                      <HelpCircle className="w-5 h-5 text-amber-500" />
                      <span>Quiz Interativo de Aprovação</span>
                    </div>
                    {isCompleted && (
                      <div className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold font-mono">
                        ✓ APROVADO NESTE MÓDULO
                      </div>
                    )}
                  </div>

                  <div className="space-y-5">
                    {module.quiz.map((qObj) => {
                      const isCorrectAnswerSelected = selectedAnswers[qObj.id] === qObj.correctOption;
                      const hasSelected = selectedAnswers[qObj.id] !== undefined;

                      return (
                        <div key={qObj.id} className={`space-y-3 p-4 rounded-xl border ${
                          isDarkReaderMode ? "border-slate-850 bg-slate-950/40" : "border-slate-105 bg-slate-50/20"
                        }`}>
                          <p className={`text-sm font-bold leading-relaxed ${isDarkReaderMode ? "text-slate-200" : "text-slate-800"}`}>
                            {qObj.question}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {qObj.options.map((opt, oIdx) => {
                              const isSelected = selectedAnswers[qObj.id] === oIdx;
                              let btnClass = isDarkReaderMode
                                ? "border-slate-800 hover:border-slate-700 hover:bg-slate-900 bg-slate-900/60 text-slate-300"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white text-slate-700";

                              if (isSelected) {
                                btnClass = isDarkReaderMode
                                  ? "border-amber-500 bg-amber-500/20 text-amber-300 font-semibold"
                                  : "border-amber-500 bg-amber-500/10 text-amber-900 font-semibold";
                              }

                              if (submittedQuiz) {
                                if (oIdx === qObj.correctOption) {
                                  // Highlight correct option
                                  btnClass = "border-emerald-555 bg-emerald-900/40 text-emerald-300 font-semibold";
                                } else if (isSelected && !isCorrectAnswerSelected) {
                                  // Highlight wrong selected option
                                  btnClass = "border-red-555 bg-red-950/40 text-red-300 font-semibold";
                                } else {
                                  btnClass = isDarkReaderMode
                                    ? "border-slate-850 opacity-40 text-slate-555 bg-slate-900/20 cursor-not-allowed"
                                    : "border-slate-100 opacity-60 text-slate-400 bg-white cursor-not-allowed";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={submittedQuiz}
                                  onClick={() => handleOptionSelect(qObj.id, oIdx)}
                                  className={`text-left px-4 py-2.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${btnClass}`}
                                >
                                  <div className="flex gap-2 items-start">
                                    <span className="font-mono opacity-80 shrink-0 font-bold">
                                      {String.fromCharCode(65 + oIdx)})
                                    </span>
                                    <span>{opt}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Show explanation and score of correct answer after submitting */}
                          {submittedQuiz && (
                            <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                              isCorrectAnswerSelected
                                ? "bg-emerald-50/50 border-emerald-100 text-emerald-900"
                                : "bg-red-50/50 border-red-100 text-red-900"
                            }`}>
                              <div className="flex gap-2 items-start">
                                {isCorrectAnswerSelected ? (
                                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <span className="font-bold block mb-1">
                                    {isCorrectAnswerSelected ? "Parabéns, resposta certa!" : "Ops, resposta incorreta!"}
                                  </span>
                                  <p>{qObj.explanation}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions for quiz submission */}
                  <div className={`pt-4 border-t flex items-center justify-between flex-wrap gap-4 ${isDarkReaderMode ? "border-slate-850" : "border-slate-100"}`}>
                    {!submittedQuiz ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < module.quiz.length}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          Object.keys(selectedAnswers).length === module.quiz.length
                            ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md font-bold"
                            : isDarkReaderMode
                              ? "bg-slate-850 text-slate-600 cursor-not-allowed border border-slate-800"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        }`}
                      >
                        Enviar Respostas e Completar
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold font-mono px-3.5 py-1.5 rounded-lg border ${
                          quizScore === module.quiz.length
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          Resultado: {quizScore} / {module.quiz.length} Acertos
                        </span>

                        <button
                          onClick={handleResetQuiz}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                            isDarkReaderMode
                              ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                              : "hover:bg-slate-100 border-slate-200 text-slate-600"
                          }`}
                        >
                          <RotateCcw className="w-4.5 h-4.5" />
                          <span>Refazer Avaliação</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
