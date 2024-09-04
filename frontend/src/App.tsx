import React from 'react';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';

export const App: React.FC = () => {
  return (
    <div className="starter container min-h-screen">
      <Navbar />

      <HomePage />

      <Footer />
    </div>
  );
};
