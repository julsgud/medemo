/* eslint-disable canonical/filename-match-exported */
import { Intro } from './components/Intro/Intro';
import { PasoDos } from './components/PasoDos/PasoDos';
import { PasoUno } from './components/PasoUno/PasoUno';

const Home = () => {
  return (
    <main>
      <Intro />
      <PasoUno />
      <PasoDos />
    </main>
  );
};

export default Home;
