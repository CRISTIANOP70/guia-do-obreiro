import React, { useState, useMemo } from "react";
import { QA_ITEMS } from "../data/qa";
import { QAItem } from "../types";
import { Search, Book, Sparkles, Filter, ChevronDown, ChevronUp, BookOpen, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QAViewProps {
  isDarkReaderMode?: boolean;
}

export default function QAView({ isDarkReaderMode = false }: QAViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tudo");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [randomItem, setRandomItem] = useState<QAItem | null>(null);

  const categories = ["Tudo", "Chamado", "Caráter & Vida Espiritual", "Ética & Equipe", "Correção & Serviço"];

  // Filter items based on search and category tab
  const filteredItems = useMemo(() => {
    return QA_ITEMS.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === "Tudo" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleRandomQuestion = () => {
    const rIdx = Math.floor(Math.random() * QA_ITEMS.length);
    const item = QA_ITEMS[rIdx];
    setRandomItem(item);
    setExpandedId(item.id); // Expand in the list as well
    // Scroll smoothly to this item in list
    const element = document.getElementById(`qa-item-${item.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quiz Card style Header */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5.5 h-5.5 text-amber-500" />
              <span>30 Perguntas e Respostas Ministeriais</span>
            </h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Consulte e tire suas principais dúvidas instantaneamente. Nosso portal é inteiramente alinhado à disciplina eclesiástica e referenciado por passagens das Escrituras.
            </p>
          </div>

          <button
            onClick={handleRandomQuestion}
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Sorteador de Dúvida</span>
          </button>
        </div>
      </div>

      {randomItem && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border p-5 rounded-xl space-y-2 relative shadow-sm transition-colors ${
            isDarkReaderMode ? "bg-amber-500/5 border-amber-500/30 text-slate-100" : "bg-amber-500/5 border-amber-500/30 text-slate-800"
          }`}
        >
          <button
            onClick={() => setRandomItem(null)}
            className="absolute top-3 right-3 text-amber-655 hover:text-amber-800 text-xs font-bold"
          >
            ✕ Fechar
          </button>
          <div className="flex items-center gap-1.5 text-amber-500 font-mono text-xs uppercase tracking-wider font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sua Pergunta Sorteada para Estudo</span>
          </div>
          <h4 className={`font-bold text-sm md:text-base leading-snug ${isDarkReaderMode ? "text-amber-400" : "text-slate-900"}`}>
            {randomItem.question}
          </h4>
          <p className={`text-xs md:text-sm leading-relaxed whitespace-pre-line ${isDarkReaderMode ? "text-slate-300" : "text-slate-600"}`}>
            {randomItem.answer}
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded ${
              isDarkReaderMode ? "text-slate-300 bg-slate-800" : "text-slate-400 bg-slate-100"
            }`}>
              Categoria: {randomItem.category}
            </span>
            <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded animate-pulse">
              Referência: {randomItem.reference}
            </span>
          </div>
        </motion.div>
      )}

      {/* Database Search & Category Pills Panel */}
      <div className={`border rounded-2xl p-5 shadow-sm space-y-4 transition-colors duration-300 ${
        isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-700"
      }`}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Custom Search bar Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
            <input
              type="text"
              placeholder="Pesquisar por dúvidas, respostas ou trechos bíblicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full text-xs md:text-sm border rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-slate-400 ${
                isDarkReaderMode
                  ? "bg-slate-950 border-slate-850 text-slate-100 focus:border-amber-500"
                  : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"
              }`}
            />
          </div>

          <div className={`text-xs ${isDarkReaderMode ? "text-slate-400" : "text-slate-500"} font-medium`}>
            Exibindo <span className={`font-bold ${isDarkReaderMode ? "text-amber-500" : "text-slate-800"}`}>{filteredItems.length}</span> de <span className="font-bold">{QA_ITEMS.length}</span> respostas
          </div>
        </div>

        {/* Category Tabs Scroll Bar */}
        <div className="flex gap-2 min-h-12 overflow-x-auto pb-1 scrollbar-none items-center">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {categories.map((cat) => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSel
                    ? "bg-amber-500 border border-transparent text-slate-955 font-bold shadow-xs"
                    : isDarkReaderMode
                      ? "bg-slate-950 text-slate-400 hover:bg-slate-800 border border-transparent"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQS Accordion view list */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isExp = expandedId === item.id;

            return (
              <div
                key={item.id}
                id={`qa-item-${item.id}`}
                className={`border rounded-2xl shadow-xs transition-colors duration-300 ${
                  isExp
                    ? "border-amber-500/60 ring-1 ring-amber-500/10"
                    : isDarkReaderMode
                      ? "bg-slate-900 border-slate-800/80"
                      : "bg-white border-slate-200"
                }`}
              >
                {/* Trigger bar */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded">
                        Q{item.id}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${isDarkReaderMode ? "text-slate-455" : "text-slate-400"}`}>
                        {item.category}
                      </span>
                    </div>
                    <h4 className={`font-bold leading-snug text-sm md:text-base ${
                      isDarkReaderMode
                        ? isExp ? "text-amber-400" : "text-slate-200 hover:text-amber-400"
                        : "text-slate-900"
                    }`}>
                      {item.question}
                    </h4>
                  </div>
                  <div>
                    {isExp ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer container */}
                <AnimatePresence>
                  {isExp && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 pt-3 border-t space-y-4 ${isDarkReaderMode ? "border-slate-850" : "border-slate-100"}`}>
                        <p className={`text-xs md:text-sm leading-relaxed whitespace-pre-line ${isDarkReaderMode ? "text-slate-300" : "text-slate-600"}`}>
                          {item.answer}
                        </p>

                        {/* Scripture backing badge */}
                        <div className={`flex items-center gap-1.5 border p-3 rounded-xl max-w-fit ${
                          isDarkReaderMode ? "bg-slate-950/60 border-slate-800/80" : "bg-slate-50 border-slate-100"
                        }`}>
                          <Book className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                          <span className={`text-xs ${isDarkReaderMode ? "text-slate-400" : "text-slate-500"} font-medium`}>Referência bíblica:</span>
                          <span className="text-xs font-mono font-extrabold text-amber-500 tracking-wider">
                            {item.reference}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className={`border rounded-2xl p-10 text-center space-y-2 transition-colors ${
            isDarkReaderMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold">Nenhum resultado encontrado</h4>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Nenhuma dúvida ou resposta em nosso manual de estudos bateu com o termo &ldquo;{searchTerm}&rdquo;. Digite outro termo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
