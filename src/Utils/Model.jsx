import React from 'react'

const Model = ({ children, model, setModel }) => {
  return (
        <>
            <div 
                onClick={() => setModel(false)}
                className={`bg-white/90 fixed inset-0 z-10 
                ${model ? "visible opacity-100" : "invisible opacity-0"}
                 transition-all duration-400`}/>
            {children}
        </>
    );
};

export default Model;