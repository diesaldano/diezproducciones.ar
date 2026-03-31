'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  eventDate: string; // ISO format: "2025-12-31T23:59:59"
  eventName?: string;
}

export default function CountdownTimer({ eventDate, eventName = 'EVENTO' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(eventDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOver: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (timeLeft.isOver) {
    return (
      <div className="text-center py-4">
        <p className="text-amber-500 font-bold text-lg">¡{eventName} COMENZÓ!</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center items-center py-6">
      <div className="text-center">
        <div className="bg-amber-500 text-slate-950 rounded-lg p-3 min-w-16 font-bold text-2xl font-bebas">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">Días</p>
      </div>
      
      <span className="text-amber-500 text-2xl font-bold">:</span>
      
      <div className="text-center">
        <div className="bg-amber-500 text-slate-950 rounded-lg p-3 min-w-16 font-bold text-2xl font-bebas">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">Horas</p>
      </div>
      
      <span className="text-amber-500 text-2xl font-bold">:</span>
      
      <div className="text-center">
        <div className="bg-amber-500 text-slate-950 rounded-lg p-3 min-w-16 font-bold text-2xl font-bebas">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">Min</p>
      </div>
      
      <span className="text-amber-500 text-2xl font-bold">:</span>
      
      <div className="text-center">
        <div className="bg-amber-500 text-slate-950 rounded-lg p-3 min-w-16 font-bold text-2xl font-bebas">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <p className="text-slate-400 text-xs mt-2 uppercase tracking-wide">Seg</p>
      </div>
    </div>
  );
}
