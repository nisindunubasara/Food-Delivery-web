import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#323232] px-4 sm:px-8 lg:px-12 py-8 sm:py-10 mt-10 text-white">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 sm:gap-14 text-sm">
        <div>
          <img src={assets.logo} className="mb-4 w-28 sm:w-32" alt="" />
          <p className="w-full md:w-2/3 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>

        <div>
          <p className="text-lg sm:text-xl font-medium mb-3 sm:mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 ">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-lg sm:text-xl font-medium mb-3 sm:mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 ">
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="mt-3" />
        <p className="text-xs sm:text-sm text-center pt-3 sm:pt-0">
          Copyright © 2024 Forever You. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
