// Em frontend/src/pages/OpeningPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Opening } from '../types';
import { ChessViewer } from '../components/ChessViewer'; // Nosso tabuleiro

// URL base da nossa API (backend)
const API_URL = 'http://localhost:8000';

export function OpeningPage() {
  const { eco_code } = useParams<{ eco_code: string }>();

  // Estados para guardar os dados da API
  const [opening, setOpening] = useState<Opening | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Este 'useEffect' roda UMA VEZ quando a página carrega
  useEffect(() => {

    async function fetchOpeningData() {
      try {
        setLoading(true);
        setError(null);

        // A chamada API!
        const response = await axios.get(`${API_URL}/api/openings/${eco_code}`);

        setOpening(response.data);

      } catch (err: any) {
        // Se der erro (ex: 404), guardamos a mensagem
        setError(`Erro ao buscar abertura: ${err.response?.data?.detail || err.message}`);
      } finally {
        setLoading(false);
      }
    }

    if (eco_code) {
      fetchOpeningData();
    }

  }, [eco_code]); // Dependência: eco_code (roda de novo se a URL mudar)


  // --- Renderização condicional ---

  if (loading) {
    return <div>Carregando dados para {eco_code}...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!opening) {
    return <div>Nenhuma abertura encontrada.</div>;
  }

  // Sucesso! Mostra os dados.
  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      {/* Coluna 1: O Tabuleiro */}
      <ChessViewer pgn={opening.pgn} />

      {/* Coluna 2: Os Dados */}
      <div style={{ maxWidth: '600px' }}>
        <h1>{opening.name} ({opening.eco_code})</h1>

        <h2>Descrição</h2>
        <p>{opening.description}</p>

        <h3>Plano para as Brancas</h3>
        <p>{opening.plan_for_white}</p>

        <h3>Plano para as Pretas</h3>
        <p>{opening.plan_for_black}</p>
      </div>
    </div>
  );
}