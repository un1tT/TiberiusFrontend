import React, { KeyboardEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import axios from 'axios';

const App: React.FC = () => {
  const onSubmit = ({ currentTarget }: KeyboardEvent<HTMLInputElement>) => {
    const name = currentTarget.value;
    axios.post('http://tiberius-bot.herokuapp.com/channels', { name });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Добавь свой канал, Тиберий подключится:
        </p>
        <div className="Input-section">
          <Input
            placeholder="Название канала"
            size="large"
            onPressEnter={onSubmit}
          />
        </div>
      </header>
    </div>
  );
};

export default App;
