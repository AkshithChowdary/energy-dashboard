import React from 'react';
import Image from 'next/image';


const FooterDown = () => {
  return (
    <footer className="bg-black text-white p-0 py-4 border-t-2 border-gray-500">
      <div className="container mx-auto space-y-0 pt-4 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; 2020-23 | BosonQ Psi Private Limited
          </p>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Image src="" alt="Twitter" width={32} height={32} className="filter invert" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Image src="" alt="Instagram" width={32} height={32} className="filter invert" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Image src="" alt="LinkedIn" width={32} height={32} className="filter invert" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <Image src="" alt="YouTube" width={32} height={32} className="filter invert" />
            </a>
          </div>
          <nav aria-label="Footer Navigation - Support">
            <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 text-sm">
              <li>
                <a href="#" className="hover:opacity-75 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-75 transition">
                  Cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default FooterDown;