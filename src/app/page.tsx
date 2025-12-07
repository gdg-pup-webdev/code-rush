"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="w-full px-8 py-4 flex justify-between items-center">
        <Logo/>
        <nav>
          <Link href="/spark-rush">
            <p className="px-6 py-3 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform"
               style={{ backgroundColor: 'var(--google-blue)' }}>
              Start Now
            </p>
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="relative w-full max-w-4xl flex flex-col items-center">
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-yellow-200 rounded-full opacity-50 animate-blob"></div>
          <div className="absolute -top-10 -right-20 w-48 h-48 bg-red-200 rounded-full opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 -left-32 w-48 h-48 bg-blue-200 rounded-full opacity-50 animate-blob animation-delay-4000"></div>
          <div className="absolute top-20 -right-32 w-48 h-48 bg-green-200 rounded-full opacity-50 animate-blob animation-delay-6000"></div>

          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 relative z-10">
            The Ultimate CSS Challenge
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 mb-10 relative z-10 max-w-2xl">
            Test your CSS skills in a fun, fast-paced environment. Are you ready to rush?
          </p>
          <Link href="/spark-rush">
            <p className="px-10 py-5 text-xl text-white font-bold rounded-full shadow-2xl transform hover:scale-110 transition-transform"
               style={{ backgroundColor: 'var(--google-green)' }}>
              I'm Ready!
            </p>
          </Link>
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-left">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <Image src="/file.svg" alt="Code" width={64} height={64} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--google-blue)'}}>Write the Code</h3>
            <p>Arrange the code blocks to match the target design.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <Image src="/window.svg" alt="Preview" width={64} height={64} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--google-red)'}}>See the Result</h3>
            <p>Get instant feedback on your code in the preview pane.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
            <Image src="/globe.svg" alt="Compete" width={64} height={64} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2" style={{color: 'var(--google-yellow)'}}>Beat the Clock</h3>
            <p>Score points and race against the timer to win.</p>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-gray-600">
        <p>Made with ❤️ by GDG for our campus booth</p>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
}
