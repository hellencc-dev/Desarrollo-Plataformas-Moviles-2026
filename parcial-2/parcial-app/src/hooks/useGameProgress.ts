import { useEffect, useMemo, useState } from "react";

interface Mission {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  unlocked: boolean;
}

export function useGameProgress(userId?: string) {
  const initialMissions: Mission[] = [
    {
      id: 1,
      title: "Misión 1",
      description: "Tomar una foto con la cámara",
      points: 100,
      completed: false,
      unlocked: true,
    },
    {
      id: 2,
      title: "Misión 2",
      description: "Moverse más de 30 metros",
      points: 150,
      completed: false,
      unlocked: true,
    },
    {
      id: 3,
      title: "Misión 3",
      description: "Quedarse quieto 10 segundos para vibrar",
      points: 200,
      completed: false,
      unlocked: false,
    },
  ];

  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [points, setPoints] = useState(0);

  const storageKey = userId ? `parcial2_${userId}` : "parcial2_guest";

  useEffect(() => {
    if (!userId) return;

    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setMissions(parsed.missions || initialMissions);
      setPoints(parsed.points || 0);
    } else {
      setMissions(initialMissions);
      setPoints(0);
    }
  }, [userId, storageKey]);

  useEffect(() => {
    if (!userId) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        missions,
        points,
      })
    );
  }, [missions, points, userId, storageKey]);

  const completedCount = useMemo(() => {
    return missions.filter((mission) => mission.completed).length;
  }, [missions]);

  const progress = useMemo(() => {
    return completedCount / missions.length;
  }, [completedCount, missions]);

  const resetProgress = () => {
    setMissions(initialMissions);
    setPoints(0);
  };

  const completeMission = (missionId: number) => {
    const mission = missions.find((m) => m.id === missionId);

    if (!mission) return;
    if (mission.completed) return;
    if (!mission.unlocked) return;

    const updatedMissions = missions.map((m) =>
      m.id === missionId ? { ...m, completed: true } : m
    );

    setMissions(updatedMissions);
    setPoints((prev) => prev + mission.points);
  };

  return {
    missions,
    points,
    progress,
    completedCount,
    resetProgress,
    completeMission,
  };
}