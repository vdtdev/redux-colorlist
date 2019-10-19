import React from 'react';
// import AddGame from './components/AddGame';
import ColorList from './components/ColorList';
import ColorMixer from './components/mixer/Mixer';
// import ProgressFilters from './components/ProgressFilters';
import './App.scss';

export default function ColorApp(){
  return (
    <div className="color-list-app">
      <h1>ColorList</h1>
      <ColorMixer />
      <ColorList />
    </div>
  );
}