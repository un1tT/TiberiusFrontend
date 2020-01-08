import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { Button, Icon, Input } from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import {apiUrl} from "./config";

const App: React.FC = () => {
  const [newChannel, setNewChannel] = useState('');
  const [deleteChannel, setDeleteChannel] = useState('');
  const onChangeNewChannel = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNewChannel(target.value)
  };
  const onChangeDeleteChannel = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDeleteChannel(target.value)
  };
  const onSubmit = () => {
    axios.post(`${apiUrl}/channels`, { name: newChannel });
  };

  const onDelete =  () => {
    axios.delete(`${apiUrl}/channels/${deleteChannel}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://st4.depositphotos.com/1415902/31584/v/450/depositphotos_315845546-stock-illustration-julius-caesar-roman-politician-and.jpg" className="App-logo" alt="logo" />
        <p>
          Добавь свой канал, Тиберий подключится:
        </p>
        <div className="Input-section">
          <Input
            onChange={onChangeNewChannel}
            value={newChannel}
            className="Channel-input"
            placeholder="Название канала"
            size="large"
            onPressEnter={onSubmit}
          />
          <Button onClick={onSubmit} className="Submit-button" type="primary">
            Старт
            <Icon type="right" />
          </Button>
        </div>
        <p>
          Или...
        </p>
        <div className="Input-section">
          <Input
            onChange={onChangeDeleteChannel}
            value={deleteChannel}
            className="Channel-input"
            placeholder="Имя дезертира"
            size="large"
            onPressEnter={onDelete}
          />
          <Button onClick={onDelete} className="Submit-button" type="danger">
            Отключиться
            <Icon type="right" />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default App;
