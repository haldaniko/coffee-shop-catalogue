/* eslint-disable max-len */
import React from 'react';
import './App.scss';
import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="starter min-h-screen flex flex-col font-primary text-secondary/100">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};
