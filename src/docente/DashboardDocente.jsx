// dashboard.jsx
import { useState } from "react";
import ActividadesConfig from "./components/Actividades";
import "./Dashboard.css";

export default function DashboardDocente() {
  const [activeSection, setActiveSection] = useState("book");
  const [config, setConfig] = useState({
    book: null,
    lessonIdx: null,
    activities: [],
    students: 20,
    manualData: { title: "", instructions: "", items: [] }
  });

  return (
    <div className="dashboard-container dashboard-theme">
      {/* Header superior del Dashboard */}
      <header className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto' }}>
          <div>
            <h1 style={{ color: 'var(--secondary)', fontSize: '1.8rem', fontWeight: '800' }}>
              Bienvenido de vuelta, Profesor
            </h1>
            <p style={{ color: 'var(--color-texto-secundario)' }}>Gestiona tus clases y actividades interactivas</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: '#fef9f2', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.95rem', fontWeight: '600', color: '#ef8312' }}>
              Nivel A1 • Benjamin Franklin Institute
            </div>
            <button style={{ 
              background: 'var(--primary)', 
              color: 'white', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '9999px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Nueva Clase +
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="dashboard-main">
        <ActividadesConfig 
          config={config} 
          setConfig={setConfig}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </main>
    </div>
  );
}