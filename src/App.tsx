/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Upload,
  FileCode,
  Zap,
  Layout,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { generateStandaloneHTML } from './utils/htmlGenerator';
import confetti from 'canvas-confetti';

export default function App() {
  const [markdown, setMarkdown] = useState('# New Document\n\nStart typing your markdown here...');
  const [title, setTitle] = useState('My LCARS Document');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setMarkdown(content);
      // Try to extract a title from the first H1
      const match = content.match(/^#\s+(.+)$/m);
      if (match) setTitle(match[1]);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const html = generateStandaloneHTML(markdown, title);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff00ff', '#00ffff', '#ff9900']
    });
  };

  return (
    <div className="min-height-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-pink-200">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg transform -rotate-3">
            <Zap className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-slate-900 uppercase">
              Doc<span className="text-pink-500">Synth</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MD to LCARS Converter</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl cursor-pointer hover:border-cyan-400 hover:text-cyan-600 transition-all group">
            <Upload size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-tight">Import .md</span>
            <input type="file" accept=".md" onChange={handleFileUpload} className="hidden" />
          </label>
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-tight hover:bg-pink-500 hover:shadow-xl hover:shadow-pink-200 transition-all active:scale-95"
          >
            <Download size={18} />
            Export HTML
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Section */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <FileCode size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Markdown Editor</span>
            </div>
            <div className="h-px flex-1 mx-4 bg-slate-200" />
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition-opacity" />
            <div className="relative bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm focus-within:border-cyan-400 transition-colors">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Document Title"
                  className="bg-transparent w-full font-bold text-slate-700 focus:outline-none"
                />
              </div>
              <textarea 
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[600px] p-8 font-mono text-sm text-slate-600 focus:outline-none resize-none leading-relaxed"
                placeholder="Paste your markdown here..."
              />
            </div>
          </div>
        </section>

        {/* Info/Guide Section */}
        <aside className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Info size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">System Info</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-sm"
          >
            <h3 className="font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
              <Layout className="text-pink-500" size={20} />
              LCARS Light Mode
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your exported HTML will feature a clean, light-mode Starfleet LCARS interface. 
              Perfect for technical documentation, mission logs, or personal wikis.
            </p>
            
            <ul className="space-y-3">
              {[
                "Standalone single-file HTML output",
                "Responsive sidebar with LCARS elbows",
                "Light mode optimized typography",
                "Automatic markdown formatting",
                "Zero external dependencies in export"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-pink-500/20 transition-colors" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full -ml-16 -mb-16 blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
            
            <h4 className="font-bold uppercase tracking-widest text-xs text-pink-400 mb-2">Pro Tip</h4>
            <p className="text-slate-300 text-sm leading-relaxed relative z-10">
              Use standard Markdown headers (#, ##) to automatically generate the LCARS section styling in your final document.
            </p>
          </div>
        </aside>
      </main>

      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-slate-200 mt-12 flex items-center justify-between text-slate-400">
        <div className="text-xs font-bold uppercase tracking-widest">
          © 2026 DocSynth Systems
        </div>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
          <span className="hover:text-pink-500 cursor-pointer transition-colors">Documentation</span>
          <span className="hover:text-cyan-500 cursor-pointer transition-colors">Privacy</span>
        </div>
      </footer>
    </div>
  );
}
