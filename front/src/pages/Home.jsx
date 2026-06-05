import Hero              from '../components/Hero';
import Filosofia         from '../components/Filosofia';
import ElEspacio         from '../components/ElEspacio';
import NuestrosServicios from '../components/NuestrosServicios';
import ElEquipo          from '../components/ElEquipo';
import VidaCotidiana     from '../components/VidaCotidiana';
import Diferencial       from '../components/Diferencial';
import Testimonios       from '../components/Testimonios';
import AgendarVisita     from '../components/AgendarVisita';
import Footer            from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Filosofia />
      <ElEspacio />
      <NuestrosServicios />
      <ElEquipo />
      <VidaCotidiana />
      <Diferencial />
      <Testimonios />
      <AgendarVisita />
      <Footer />
    </>
  );
}
