import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';


export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('contato@saboreartevicosa.com.br');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-[#FF862F] selection:text-white">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF862F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF862F] to-[#E5721D] mx-auto flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#FF862F]/30 mb-3">
            RG
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">ROTA GASTRONÔMICA</h1>
          <p className="text-xs text-[#FF862F] font-semibold tracking-wider flex items-center justify-center gap-1 mt-1">
            <MapPin size={12} /> PLATAFORMA DE INTELIGÊNCIA • VIÇOSA-MG
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              E-mail de Acesso
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#FF862F] transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#FF862F] transition-colors"
              required
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#FF862F] flex-shrink-0" />
            <span>Demonstração de Hackathon: Restaurante <strong>Sabor & Arte</strong> pré-selecionado.</span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#FF862F] hover:bg-[#E5721D] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#FF862F]/25 hover:scale-[1.01] cursor-pointer"
          >
            <span>Entrar na Plataforma</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Conectando restaurantes, reduzindo custos e maximizando lucros em Viçosa.
        </div>
      </div>
    </div>
  );
};
