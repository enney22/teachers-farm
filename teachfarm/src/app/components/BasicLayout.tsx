"use client";

import Header from './layout/Header';
import Footer from './layout/Footer';

export default function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-24">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
