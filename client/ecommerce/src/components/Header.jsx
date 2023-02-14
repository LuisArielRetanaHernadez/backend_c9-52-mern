import React, { useState } from "react";
import Menu from "./Menu";

const Header = () => {


  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <header className="w-full">
      <div className="py-3 px-3 flex justify-around gap-4 flex-col bg-gray-400 ">
        <div className="w-full flex flex-row justify-between">
          {/* Icono hamburguerMenu */}
          <svg className="w-6 h-6 hover:cursor-pointer" onClick={() => setMenuVisible(!menuVisible)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          {/* Menu Hamburgues */}

          {menuVisible && 
            <Menu 
              menuVisible={menuVisible}
              setMenuVisible={setMenuVisible}
            />
          }

          {/* Logo */}
          <h1 className="text-sm font-bold uppercase text-red-800">
            Logo
          </h1>
          {/* iconos */}
          <div className="flex gap-4 justify-between">
            <svg
              className="hover:cursor-pointer w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <svg
              className=" hover:cursor-pointer w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>

        </div>

        <input className="w-full m-auto bg-white-500 rounded-md p-3 h-6 placeholder:text-xs placeholder:text-gray-800 placeholder:text-center " placeholder="Buscar..." type="search" name="" id="" />
      </div>
    </header>
  );
};

export default Header;
