/* eslint-disable canonical/filename-match-exported */
import { Intro } from './components/Intro/Intro';
import { PasoUno } from './components/PasoUno/PasoUno';

const Home = () => {
  return (
    <main className="overflow-y-auto overscroll-y-contain scroll-snap-y-mandatory">
      <Intro />
      <PasoUno />
    </main>
  );
};

export default Home;
