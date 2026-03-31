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
      <div className={`text-center font-montserrat ${className}`}>
        <p className="text-amber-500 font-bold text-lg">¡EL EVENTO HA COMENZADO!</p>
      </div>
    );
  }

  return (
    <div className={`text-center font-montserrat ${className}`}>
      <p className="text-gray-400 text-sm uppercase tracking-wide mb-3">
        {eventName} COMIENZA EN
      </p>
      <div className="flex justify-center gap-4 md:gap-6">
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bebas text-amber-500">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-gray-500 uppercase mt-1">
            {timeLeft.days === 1 ? 'Día' : 'Días'}
          </span>
        </div>
        <div className="text-2xl md:text-3xl text-gray-600">:</div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bebas text-amber-500">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-gray-500 uppercase mt-1">Horas</span>
        </div>
        <div className="text-2xl md:text-3xl text-gray-600">:</div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bebas text-amber-500">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-gray-500 uppercase mt-1">Min</span>
        </div>
        <div className="text-2xl md:text-3xl text-gray-600">:</div>
        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl font-bebas text-amber-500">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-gray-500 uppercase mt-1">Seg</span>
        </div>
      </div>
    </div>
  );
}
