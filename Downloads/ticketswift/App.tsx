
import React from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Help Center Column */}
        <div className="hidden lg:flex flex-col gap-6 w-80 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-violet-500"></i>
              Helpful Links
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center shrink-0 group-hover:bg-violet-600 transition-colors">
                  <i className="fa-solid fa-ticket text-xs text-violet-600 group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Booking Guide</p>
                  <p className="text-[10px] text-slate-500">How to secure your seats</p>
                </div>
              </li>
              <li className="flex gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-rose-600 transition-colors">
                  <i className="fa-solid fa-hand-holding-dollar text-xs text-rose-600 group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Refund Policy</p>
                  <p className="text-[10px] text-slate-500">View our cancellation terms</p>
                </div>
              </li>
              <li className="flex gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 group-hover:bg-sky-600 transition-colors">
                  <i className="fa-solid fa-user-shield text-xs text-sky-600 group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Secure Payments</p>
                  <p className="text-[10px] text-slate-500">Safety is our top priority</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Live Support</h3>
            <p className="text-xs text-slate-600 mb-4">
              Our AI is here 24/7. For complex issues, a human agent is available 9AM - 9PM.
            </p>
            <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">
              Talk to Human Agent
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Swift Concierge</h2>
              <p className="text-sm text-slate-500">Instant answers for your booking queries.</p>
            </div>
          </div>
          
          <ChatInterface />
        </div>
        
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-400">© 2024 TicketSwift. Simplified booking for everyone.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-600">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
