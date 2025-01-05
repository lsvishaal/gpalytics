import React from "react";

const ErrorCard = ({ message, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-transparent text-center text-rose-400 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-title sm:text-2xl font-bold mb-4">{message}</h3>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default ErrorCard;
