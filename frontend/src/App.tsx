// Em frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { OpeningPage } from './pages/OpeningPage'

function App() {
  return (
    <Routes>
      {/* Rota 1: Página Inicial */}
      <Route path="/" element={<HomePage />} />

      {/* Rota 2: Página da Abertura 
          O ':eco_code' é um parâmetro dinâmico */}
      <Route path="/opening/:eco_code" element={<OpeningPage />} />
    </Routes>
  )
}
export default App