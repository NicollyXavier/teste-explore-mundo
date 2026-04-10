import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * Ponto de entrada da aplicação React.
 * Renderiza o componente raiz <App /> dentro do elemento com id "root" no index.html.
 * O <React.StrictMode> ativa verificações adicionais em desenvolvimento,
 * como detectar efeitos colaterais inesperados e APIs depreciadas.
 */

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

