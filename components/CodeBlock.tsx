import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-sm">
      {(label || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs font-mono text-slate-400 uppercase">{label || language}</span>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-docu-400" /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-docu-50">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;