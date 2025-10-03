import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { dataService } from '../services/dataService';

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
      className={`relative overflow-hidden rounded-xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 ${gradient}`}
      style={{ animationDelay: delay }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
        <div className="w-full h-full bg-white/10 rounded-full"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="material-symbols-outlined text-white/80 text-2xl">
            {icon}
          </span>
          <div className="text-right">
            <div className="text-3xl font-bold text-white tabular-nums">
              {value.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-white/90 font-medium text-sm uppercase tracking-wide">
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
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
      achieved 
        ? 'border-primary bg-primary/10 text-content-light dark:text-content-dark' 
        : 'border-subtle-light dark:border-subtle-dark bg-subtle-light/30 dark:bg-subtle-dark/30 text-content-light/60 dark:text-content-dark/60'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          achieved ? 'bg-primary text-white' : 'bg-subtle-light dark:bg-subtle-dark text-content-light/40 dark:text-content-dark/40'
        }`}>
          <span className="material-symbols-outlined text-lg">
            {achieved ? 'check_circle' : icon}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
          {progress !== undefined && !achieved && (
            <div className="mt-2 w-full bg-subtle-light dark:bg-subtle-dark rounded-full h-2">
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
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark">
              arrow_back
            </span>
          </Link>
          <h1 className="text-lg font-bold text-center flex-1 text-content-light dark:text-content-dark">
            Nuestra Línea de Tiempo
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-content-light dark:text-content-dark mb-2">
              Desde el 7 de Noviembre, 2023
            </h2>
            <p className="text-content-light/70 dark:text-content-dark/70 text-lg">
              Cada segundo cuenta en nuestra historia de amor
            </p>
          </div>

          {/* Live Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className="bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl p-8 text-center border border-primary/20">
            <div className="text-6xl font-bold text-primary mb-2 tabular-nums">
              {timeData.totalDays.toLocaleString()}
            </div>
            <div className="text-xl text-content-light dark:text-content-dark font-medium">
              Días totales juntos
            </div>
            <p className="text-content-light/70 dark:text-content-dark/70 mt-2">
              Y seguimos contando cada momento especial
            </p>
          </div>

          {/* Milestones */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-content-light dark:text-content-dark mb-4">
              Hitos de Nuestra Relación
            </h3>
            <div className="grid gap-4">
              {milestones.map((milestone, index) => (
                <MilestoneCard key={index} {...milestone} />
              ))}
            </div>
          </div>

          {/* Memory Quote */}
          <div className="bg-subtle-light dark:bg-subtle-dark rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-primary text-4xl mb-4 block">
              favorite
            </span>
            <blockquote className="text-lg text-content-light dark:text-content-dark font-medium italic mb-2">
              "El tiempo vuela cuando estás con la persona que amas"
            </blockquote>
            <p className="text-content-light/60 dark:text-content-dark/60">
              - Nuestra historia de amor continúa...
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 py-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md"
            >
              <span className="material-symbols-outlined">photo_library</span>
              Ver Fotos
            </Link>
            <Link
              to="/mosaic"
              className="flex items-center gap-2 px-6 py-3 bg-subtle-light dark:bg-subtle-dark text-content-light dark:text-content-dark rounded-lg hover:bg-subtle-light/80 dark:hover:bg-subtle-dark/80 transition-colors shadow-md"
            >
              <span className="material-symbols-outlined">grid_view</span>
              Ver Mosaico
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RelationshipTimeline;