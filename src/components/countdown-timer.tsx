'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO string: "2026-04-15T22:00:00"
  eventName?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

export function CountdownTimer({ targetDate, eventName = 'EVENTO', className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isEnded: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  if (timeLeft.isEnded) {
    return (
      <div className="text-center">
        <p className="text-amber-500 font-bold text-2xl md:text-3xl font-montserrat">¡EL EVENTO HA COMENZADO!</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
        {/* DÍAS */}
        <div className="flex flex-col items-center">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-8 sm:px-10 md:px-14 py-6 md:py-8 backdrop-blur-sm hover:bg-amber-500/15 transition-colors">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-amber-500 block leading-none">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm md:text-base text-gray-400 uppercase font-montserrat font-semibold mt-4 tracking-widest">
            {timeLeft.days === 1 ? 'Día' : 'Días'}
          </span>
        </div>

        {/* SEPARADOR */}
        <div className="text-4xl md:text-5xl text-amber-500/40 font-thin mb-2">:</div>

        {/* HORAS */}
        <div className="flex flex-col items-center">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-8 sm:px-10 md:px-14 py-6 md:py-8 backdrop-blur-sm hover:bg-amber-500/15 transition-colors">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-amber-500 block leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm md:text-base text-gray-400 uppercase font-montserrat font-semibold mt-4 tracking-widest">
            Horas
          </span>
        </div>
      </div>
    </div>
  );
}
