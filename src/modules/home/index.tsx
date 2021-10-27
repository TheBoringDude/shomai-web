import Image from 'next/image';
import BG from '../../../public/bg.jpg';
import PageLayout from '../../layouts/Page';
import Footer from './footer';
import Header from './header';
import Hero from './hero';

const HomePage = () => {
  return (
    <PageLayout title="Welcome">
      <div className="relative min-h-screen">
        <div className="relative z-30">
          <Header />

          <Hero />

          <Footer />
        </div>

        <Image
          src={BG}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          className="w-full h-full inset-0 z-20 brightness-30"
        />
      </div>
    </PageLayout>
  );
};

export default HomePage;
