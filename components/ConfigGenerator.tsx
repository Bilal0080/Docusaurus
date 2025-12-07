import React, { useState, useEffect } from 'react';
import { ConfigFormState } from '../types';
import CodeBlock from './CodeBlock';
import { RefreshCw, Wand2 } from 'lucide-react';
import { generateConfigExplanation } from '../services/gemini';

const ConfigGenerator: React.FC = () => {
  const [form, setForm] = useState<ConfigFormState>({
    title: 'My Site',
    tagline: 'Dinosaurs are cool',
    url: 'https://your-docusaurus-site.example.com',
    baseUrl: '/',
    organizationName: 'facebook',
    projectName: 'docusaurus',
    preset: 'classic',
    theme: 'custom',
  });

  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const generateConfigString = () => {
    return `/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '${form.title}',
  tagline: '${form.tagline}',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: '${form.url}',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '${form.baseUrl}',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '${form.organizationName}', // Usually your GitHub org/user name.
  projectName: '${form.projectName}', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '${form.preset}',
      /** @type {import('@docusaurus/preset-${form.preset}').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/${form.organizationName}/${form.projectName}/tree/main/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-${form.preset}').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '${form.title}',
        logo: {
          alt: '${form.title} Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/${form.organizationName}/${form.projectName}',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: '${form.theme === 'custom' ? 'dark' : form.theme}',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
            ],
          },
        ],
        copyright: \`Copyright © \${new Date().getFullYear()} ${form.title}, Inc. Built with Docusaurus.\`,
      },
    }),
};

export default config;`;
  };

  const handleAiAnalyze = async () => {
      setIsAnalyzing(true);
      const explanation = await generateConfigExplanation(JSON.stringify(form, null, 2));
      setAiAnalysis(explanation);
      setIsAnalyzing(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6 overflow-y-auto pr-2">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Config Generator</h2>
          <p className="text-slate-400">Customize your <code>docusaurus.config.js</code> file.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Site Title</label>
                <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Tagline</label>
                <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                />
            </div>

             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Organization Name</label>
                    <input
                    type="text"
                    name="organizationName"
                    value={form.organizationName}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Project Name</label>
                    <input
                    type="text"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                    />
                </div>
             </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Production URL</label>
                <input
                type="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                />
            </div>
            
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Base URL</label>
                <input
                type="text"
                name="baseUrl"
                value={form.baseUrl}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Preset</label>
                    <select
                    name="preset"
                    value={form.preset}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-docu-500 focus:border-transparent outline-none"
                    >
                        <option value="classic">Classic</option>
                        <option value="facebook">Facebook</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
             <button
              onClick={handleAiAnalyze}
              disabled={isAnalyzing}
              className="flex items-center gap-2 text-docu-400 hover:text-docu-300 transition-colors disabled:opacity-50"
             >
                 {isAnalyzing ? <RefreshCw className="animate-spin" size={16}/> : <Wand2 size={16}/>}
                 <span className="text-sm font-medium">Analyze with Gemini</span>
             </button>
             {aiAnalysis && (
                 <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-sm text-slate-300">
                     <p className="font-semibold text-docu-400 mb-2">AI Analysis:</p>
                     {aiAnalysis}
                 </div>
             )}
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">docusaurus.config.js</span>
            </div>
            <div className="flex-1 overflow-auto p-0">
                <CodeBlock code={generateConfigString()} language="javascript" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigGenerator;