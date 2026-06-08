import React, { useState } from 'react';
import { BibliaForm } from '../components/BibliaForm';
import { BibliaList } from '../components/BibliaList';

export const Biblia: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleInsert = () => {
    // Increment to trigger list refresh
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-amber-400 mb-4">Biblia - Versículos</h2>
      <BibliaForm onInsert={handleInsert} />
      <BibliaList refreshTrigger={refreshTrigger} />
    </div>
  );
};
