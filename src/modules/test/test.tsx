import React from 'react';
import { useCustomStore } from './store';

const Component1: React.FC = () => {

  const { state: counter, setState: setCounter } = useCustomStore();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className='border-b'>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Component 1
      </h1>

      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </div>

    </div>
  );
};

const Component2: React.FC = () => {
  const { state: counter, setState: setCounter } = useCustomStore();

  return (
    <div>
      <h1>Component 2</h1>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}

export { Component1, Component2 };
