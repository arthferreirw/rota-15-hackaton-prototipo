import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { initialAgentMessages, queryAiKnowledgeBase } from '../../data/aiKnowledgeBase';
import type { ChatMessage } from '../../data/aiKnowledgeBase';
import { Bot, Send, User, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AiChatbotProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({
  title = "Agente IA Rota Gastronômica",
  subtitle = "Assistente virtual de inteligência para o restaurante Sabor & Arte",
  className = ""
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialAgentMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = queryAiKnowledgeBase(text);
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButton: response.actionButton
      };

      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 700);
  };

  const quickQuestions = [
    "Qual minha margem de lucro?",
    "Como reduzir o desperdício?",
    "Ver detalhes da compra de carne",
    "Comparar fornecedores"
  ];

  return (
    <Card className={`bg-white border border-slate-200 flex flex-col h-[580px] p-0 overflow-hidden shadow-sm ${className}`}>
      {/* Chat Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF862F]/15 border border-[#FF862F]/30 flex items-center justify-center text-[#FF862F]">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              {title}
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          <Sparkles size={12} /> IA Ativa
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'agent' && (
              <div className="w-7 h-7 rounded-lg bg-[#FF862F]/15 border border-[#FF862F]/30 flex items-center justify-center text-[#FF862F] flex-shrink-0 mt-0.5">
                <Bot size={15} />
              </div>
            )}

            <div className={`max-w-[80%] space-y-2`}>
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-[#FF862F] text-white rounded-tr-none font-medium shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                }`}
              >
                {msg.text}
              </div>

              {msg.actionButton && (
                <button
                  onClick={() => navigate(msg.actionButton!.link)}
                  className="flex items-center gap-2 bg-[#FF862F]/10 hover:bg-[#FF862F]/20 text-[#FF862F] border border-[#FF862F]/30 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  <span>{msg.actionButton.label}</span>
                  <ArrowRight size={12} />
                </button>
              )}

              <span className={`text-[10px] text-slate-400 block ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0 mt-0.5">
                <User size={15} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-lg bg-[#FF862F]/15 border border-[#FF862F]/30 flex items-center justify-center text-[#FF862F]">
              <Bot size={15} />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 bg-[#FF862F] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#FF862F] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-[#FF862F] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex gap-2 overflow-x-auto no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap transition-all cursor-pointer shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre margens, desperdício, fornecedores..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF862F]"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-[#FF862F] hover:bg-[#E5721D] disabled:opacity-50 text-white p-2 rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <Send size={16} />
        </button>
      </form>
    </Card>
  );
};
