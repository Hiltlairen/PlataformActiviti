// actividades.jsx
import { useState } from "react";
import "../Dashboard.css";

const ACTIVITY_TYPES = [
  { id: "dictionary", icon: "📖", label: "Diccionario", desc: "Vocabulario con definiciones", color: "#3b82f6" },
  { id: "order", icon: "🔀", label: "Ordenar oraciones", desc: "Construir frases correctas", color: "#8b5cf6" },
  { id: "conversation", icon: "💬", label: "Conversación", desc: "Diálogos interactivos", color: "#ec4899" },
  { id: "describe", icon: "🔍", label: "Describir objetos", desc: "Descripción guiada de imágenes", color: "#06b6d4" },
  { id: "wordsearch", icon: "🔠", label: "Sopa de letras", desc: "Encontrar palabras ocultas", color: "#10b981" },
  { id: "own_describe", icon: "🖊️", label: "Descripción propia", desc: "El alumno describe", color: "#f59e0b" },
  { id: "manual", icon: "⚙️", label: "Personalizada", desc: "Crea tu actividad", color: "#ef4444" },
];

const BOOKS = [
  { 
    id: "A1", 
    label: "A1", 
    color: "#ef8312", 
    lessons: [
      "Welcome to BENJAMIN FRANKLIN INSTITUTE",
      "My family and friends", 
      "My schedule, time and more",
      "My house and my favorite places",
      "My everyday activities",
    ]
  },
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `B${i + 2}`, 
    label: `B${i + 2}`, 
    color: "#64748b",
    lessons: ["Próximamente"]
  })),
];

const uid = () => Math.random().toString(36).slice(2, 8);

function getSectionStatus(sectionId, config) {
  switch(sectionId) {
    case 'book': return !!config.book;
    case 'lesson': return config.lessonIdx !== null;
    case 'activities': return config.activities.length > 0;
    case 'students': return config.students !== 20; // Solo marca como completado si el usuario cambió el valor por defecto
    default: return false;
  }
}

/* ==================== SECCIONES ==================== */

function BookSection({ config, setConfig }) {
  return (
    <div>
      <div className="section-header">
        <h2>📚 Selecciona un libro</h2>
        <p>Elige el nivel que vas a trabajar con tus estudiantes</p>
      </div>
      
      <div className="books-grid">
        {BOOKS.map((book) => {
          const isSelected = config.book?.id === book.id;
          const hasContent = book.id === "A1";
          
          return (
            <button
              key={book.id}
              className={`book-card ${isSelected ? 'selected' : ''}`}
              onClick={() => hasContent && setConfig(prev => ({ ...prev, book, lessonIdx: null }))}
              disabled={!hasContent}
              style={{ opacity: hasContent ? 1 : 0.6 }}
            >
              <div className="book-icon">{hasContent ? "📗" : "🔒"}</div>
              <div className="book-label" style={{ fontWeight: 700, margin: '8px 0 4px' }}>{book.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                {hasContent ? `${book.lessons.length} lecciones disponibles` : "Próximamente"}
              </div>
              {isSelected && <div style={{ color: '#10b981', marginTop: '8px', fontSize: '1.1rem' }}>✓ Seleccionado</div>}
            </button>
          );
        })}
      </div>

      {config.book && (
        <div className="info-card success" style={{ marginTop: '1.5rem' }}>
          ✓ Libro <strong>{config.book.label}</strong> seleccionado — {config.book.lessons.length} lecciones disponibles
        </div>
      )}
    </div>
  );
}

function LessonSection({ config, setConfig }) {
  if (!config.book) {
    return <div className="info-card warning">⚠️ Primero selecciona un libro en la sección "Libro"</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h2>📝 Selecciona una lección</h2>
        <p>Libro {config.book.label}</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {config.book.lessons.map((lesson, i) => (
          <button
            key={i}
            className={`lesson-item ${config.lessonIdx === i ? 'selected' : ''}`}
            onClick={() => setConfig(prev => ({ ...prev, lessonIdx: i }))}
          >
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#64748b', minWidth: '40px' }}>{i + 1}</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 600 }}>{lesson}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Lección {i + 1}</div>
            </div>
            {config.lessonIdx === i && <span style={{ color: '#10b981', fontSize: '1.5rem' }}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function StudentsSection({ config, setConfig }) {
  const presets = [10, 15, 20, 25, 30, 40];
  const roomCode = "CLASS" + Math.random().toString(36).slice(2, 7).toUpperCase();

  return (
    <div>
      <div className="section-header">
        <h2>👥 Configurar estudiantes</h2>
        <p>Define cuántos estudiantes participarán en esta clase</p>
      </div>

      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Número de estudiantes</label>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button 
            onClick={() => setConfig(prev => ({ ...prev, students: Math.max(1, prev.students - 1) }))}
            style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
          >−</button>
          
          <span style={{ fontSize: '1.8rem', fontWeight: 700, minWidth: '60px', textAlign: 'center' }}>
            {config.students}
          </span>
          
          <button 
            onClick={() => setConfig(prev => ({ ...prev, students: prev.students + 1 }))}
            style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
          >+</button>
        </div>

        <input 
          type="range" 
          min="5" 
          max="60" 
          value={config.students}
          onChange={(e) => setConfig(prev => ({ ...prev, students: Number(e.target.value) }))}
          style={{ width: '100%' }}
        />

        <div style={{ margin: '20px 0 10px', fontWeight: 600 }}>Grupos rápidos</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {presets.map(n => (
            <button 
              key={n}
              className={`preset-btn ${config.students === n ? 'active' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, students: n }))}
              style={{ 
                padding: '8px 16px', 
                border: config.students === n ? '2px solid #ef8312' : '1px solid #e2e8f0',
                background: config.students === n ? '#fef9f2' : 'white',
                borderRadius: '8px',
                fontWeight: 600
              }}
            >
              {n}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Código de acceso para estudiantes</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '4px', color: '#ef8312' }}>{roomCode}</div>
          <button 
            onClick={() => navigator.clipboard.writeText(roomCode)}
            style={{ marginTop: '10px', padding: '8px 16px', background: '#ef8312', color: 'white', border: 'none', borderRadius: '8px' }}
          >
            📋 Copiar código
          </button>
        </div>
      </div>
    </div>
  );
}

/* Componente principal */
export default function ActividadesConfig({ config, setConfig, activeSection, setActiveSection }) {
  const progress = {
    completed: (config.book ? 1 : 0) + 
               (config.lessonIdx !== null ? 1 : 0) + 
               (config.activities.length > 0 ? 1 : 0) + 
               (config.students !== 20 ? 1 : 0),
    total: 4
  };

  const isComplete = config.book && config.lessonIdx !== null && config.activities.length > 0;

  return (
    <div className="dashboard-theme">
      <div className="dashboard-main">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <span className="logo-icon">🚪</span>
            <h2>ClassHub</h2>
          </div>

          <div className="progress-indicator">
            <div className="progress-text">Progreso • {progress.completed}/{progress.total}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(progress.completed / progress.total) * 100}%` }} />
            </div>
          </div>

          <nav className="sidebar-nav">
            {[
              { id: "book", icon: "📚", label: "Libro", desc: "Selecciona el nivel" },
              { id: "lesson", icon: "📝", label: "Lección", desc: "Elige la unidad" },
              { id: "activities", icon: "🎯", label: "Actividades", desc: "Selecciona tipos" },
              { id: "students", icon: "👥", label: "Estudiantes", desc: "Configura grupo" },
            ].map(section => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <div>
                  <div className="nav-label">{section.label}</div>
                  <div className="nav-desc">{section.desc}</div>
                </div>
                {getSectionStatus(section.id, config) && <span className="nav-badge">✓</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button 
              className="reset-btn"
              onClick={() => {
                if (confirm('¿Resetear toda la configuración?')) {
                  setConfig({
                    book: null,
                    lessonIdx: null,
                    activities: [],
                    students: 20,
                    manualData: { title: "", instructions: "", items: [] }
                  });
                }
              }}
            >
              🔄 Reiniciar configuración
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="main-content">
          <div className="content-area">
            {activeSection === "book" && <BookSection config={config} setConfig={setConfig} />}
            {activeSection === "lesson" && <LessonSection config={config} setConfig={setConfig} />}
            {activeSection === "activities" && <div>Sección de Actividades (próximamente completa)</div>}
            {activeSection === "students" && <StudentsSection config={config} setConfig={setConfig} />}
          </div>

          {/* Resumen */}
          <div style={{ background: 'white', padding: '1.75rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Resumen de la clase</h3>
            <button 
              className="create-btn" 
              disabled={!isComplete}
              onClick={() => alert("🎉 ¡Sala creada exitosamente!")}
            >
              {isComplete ? "🚀 Crear sala ahora" : "Completa todos los pasos para continuar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}