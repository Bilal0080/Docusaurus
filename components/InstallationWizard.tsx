import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Terminal, CheckCircle2 } from 'lucide-react';
import { Step } from '../types';
import CodeBlock from './CodeBlock';

const steps: Step[] = [
  {
    id: 'prereqs',
    title: 'Prerequisites',
    description: 'Ensure your environment is ready for Docusaurus.',
    details: [
      'Node.js version 18.0 or above',
      'An active internet connection',
      'A package manager (npm, yarn, or pnpm)'
    ],
    command: 'node -v'
  },
  {
    id: 'scaffold',
    title: 'Scaffold Project',
    description: 'Create the skeleton of your new documentation site.',
    command: 'npx create-docusaurus@latest my-website classic',
    details: [
      'This downloads the latest version.',
      'Creates a folder named "my-website".',
      'Uses the "classic" preset (recommended).'
    ]
  },
  {
    id: 'start',
    title: 'Start Development Server',
    description: 'Run your website locally to see changes in real-time.',
    command: 'cd my-website\nnpm start',
    details: [
      'Opens http://localhost:3000 automatically.',
      'Hot reloading is enabled.'
    ]
  },
  {
    id: 'build',
    title: 'Build for Production',
    description: 'Generate static files for deployment.',
    command: 'npm run build',
    details: [
      'Creates a "build" directory.',
      'Optimizes assets and HTML.'
    ]
  }
];

const InstallationWizard: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Installation Guide</h2>
        <p className="text-slate-400">Follow these steps to get your Docusaurus site up and running.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 transform -translate-y-1/2"></div>
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStepIndex(index)}
            className={`flex flex-col items-center group focus:outline-none`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              index <= currentStepIndex 
                ? 'bg-docu-500 border-docu-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' 
                : 'bg-slate-900 border-slate-700 text-slate-500 group-hover:border-slate-500'
            }`}>
              {index < currentStepIndex ? <CheckCircle2 size={20} /> : <span>{index + 1}</span>}
            </div>
            <span className={`mt-2 text-sm font-medium transition-colors ${
              index === currentStepIndex ? 'text-docu-400' : 'text-slate-500'
            }`}>
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentStep.title}</h3>
                <p className="text-slate-300 text-lg">{currentStep.description}</p>
              </div>
              <div className="p-3 bg-docu-500/10 rounded-lg">
                <Terminal className="text-docu-400" size={32} />
              </div>
            </div>

            {currentStep.command && (
              <div className="mb-6">
                <CodeBlock code={currentStep.command} label="Terminal" />
              </div>
            )}

            {currentStep.details && (
              <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
                <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3 tracking-wider">Details</h4>
                <ul className="space-y-2">
                  {currentStep.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-slate-300">
                      <span className="mr-2 text-docu-500">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentStepIndex === 0
                ? 'opacity-0 cursor-default'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>
          
          <button
            onClick={nextStep}
            disabled={currentStepIndex === steps.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentStepIndex === steps.length - 1
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-docu-600 hover:bg-docu-500 text-white shadow-lg hover:shadow-docu-500/25'
            }`}
          >
            Next Step
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallationWizard;