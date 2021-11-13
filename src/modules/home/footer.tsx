const Footer = () => {
  return (
    <footer className="text-white py-8">
      <p className="tracking-wide text-center text-sm">
        &copy; {new Date().getFullYear()} | shomaii DApp -{' '}
        <a
          className="hover:underline"
          href="https://www.worldofcryptopups.cf/"
          target="_blank"
          rel="noreferrer"
        >
          World of Cryptopups
        </a>
      </p>
    </footer>
  );
};

export default Footer;
