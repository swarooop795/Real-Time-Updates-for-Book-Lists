import React from 'react';
import { Wifi, WifiOff, Loader2, Zap, Crown, Gem, Sparkles } from 'lucide-react';

interface ConnectionStatusProps {
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  connected,
  connecting,
  error
}) => {
  if (connecting) {
    return (
      <div className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-amber-500/25 via-orange-500/25 to-yellow-500/25 backdrop-blur-2xl text-white rounded-2xl border border-amber-400/40 shadow-2xl hover:shadow-amber-500/50 transform hover:scale-110 transition-all duration-300">
        <div className="relative">
          <Loader2 className="w-6 h-6 animate-spin text-amber-300" />
          <div className="absolute inset-0 w-6 h-6 bg-amber-300/20 rounded-full animate-ping"></div>
        </div>
        <span className="font-black text-lg">Connecting to Magic...</span>
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-red-500/25 via-pink-500/25 to-rose-500/25 backdrop-blur-2xl text-white rounded-2xl border border-red-400/40 shadow-2xl hover:shadow-red-500/50 transform hover:scale-110 transition-all duration-300">
        <div className="relative">
          <WifiOff className="w-6 h-6 text-red-300" />
          <div className="absolute inset-0 w-6 h-6 bg-red-300/20 rounded-full animate-ping"></div>
        </div>
        <span className="font-black text-lg">Magic Connection Error</span>
        <Gem className="w-5 h-5 text-pink-300 animate-pulse" />
      </div>
    );
  }

  if (connected) {
    return (
      <div className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-500/25 via-emerald-500/25 to-teal-500/25 backdrop-blur-2xl text-white rounded-2xl border border-green-400/40 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300">
        <div className="relative">
          <div className="relative">
            <Wifi className="w-6 h-6 text-green-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
        <span className="font-black text-lg">Live Magic Updates</span>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
          <Crown className="w-5 h-5 text-purple-300 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-500/25 via-slate-500/25 to-zinc-500/25 backdrop-blur-2xl text-white rounded-2xl border border-gray-400/40 shadow-2xl hover:shadow-gray-500/50 transform hover:scale-110 transition-all duration-300">
      <div className="relative">
        <WifiOff className="w-6 h-6 text-gray-300" />
        <div className="absolute inset-0 w-6 h-6 bg-gray-300/20 rounded-full animate-ping"></div>
      </div>
      <span className="font-black text-lg">Magic Disconnected</span>
      <Gem className="w-5 h-5 text-gray-300 animate-pulse" />
    </div>
  );
};