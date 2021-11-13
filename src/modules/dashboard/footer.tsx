const DashFooter = () => {
  return (
    <footer className="text-center py-8">
      <p className="tracking-wide text-white text-sm">
        &copy; {new Date().getFullYear()} | shomaii dApp -{' '}
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

export default DashFooter;
