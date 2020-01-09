import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Icon, Input, message, Statistic} from 'antd';
import 'antd/dist/antd.css';

import './App.css';
import {apiUrl} from "./config";

const App: React.FC = () => {
  const [newChannel, setNewChannel] = useState('');
  const [deleteChannel, setDeleteChannel] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    axios.get(`${apiUrl}/channels`).then(({ data }) => {
      setAmount(data.length);
    });
  };

  const onChangeNewChannel = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNewChannel(target.value)
  };
  const onChangeDeleteChannel = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDeleteChannel(target.value)
  };
  const onSubmit = () => {
    axios.post(`${apiUrl}/channels`, { name: newChannel })
      .then(() => {
        showSuccessMessage(newChannel, 'принят в легион!');
        fetchChannels();
        setNewChannel('');
      })
      .catch(() => {
        showErrorMessage();
      })
  };

  const onDelete =  () => {
    axios.delete(`${apiUrl}/channels/${deleteChannel}`)
      .then(() => {
        showSuccessMessage(deleteChannel, 'разжалован!');
        fetchChannels();
        setDeleteChannel('');
      })
      .catch(() => {
        showErrorMessage();
      })
  };

  const showSuccessMessage = (name: string, text: string) => {
    message.success(`${name} ${text}`);
  };

  const showErrorMessage = () => {
    message.error('Цезари тоже ошибаются, что-то пошло не так...');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Statistic title="Численность легиона" value={amount} prefix={<Icon type="trophy" />} />
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
            Вступить
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
