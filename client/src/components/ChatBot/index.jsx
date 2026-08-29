import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import {
  faqAPI, facilityAPI, busRouteAPI, downloadAPI,
  settingsAPI, newsAPI, achievementAPI, facultyAPI,
} from '../../services/api';
import answer, { SUGGESTIONS } from './botBrain';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Namaste! 🙏 I\'m PPS Bot.\n\nAsk me about admissions, fees, timings, bus routes, facilities or documents.',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);
  const dataRef = useRef(null);

  useEffect(() => {
    if (!isOpen || data) return;
    let alive = true;
    (async () => {
      const safe = (p, fb) => p.then((r) => r.data).catch(() => fb);
      const [faqs, facilities, busRoutes, downloads, settings, news, achievements, faculty] =
        await Promise.all([
          safe(faqAPI.getAll(), []),
          safe(facilityAPI.getAll(), []),
          safe(busRouteAPI.getAll(), []),
          safe(downloadAPI.getAll(), []),
          safe(settingsAPI.get(), {}),
          safe(newsAPI.getAll(), []),
          safe(achievementAPI.getAll(), []),
          safe(facultyAPI.getAll(), []),
        ]);
      if (alive) {
        const d = { faqs, facilities, busRoutes, downloads, settings, news, achievements, faculty };
        setData(d);
        dataRef.current = d;
      }
    })();
    return () => { alive = false; };
  }, [isOpen, data]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const ask = (question) => {
    const q = question.trim();
    if (!q) return;

    setMessages((prev) => [...prev, { from: 'user', text: q }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const d = dataRef.current || data || {};
      const res = answer(q, d);
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: res.text, link: res.link }]);
    }, 420);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask(input);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : 'Chat with PPS Bot'}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#1a237e] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#1a237e] text-white px-4 py-3 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#f9a825] text-[#1a237e] flex items-center justify-center font-bold text-sm shrink-0">
              PPS
            </div>
            <div className="min-w-0">
              <h4 className="font-bold leading-tight">PPS Bot</h4>
              <p className="text-[11px] text-gray-300">
                {data ? 'Answers from our school information' : 'Loading school info…'}
              </p>
            </div>
          </div>

          <div ref={bodyRef} className="h-72 overflow-y-auto p-4 space-y-2.5 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-[#1a237e] text-white rounded-br-sm'
                      : 'bg-white text-gray-700 shadow-sm rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                  {msg.link && (
                    <Link
                      to={msg.link.to}
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-block text-xs font-semibold text-[#1a237e] bg-[#f9a825] px-3 py-1.5 rounded-full hover:bg-[#ffcc02] transition-colors"
                    >
                      {msg.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                  {[0, 0.15, 0.3].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 border-t bg-white">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-[#1a237e]/20 text-[#1a237e] hover:bg-[#1a237e] hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask a question…"
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#1a237e]"
            />
            <button
              onClick={() => ask(input)}
              disabled={!input.trim()}
              aria-label="Send"
              className="px-3.5 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#0d1452] disabled:opacity-40 transition-colors"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
