import { LinkButton } from '../../components/LinkButton';

const Hero = () => {
  return (
    <div className="py-32">
      <div className="mx-auto w-4/5 text-center">
        <h2 className="text-5xl font-black text-white leading-normal">
          <span className="text-6xl">
            Blend <span className="text-atomic-tangerine">NFTs</span>
          </span>{' '}
          <br className="hidden md:block" />
          to generate and craft a <br />
          better asset.
        </h2>

        <div className="mt-20">
          <LinkButton
            className="border-white text-white border rounded-lg py-4 px-10 hover:bg-atomic-tangerine hover:border-atomic-tangerine duration-300"
            href="/dashboard"
          >
            View Dashboard
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
