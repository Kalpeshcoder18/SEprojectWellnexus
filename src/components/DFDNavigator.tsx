import React, { useState } from 'react';
import DFDLevel0 from './DFDLevel0';
import DFDLevel1 from './DFDLevel1';
import DFDLevel2 from './DFDLevel2';

interface DFDNavigatorProps {
  onBack: () => void;
}

export default function DFDNavigator({ onBack }: DFDNavigatorProps) {
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleNavigate = (level: number) => {
    setCurrentLevel(level);
  };

  switch (currentLevel) {
    case 0:
      return <DFDLevel0 onBack={onBack} onNavigate={handleNavigate} />;
    case 1:
      return <DFDLevel1 onBack={onBack} onNavigate={handleNavigate} />;
    case 2:
      return <DFDLevel2 onBack={onBack} onNavigate={handleNavigate} />;
    default:
      return <DFDLevel0 onBack={onBack} onNavigate={handleNavigate} />;
  }
}
