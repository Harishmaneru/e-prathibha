import React, { useState } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
const TransactionDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
const dynamicId = location.state.id;
const dynamicToken = location.state.token;
console.log('trnction:', dynamicId);
 console.log('trnction:', dynamicToken);
const fetchTransactions = async () => {
    try {
        setLoading(true);
      const response = await fetch('https://test.e-prathibha.com/apis/transactions', {
        headers: {
          tokenu:dynamicToken,
          Id: dynamicId,
          server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
        },
      });
      console.log('trnction:', response)
      const data = await response.json();
      console.log('trnction:', data)
      setTransactions(data.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }finally {
        setLoading(false);  
      }
  };
  const GoExam = () => {
    navigate('/ExamList', {
      state: {
        id: dynamicId,
        token: dynamicToken,
       
      },
    });
  };

  return (
    <div>
      <h1  style={{ marginLeft: '250px' }}>List of Transaction Details:</h1>

      <div style={{ display: 'flex', marginLeft: '320px' }}>
  <button onClick={fetchTransactions} style={{ marginLeft: '10px' }}>
    Check Transactions
  </button>
  <button style={{ marginLeft: '10px' }} onClick={GoExam}>
    Go to Exam
  </button>
</div>
        {loading && <h3 style={{ marginLeft: '250px', color: '#FF0000',  }}>Loading All Transactions...</h3>}
      {transactions.map((transaction, index) => (
        <div key={transaction.Payment.id}>
            <div className='transaction'>
          <h3  style={{ color: '#FF0000' }}>Transaction {index + 1}</h3>
          <p>Amount: {transaction.Payment.amount}</p>
          <p>Payment Created: {transaction.Payment.created}</p>
          <p>Payment status: {transaction.Payment.status}</p>
          <p>Payment Method: {transaction.Payment.payments_from}</p>
         
          </div>
          <hr />
        </div>

      ))}
    </div>
  );
};

export default TransactionDetails;
