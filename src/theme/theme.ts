import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-brightBlue-500 hover:bg-darkBlue-500 text-white",
    },
  },

 
  navbar: {
    root: {
      base: "bg-white bg-opacity-60 backdrop-blur-lg px-4 py-4 dark:border-gray-700 dark:bg-darkBlue-800 dark:bg-opacity-80 sm:px-6 shadow-lg fixed top-0  w-full z-50 md:my-4 mx-4 md:rounded-full", // Floating, sticky, semi-transparent background
      rounded: {
        on: "",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center md:justify-center justify-between", // Center content
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium", // Links centered below on smaller screens
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0",
      active: {
        on: "bg-brightBlue-400 text-white dark:text-white md:bg-transparent md:text-brightBlue-500 rounded", // Custom color for active link
        off: "rounded border-gray-100 text-darkBlue-700 hover:bg-brightBlue-200 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-brightBlue-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  },
  textInput: {},
  checkbox: {
    root: {
      base: "h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",
      color: {
        default:
          "text-brightBlue-600 focus:ring-cyan-600 dark:ring-offset-gray-800 dark:focus:ring-cyan-600",
        dark: "text-gray-800 focus:ring-gray-800 dark:ring-offset-gray-800 dark:focus:ring-gray-800",
        failure:
          "text-red-900 focus:ring-red-900 dark:ring-offset-red-900 dark:focus:ring-red-900",
        gray: "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
        info: "text-cyan-800 focus:ring-cyan-800 dark:ring-offset-gray-800 dark:focus:ring-cyan-800",
        light:
          "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
        purple:
          "text-purple-600 focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600",
        success:
          "text-green-800 focus:ring-green-800 dark:ring-offset-green-800 dark:focus:ring-green-800",
        warning:
          "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
        blue: "text-blue-700 focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700",
        cyan: "text-cyan-600 focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600",
        green:
          "text-green-600 focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600",
        indigo:
          "text-indigo-700 focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700",
        lime: "text-lime-700 focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700",
        pink: "text-pink-600 focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600",
        red: "text-red-600 focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600",
        teal: "text-teal-600 focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600",
        yellow:
          "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
      },
    },
  },
};
