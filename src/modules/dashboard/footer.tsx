const DashFooter = () => {
  return (
    <footer className="text-center py-8 bg-gunmetal">
      <div className="mx-auto w-11/12 text-white">
        <div className="w-full flex items-center justify-between">
          <div className="text-left">
            <h4 className="text-xl font-black mb-1 text-deep-champagne">shomai dApp</h4>
            <p className="text-sm tracking-wide">&copy; 2021 - All Rights Reserved</p>
          </div>

          <div>
            <ul>
              <li className="my-1">
                <a
                  className="hover:underline"
                  href="https://www.worldofcryptopups.cf/"
                  target="_blank"
                  rel="noreferrer"
                >
                  World of Cryptopups
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashFooter;
