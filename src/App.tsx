import React, { useState, useEffect } from "react";
import { STUDY_MODULES } from "./data/manual";
import ManualModule from "./components/ManualModule";
import Checklists from "./components/Checklists";
import QAView from "./components/QAView";
import { Biblia } from "./pages/Biblia";
import { BookOpen, CheckSquare, HelpCircle, Feather, Award, ShieldAlert, GraduationCap, CheckCircle, ChevronRight, RotateCcw, Printer, Share2, Sparkles, Moon, Sun, Lock, Mail, Clock, ExternalLink, Loader2, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [activeTab, setActiveTab] = useState<"study" | "checklists" | "faq" | "preacher">("study");
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [userName, setUserName] = useState("");
  const [isCertificateOpened, setIsCertificateOpened] = useState(false);
  const [isDarkReaderMode, setIsDarkReaderMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem("obreiro_dark_reader_mode") === "true";
    } catch {
      return false;
    }
  });

  // Save reader theme
  useEffect(() => {
    try {
      localStorage.setItem("obreiro_dark_reader_mode", String(isDarkReaderMode));
    } catch (e) {
      console.error(e);
    }
  }, [isDarkReaderMode]);

  const [emailInput, setEmailInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null = carregando, false = login, true = logado
  const [authError, setAuthError] = useState("");
  const [expiresAtTime, setExpiresAtTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obter ou criar UUID único para este dispositivo
  const getDeviceId = () => {
    let id = localStorage.getItem("obreiro_device_id");
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("obreiro_device_id", id);
    }
    return id;
  };

  const checkAccess = async (emailToCheck: string, isLoginAction = false) => {
    if (!emailToCheck) {
      setIsAuthorized(false);
      return;
    }
    
    try {
      if (isLoginAction) setIsSubmitting(true);
      
      const cleanEmail = emailToCheck.trim().toLowerCase();
      const currentDevice = getDeviceId();
      
      const { data, error } = await supabase
        .from("emails_acesso")
        .select("email, tipo_acesso, expira_em, device_id")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (error) {
        console.error("Erro ao verificar acesso:", error);
        setAuthError("Erro de conexão com o servidor. Tente novamente.");
        setIsAuthorized(false);
        return;
      }

      if (!data) {
        setAuthError("E-mail não cadastrado. Acesso restrito.");
        setIsAuthorized(false);
        localStorage.removeItem("obreiro_logged_email");
        return;
      }

      const expiresAt = new Date(data.expira_em).getTime();
      const now = Date.now();

      if (now >= expiresAt) {
        setAuthError("Acesso expirado. Redirecionando...");
        setIsAuthorized(false);
        localStorage.removeItem("obreiro_logged_email");
        setTimeout(() => {
          window.location.href = "https://quiz.mindtool.com.br/guia-do-obreiro";
        }, 1500);
        return;
      }

      // Se houver device_id cadastrado diferente do atual e não for uma ação de login direto
      if (!isLoginAction && data.device_id && data.device_id !== currentDevice) {
        setAuthError("Acesso detectado em outro dispositivo. Por favor, digite seu e-mail para validar novamente.");
        setIsAuthorized(false);
        return;
      }

      // Se for ação de login direto ou não houver device_id gravado, atualizamos no banco
      if (!data.device_id || isLoginAction) {
        const { error: updateError } = await supabase
          .from("emails_acesso")
          .update({ device_id: currentDevice })
          .eq("email", cleanEmail);
          
        if (updateError) {
          console.error("Erro ao registrar dispositivo no banco:", updateError);
        }
      }

      localStorage.setItem("obreiro_logged_email", cleanEmail);
      setUserEmail(cleanEmail);
      setExpiresAtTime(expiresAt);
      setIsAuthorized(true);
      setAuthError("");
    } catch (err) {
      console.error(err);
      setAuthError("Ocorreu um erro ao validar seu acesso.");
      setIsAuthorized(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Carregar progresso local e verificar acesso ao montar o componente
  useEffect(() => {
    const savedCompleted = localStorage.getItem("obreiro_completed_modules");
    const savedName = localStorage.getItem("obreiro_user_name_certificate");
    if (savedCompleted) {
      setCompletedModules(JSON.parse(savedCompleted));
    }
    if (savedName) {
      setUserName(savedName);
    }

    const cachedEmail = localStorage.getItem("obreiro_logged_email");
    if (cachedEmail) {
      checkAccess(cachedEmail, false);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  // Monitorar tempo restante e redirecionar ao expirar
  useEffect(() => {
    if (!isAuthorized || !expiresAtTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiresAtTime - now) / 1000));
      setTimeRemaining(diff);

      if (diff <= 0) {
        clearInterval(interval);
        localStorage.removeItem("obreiro_logged_email");
        setIsAuthorized(false);
        setAuthError("Seu tempo de acesso expirou.");
        window.location.href = "https://quiz.mindtool.com.br/guia-do-obreiro";
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthorized, expiresAtTime]);

  const handleCompleteModule = (moduleId: number) => {
    if (completedModules.includes(moduleId)) return;
    const updated = [...completedModules, moduleId];
    setCompletedModules(updated);
    localStorage.setItem("obreiro_completed_modules", JSON.stringify(updated));
  };

  const handleResetProgress = () => {
    if (window.confirm("Pretende zerar o seu progresso de leitura e questionários? Isse não apagará seus esboços salvos.")) {
      setCompletedModules([]);
      localStorage.removeItem("obreiro_completed_modules");
      setSelectedModuleId(1);
    }
  };

  const handleSaveCertificateName = (name: string) => {
    setUserName(name);
    localStorage.setItem("obreiro_user_name_certificate", name);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight text-amber-500">GUIA PRÁTICO DO OBREIRO</h2>
            <p className="text-xs text-slate-400">Validando credenciais de acesso...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px]" />

        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                GUIA PRÁTICO DO OBREIRO
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Insira seu e-mail cadastrado para ter acesso ao portal de capacitação.
              </p>
            </div>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs px-4 py-3 rounded-xl flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkAccess(emailInput, true);
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                E-mail de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 focus:border-amber-500/80 text-white rounded-xl placeholder-slate-600 text-sm outline-none transition-all focus:ring-1 focus:ring-amber-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !emailInput}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer text-sm font-sans"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validando...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Entrar no Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 leading-normal">
              Acesso restrito a membros autorizados.<br />
              Deseja adquirir ou renovar seu acesso?{" "}
              <a
                href="https://quiz.mindtool.com.br/guia-do-obreiro"
                className="text-amber-400 font-bold hover:underline"
              >
                Clique aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedModule = STUDY_MODULES.find(m => m.id === selectedModuleId) || STUDY_MODULES[0];
  const allModulesCompleted = completedModules.length === STUDY_MODULES.length;

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
      isDarkReaderMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      {/* 10-Minute Expiry Warning Banner */}
      {timeRemaining !== null && timeRemaining <= 600 && (
        <div className="bg-amber-600 text-white font-bold px-4 py-3 text-xs sm:text-sm text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 border-b border-amber-700 shadow-md relative z-[100]">
          <div className="flex items-center gap-1.5 animate-pulse">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Atenção: Seu acesso expira em <span className="font-mono bg-black/20 px-2 py-0.5 rounded">{formatTime(timeRemaining)}</span>!</span>
          </div>
          <a
            href="https://quiz.mindtool.com.br/guia-do-obreiro"
            className="bg-white hover:bg-slate-100 text-amber-700 font-extrabold px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition-all shadow-sm border border-white"
          >
            Estender Acesso
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Top Liturgical Nav Header */}
      <header className="bg-slate-900 border-b border-amber-500/30 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500 text-slate-900 font-black flex items-center justify-center shadow-lg">
              <Award className="w-5.5 h-4.5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-black tracking-tight flex items-center gap-1.5 font-sans">
                <span>GUIA PRÁTICO DO OBREIRO</span>
                <span className="text-amber-500">•</span>
                <span className="text-xs text-amber-500 hidden sm:inline uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">KIT PREGADOR</span>
              </h1>
              <p className="text-[10px] text-slate-400">Guia de Organização, Caráter, Ética e Oratória de Prontidão</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Theme Toggle Button */}
            <button
              onClick={() => setIsDarkReaderMode(!isDarkReaderMode)}
              className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all border cursor-pointer ${
                isDarkReaderMode
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/25 border-amber-500/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/60 hover:text-white"
              }`}
              title={isDarkReaderMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {isDarkReaderMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-amber-500" />}
              <span className="hidden md:inline">{isDarkReaderMode ? "Modo Noturno: Ativado" : "Modo Noturno"}</span>
              <span className="inline md:hidden text-[10px]">{isDarkReaderMode ? "Escuro" : "Claro"}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                if (window.confirm("Deseja realmente sair da sua conta?")) {
                  localStorage.removeItem("obreiro_logged_email");
                  setIsAuthorized(false);
                  setUserEmail("");
                  setEmailInput("");
                  setAuthError("");
                }
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              title="Sair da Conta"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Sair</span>
            </button>

            {/* Direct certificate shortcut banner */}
            {allModulesCompleted ? (
              <button
                onClick={() => setIsCertificateOpened(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer animate-pulse"
              >
                <GraduationCap className="w-4.5 h-4.5" />
                <span className="hidden sm:inline">Ver Certificado</span>
              </button>
            ) : (
              <div className="text-right text-xs pr-1">
                <span className="text-slate-400">Progresso</span>
                <div className="font-mono font-bold text-amber-500">
                  {completedModules.length} / {STUDY_MODULES.length} Concluídos
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-grow space-y-6">
        {/* Core Stats Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200.5 p-4 rounded-xl shadow-xs space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">Grau de Estudo</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-slate-900">{completedModules.length}</span>
              <span className="text-xs text-slate-500">/ {STUDY_MODULES.length} módulos</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedModules.length / STUDY_MODULES.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200.5 p-4 rounded-xl shadow-xs space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">Frentes de Serviço</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-slate-900">30</span>
              <span className="text-xs text-slate-500">Diretrizes Q&A</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">Banco teológico completo</p>
          </div>

          <div className="bg-white border border-slate-200.5 p-4 rounded-xl shadow-xs space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">Checklists de Culto</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-slate-900">11</span>
              <span className="text-xs text-slate-500">Categorias de apoio</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">Antes, durante e depois</p>
          </div>

          <div className="bg-white border border-slate-200.5 p-4 rounded-xl shadow-xs space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">Apoio ao Pregador</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-amber-600">Premium</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">Oratória e esboçador</p>
          </div>
        </div>

        {/* Dynamic Desktop Nav Menu & Main Application tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Navegue no Painel</h4>
              <p className="text-slate-400 text-[10px]">Altere as abas de trabalho interativas abaixo</p>
            </div>

            <div className="space-y-2">
              {[
                { id: "study", label: "Manual de Capacitação", desc: "6 Módulos teóricos com quiz", icon: BookOpen },
                { id: "checklists", label: "Checklist Dinâmico de Culto", desc: "Zele por cada detalhe da escala", icon: CheckSquare },
                { id: "faq", label: "Pesquisar Dúvidas (QA)", desc: "Consulte as 30 diretrizes", icon: HelpCircle },
                { id: "biblia", label: "Bíblia", desc: "Inserir e visualizar versículos", icon: BookOpen },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-slate-930 text-white border-amber-500 select-none shadow-md font-medium"
                        : "bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className={`w-5 h-5 shrink-0 ${isActive ? "text-amber-500" : "text-slate-400"}`} />
                      <div className="min-w-0">
                        <span className="text-xs md:text-sm font-bold block leading-tight">{tab.label}</span>
                        <span className={`text-[10px] mt-0.5 block truncate ${isActive ? "text-slate-400" : "text-slate-400"}`}>{tab.desc}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Extra Tools and progress indicators */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Progresso de Estudo</span>
                <span className="font-mono font-extrabold text-slate-800">
                  {Math.round((completedModules.length / STUDY_MODULES.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(completedModules.length / STUDY_MODULES.length) * 100}%` }}
                />
              </div>

              {completedModules.length > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="w-full text-center py-2 hover:bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpar Minha Carga</span>
                </button>
              )}
            </div>
          </div>

          {/* Main workspace canvas */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "study" && (
                <motion.div
                  key="study-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Selector list of modules */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block px-1">
                      Módulos de Curso
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {STUDY_MODULES.map((m) => {
                        const isCur = selectedModuleId === m.id;
                        const isDone = completedModules.includes(m.id);

                        return (
                          <button
                            key={m.id}
                            onClick={() => setSelectedModuleId(m.id)}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                              isCur
                                ? "bg-slate-900 border-amber-500 text-white font-bold"
                                : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700"
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-mono block">Mód {m.id}</span>
                            {isDone && (
                              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" title="Completo" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual Study panel */}
                  <ManualModule
                    module={selectedModule}
                    onComplete={handleCompleteModule}
                    isCompleted={completedModules.includes(selectedModule.id)}
                  />
                </motion.div>
              )}

              {activeTab === "checklists" && (
                <motion.div
                  key="checklists-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Checklists />
                </motion.div>
              )}

              {activeTab === "faq" && (
                <motion.div
                  key="faq-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <QAView />
                </motion.div>
              )}

              {activeTab === "biblia" && (
                <motion.div
                  key="biblia-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Biblia />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Graduation Certificate Dialog Modal */}
      <AnimatePresence>
        {isCertificateOpened && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border-4 border-slate-900 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCertificateOpened(false)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer z-10 print:hidden"
              >
                ✕
              </button>

              {/* Certificate Inner Canvas - Specially printable */}
              <div id="graduation-certificate-to-print" className="p-6 md:p-12 relative overflow-hidden bg-amber-50">
                {/* Liturgical borders */}
                <div className="border-4 border-double border-amber-600 p-6 md:p-10 text-center space-y-6 relative bg-white/95 shadow-inner">
                  {/* Subtle watermarks backgrounds */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-amber-500/5 pointer-events-none" />

                  <div className="space-y-2">
                    <span className="text-amber-600 font-mono text-xs md:text-sm uppercase tracking-widest block font-bold">
                      Certificado de Capacitação Eclesiástica
                    </span>
                    <h3 className="text-2xl md:text-4xl font-extrabold uppercase text-slate-900 tracking-tight font-sans">
                      Obreiro Aprovado
                    </h3>
                  </div>

                  <p className="text-slate-400 text-xs font-mono">
                    CHANCELA SEGUNDO 2 TIMÓTEO 2:15
                  </p>

                  <div className="space-y-4 py-4 md:py-6">
                    <p className="text-xs md:text-sm text-slate-500 italic max-w-lg mx-auto">
                      Certificamos para os devidos fins eclesiásticos que o(a) dedicado(a) obreiro(a) abaixo concluiu com excelência o ciclo de treinamento e capacitação sacerdotal.
                    </p>

                    {/* Interactive Name entry for printing */}
                    <div className="max-w-md mx-auto space-y-1 print:hidden">
                      <label className="text-[10px] text-slate-400 uppercase font-mono blog font-bold">Digite seu Nome para Imprimir:</label>
                      <input
                        type="text"
                        placeholder="Nome do Obreiro Completo"
                        value={userName}
                        onChange={(e) => handleSaveCertificateName(e.target.value)}
                        className="w-full text-center font-serif text-lg border-b-2 border-amber-500 text-slate-950 font-bold outline-none bg-transparent"
                      />
                    </div>

                    {/* Print Static Name representation */}
                    <div className="hidden print:block text-center pt-2 font-serif text-2xl font-black text-slate-950 border-b border-dashed border-amber-600 pb-2">
                      {userName || "Presbítero Cooperador de Serviço"}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
                    Aprovado nos 6 Módulos teológicos teóricos de Chamado, Caráter, Integridade Moral, Ética de Relacionamento Interpessoal, Serviços Logísticos de Culto e Liderança de Altar.
                  </p>

                  <div className="pt-6 border-t border-amber-600/30 grid grid-cols-2 gap-4 text-[10px] text-slate-500 font-mono">
                    <div>
                      <span className="block border-b border-slate-300 pb-1 w-32 mx-auto font-serif font-bold text-slate-800">Coordenação de Altar</span>
                      <span>Curso Obreiro Capacitado</span>
                    </div>
                    <div>
                      <span className="block italic text-slate-950 font-bold">{new Date().toLocaleDateString("pt-BR")}</span>
                      <span>Data de Emissão</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Printable Controls actions footer bar */}
              <div className="bg-slate-100 px-6 py-4 flex justify-between items-center print:hidden">
                <p className="text-slate-500 text-[10px] md:text-xs">
                  Dica: Para emoldurar, clique em Imprimir e salve em PDF de alta qualidade.
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-amber-500" />
                    <span>Imprimir Certificado</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-400 text-xs space-y-1">
        <p>&copy; {new Date().getFullYear()} Guia Prático do Obreiro. Desenvolvido para Capacitação Ministerial Completa.</p>
        <p className="text-slate-600 text-[10px]">Aprovado, Preparado e Capacitado para Servir • 2 Timóteo 2:15</p>
      </footer>
    </div>
  );
}
