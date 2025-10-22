// Em frontend/src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1>Dicionário de Xadrez</h1>
      <p>Selecione uma abertura (exemplo):</p>
      {/* Este link vai nos ajudar a testar. 
          Estamos 'hardcodando' o C60 por enquanto. */}
      <Link to="/opening/C60">
        Ver Ruy Lopez (Teste C60)
      </Link>
    </div>
  );
}