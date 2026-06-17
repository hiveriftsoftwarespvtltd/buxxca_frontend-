import React, { createContext, useContext, useState, useCallback } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', show: false, type: 'info' });

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, show: true, type });
    const timer = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="text-[#22C55E]" size={20} />;
      case 'error':
        return <XCircle className="text-[#EF4444]" size={20} />;
      case 'warning':
        return <AlertCircle className="text-[#F59E0B]" size={20} />;
      default:
        return <Sparkles className="text-[#E8C97A]" size={20} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-8 right-8 bg-[#1A1208] text-[#E8C97A] px-6 py-4 rounded shadow-2xl z-[9999] flex items-center gap-3 transition-all duration-400 ease-luxury border border-[#E8DFC8]/20 ${
          toast.show ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'
        }`}
      >
        <span className="flex items-center justify-center">{renderIcon()}</span>
        <span className="text-sm font-sans tracking-wide text-[#FAF6EE]">{toast.message}</span>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
