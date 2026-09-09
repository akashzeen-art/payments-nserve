import { useState, lazy, Suspense } from 'react';
import Home from './pages/Home';

const GlobePreloader = lazy(() => import('./components/GlobePreloader'));

export default function App() {
  const [booting, setBooting] = useState(true);

  return (
    <>
      {booting && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-[#F5F7FB]" aria-hidden />}>
          <GlobePreloader onDone={() => setBooting(false)} />
        </Suspense>
      )}
      <div className={booting ? 'invisible' : 'visible'}>
        <Home />
      </div>
    </>
  );
}
