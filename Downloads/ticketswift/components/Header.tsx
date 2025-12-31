
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-600 to-rose-500 p-2 rounded-lg">
              <i className="fa-solid fa-ticket text-white text-xl -rotate-12"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">TicketSwift</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest text-[10px]">Movies & Events Simplified</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">Movies</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">Events</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">Sports</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-semibold text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-full transition-all">
              My Tickets
            </button>
            <button className="bg-slate-900 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
