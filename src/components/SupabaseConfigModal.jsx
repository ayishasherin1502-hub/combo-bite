import React, { useState } from 'react';
import { Database, Check, Copy, ExternalLink, X, Terminal, ShieldCheck } from 'lucide-react';

export default function SupabaseConfigModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const supabaseUrl = 'https://ehlrormpcmbboxmattcs.supabase.co';

  const copySqlHint = () => {
    navigator.clipboard.writeText(`-- ComboBite Schema is located in supabase_schema.sql`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>Supabase Real Database</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Connected to project <span className="text-emerald-400 font-mono">ehlrormpcmbboxmattcs</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Credentials Preview */}
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Project URL:
            </div>
            <div className="font-mono text-xs text-slate-300 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 truncate select-all">
              {supabaseUrl}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Publishable API Key:
            </div>
            <div className="font-mono text-xs text-emerald-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 truncate select-all">
              sb_publishable_YuYJYu72fgz4hvafVlJZbw_3aU9V01n
            </div>
          </div>
        </div>

        {/* SQL Schema Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <Terminal size={16} />
            <span>Database Tables & SQL Setup</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            We created a ready-to-run schema file: <span className="font-mono text-amber-300 bg-amber-500/10 px-1 py-0.5 rounded">supabase_schema.sql</span> in your project root. Run it in your Supabase SQL Editor to initialize the <code className="text-white">profiles</code>, <code className="text-white">combinations</code>, and <code className="text-white">comments</code> tables!
          </p>
          <div className="pt-2 flex items-center gap-2">
            <a
              href="https://supabase.com/dashboard/project/ehlrormpcmbboxmattcs/sql"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

