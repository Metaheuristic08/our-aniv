import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { dataService } from '../services/dataService';
import NavigationFooter from './NavigationFooter.tsx';

const RelationshipTimeline: React.FC = () => {
  const [timeData, setTimeData] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0
  });

  useEffect(() => {
    const updateTimer = () => {
      const newTimeData = dataService.calculateTimeTogether();
      setTimeData(newTimeData);
    };

    // Update immediately
    updateTimer();
    
    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeCard: React.FC<{ 
    value: number; 
    label: string; 
    icon: string; 
    gradient: string;
    delay?: string;
  }> = ({ value, label, icon, gradient, delay = "0ms" }) => (
    <div 
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg transform transition-all duration-500 active:scale-95 sm:hover:scale-105 touch-manipulation ${gradient}`}
      style={{ animationDelay: delay }}
    >
      <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 transform translate-x-4 sm:translate-x-6 -translate-y-4 sm:-translate-y-6">
        <div className="w-full h-full bg-white/10 rounded-full"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="material-symbols-outlined text-white/80 text-xl sm:text-2xl">
            {icon}
          </span>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {value.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-white/90 font-medium text-xs sm:text-sm uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );

  const MilestoneCard: React.FC<{ 
    title: string; 
    description: string; 
    icon: string; 
    achieved: boolean;
    progress?: number;
  }> = ({ title, description, icon, achieved, progress }) => (
    <div className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 touch-manipulation ${
      achieved 
        ? 'border-primary bg-primary/10 text-content-light dark:text-content-dark' 
        : 'border-subtle-light dark:border-subtle-dark bg-subtle-light/30 dark:bg-subtle-dark/30 text-content-light/60 dark:text-content-dark/60'
    }`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${
          achieved ? 'bg-primary text-white' : 'bg-subtle-light dark:bg-subtle-dark text-content-light/40 dark:text-content-dark/40'
        }`}>
          <span className="material-symbols-outlined text-lg sm:text-xl">
            {achieved ? 'check_circle' : icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base sm:text-lg">{title}</h3>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">{description}</p>
          {progress !== undefined && !achieved && (
            <div className="mt-3 w-full bg-subtle-light dark:bg-subtle-dark rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const milestones = [
    {
      title: "Primer Mes",
      description: "30 días de conocernos",
      icon: "favorite",
      achieved: timeData.totalDays >= 30,
      progress: (timeData.totalDays / 30) * 100
    },
    {
      title: "Primer Año",
      description: "365 días de amor",
      icon: "celebration",
      achieved: timeData.totalDays >= 365,
      progress: (timeData.totalDays / 365) * 100
    },
    {
      title: "Segundo Año",
      description: "730 días juntos",
      icon: "star",
      achieved: timeData.totalDays >= 730,
      progress: (timeData.totalDays / 730) * 100
    },
    {
      title: "1000 Días",
      description: "Un hito especial",
      icon: "diamond",
      achieved: timeData.totalDays >= 1000,
      progress: (timeData.totalDays / 1000) * 100
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-subtle-light/20 dark:border-subtle-dark/20">
        <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
          <Link to="/" className="w-12 h-12 flex items-center justify-center hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-full transition-colors touch-manipulation">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark text-xl">
              arrow_back
            </span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-center flex-1 text-content-light dark:text-content-dark">
            Nuestra Línea de Tiempo
          </h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto px-3 sm:px-4 py-4 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Hero Section */}
          <div className="text-center py-4 sm:py-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-content-light dark:text-content-dark mb-2">
              Desde el 7 de Octubre, 2023
            </h2>
            <p className="text-content-light/70 dark:text-content-dark/70 text-base sm:text-lg leading-relaxed">
              Cada segundo cuenta en nuestra historia de amor
            </p>
          </div>

          {/* Live Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <TimeCard
              value={timeData.years}
              label="Años"
              icon="calendar_today"
              gradient="bg-gradient-to-br from-purple-500 to-pink-500"
              delay="0ms"
            />
            <TimeCard
              value={timeData.months}
              label="Meses"
              icon="event"
              gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
              delay="100ms"
            />
            <TimeCard
              value={timeData.days}
              label="Días"
              icon="today"
              gradient="bg-gradient-to-br from-green-500 to-emerald-500"
              delay="200ms"
            />
            <TimeCard
              value={timeData.hours}
              label="Horas"
              icon="schedule"
              gradient="bg-gradient-to-br from-orange-500 to-red-500"
              delay="300ms"
            />
            <TimeCard
              value={timeData.minutes}
              label="Minutos"
              icon="timer"
              gradient="bg-gradient-to-br from-yellow-500 to-orange-500"
              delay="400ms"
            />
            <TimeCard
              value={timeData.seconds}
              label="Segundos"
              icon="update"
              gradient="bg-gradient-to-br from-indigo-500 to-purple-500"
              delay="500ms"
            />
          </div>

          {/* Total Days Highlight */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/30 rounded-2xl p-6 sm:p-8 text-center border border-primary/20">
            <div className="text-4xl sm:text-6xl font-bold text-primary mb-2 tabular-nums">
              {timeData.totalDays.toLocaleString()}
            </div>
            <div className="text-lg sm:text-xl text-content-light dark:text-content-dark font-medium">
              Días totales juntos
            </div>
            <p className="text-content-light/70 dark:text-content-dark/70 mt-2 text-sm sm:text-base">
              Y seguimos contando cada momento especial
            </p>
          </div>

          {/* Milestones */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-content-light dark:text-content-dark mb-4">
              Hitos de Nuestra Relación
            </h3>
            <div className="grid gap-3 sm:gap-4">
              {milestones.map((milestone, index) => (
                <MilestoneCard key={index} {...milestone} />
              ))}
            </div>
          </div>

          {/* Memory Quote */}
          <div className="bg-subtle-light dark:bg-subtle-dark rounded-2xl p-6 text-center">
            <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl mb-4 block">
              favorite
            </span>
            <blockquote className="text-base sm:text-lg text-content-light dark:text-content-dark font-medium italic mb-2 leading-relaxed">
              "El tiempo vuela cuando estás con la persona que amas"
            </blockquote>
            <p className="text-content-light/60 dark:text-content-dark/60 text-sm sm:text-base">
              - Nuestra historia de amor continúa...
            </p>
          </div>
        </div>
      </main>
      <NavigationFooter />
    </div>
  );
};

export default RelationshipTimeline;