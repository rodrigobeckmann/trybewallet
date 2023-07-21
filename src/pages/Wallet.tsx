import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { RootRedux } from '../types';

function Wallet() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <WalletForm />
      <Table />
    </>
  );
}

export default Wallet;
