import React, { useState } from 'react';
import { BookOpen, Settings, MessageSquareText, Layers } from 'lucide-react';
import InstallationWizard from './components/InstallationWizard';
import ConfigGenerator from './components/ConfigGenerator';
import ChatAssistant from './components/ChatAssistant';
import { AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.WIZARD);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-docu-500 p-2 rounded-lg shadow-[0_0_10px_rgba(20,184,166,0.3)]">
            <Layers className="text-white" size={24} />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Docusaurus<br/>
            <span className="text-docu-400">Architect</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setCurrentView(AppView.WIZARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === AppView.WIZARD
                ? 'bg-docu-500/10 text-docu-400 border border-docu-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Installation Guide</span>
          </button>

          <button
            onClick={() => setCurrentView(AppView.CONFIGURATOR)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === AppView.CONFIGURATOR
                ? 'bg-docu-500/10 text-docu-400 border border-docu-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings size={20} />
            <span className="font-medium">Config Generator</span>
          </button>

          <button
            onClick={() => setCurrentView(AppView.AI_ASSISTANT)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === AppView.AI_ASSISTANT
                ? 'bg-docu-500/10 text-docu-400 border border-docu-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MessageSquareText size={20} />
            <span className="font-medium">AI Expert</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-4 border border-indigo-500/20">
                <p className="text-xs text-indigo-200 mb-2">Pro Tip:</p>
                <p className="text-sm text-indigo-100 font-medium leading-relaxed">
                    Use the Config Generator first, then ask the AI Expert to refine your sidebar structure.
                </p>
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-docu-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Docusaurus Architect</span>
            <span>/</span>
            <span className="text-white font-medium">
              {currentView === AppView.WIZARD && 'Installation'}
              {currentView === AppView.CONFIGURATOR && 'Configuration'}
              {currentView === AppView.AI_ASSISTANT && 'Expert Help'}
            </span>
          </div>
          <div className="flex items-center gap-4">
              <a href="https://docusaurus.io" target="_blank" rel="noreferrer" className="text-xs font-medium text-slate-500 hover:text-docu-400 transition-colors">
                  Official Docs ↗
              </a>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-0 relative">
          {currentView === AppView.WIZARD && <InstallationWizard />}
          {currentView === AppView.CONFIGURATOR && <ConfigGenerator />}
          {currentView === AppView.AI_ASSISTANT && <ChatAssistant />}
        </div>
      </main>
    </div>
  );
}

export default App;