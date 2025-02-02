import React from 'react';
import FaqList from './components/FaqList';
import FaqForm from './components/FaqForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>FAQ Management System</h1>
      </header>
      <main>
        <section className="admin-section">
          <h2>Add New FAQ</h2>
          <FaqForm />
        </section>
        <section className="faq-section">
          <h2>FAQs</h2>
          <FaqList />
        </section>
      </main>
    </div>
  );
}

export default App; 