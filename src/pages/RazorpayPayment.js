import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentGatewayResponse, setPaymentGatewayResponse] = useState(null);
  const [razorpayResponse, setRazorpayResponse] = useState(null);
  const Id = location.state.id;
  const tokenu = location.state.token;
  const amount1 = parseInt(location.state.amount);
  console.log('amnt', amount1);

  useEffect(() => {
    const yearValue = amount1 === 499 ? '' : '1';
    console.log('yearvalue', yearValue);
    const apiUrl = 'https://test.e-prathibha.com/apis/test_paymentGateway';
    const requestData = {
      packagearr: {
        '8': '1'
      },
      packagetype: 'RAZORPAY',
      year: yearValue
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        tokenu: tokenu,
        Id: Id,
        server_key: '3w99V63pW7tJ7vavGXtCKo8cp'
      },
      body: JSON.stringify(requestData)
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPaymentGatewayResponse(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [tokenu, Id, amount1]);

  useEffect(() => {
    const options = {
      key: 'rzp_test_NA7TTMupwqAPlH',
      currency: 'INR',
      amount: amount1 * 100,
      name: 'HarishManeru',
      description: 'e-prathibha premium packages',
      prefill: {
        name: 'Enter your name'
      },
      notes: {
        address: 'Hyderabad'
      },
      theme: {
        color: '#4caf50'
      },
      handler: function (response) {
        if (response.error) {
          console.log('Payment error:', response.error);
          alert('Payment failed!');
        } else {
          console.log('Payment success:', response);
          setRazorpayResponse(response);
          alert('Payment successful!');
          navigate('/ExamList', {
            state: {
              id: Id,
              token: tokenu
            }
          });
        }
      },
      modal: {
        ondismiss: function () {
          alert('Payment canceled!');
          navigate('/ExamList', {
            state: { 
              id: Id,
              token: tokenu
            }
          });
        }
      }
    };

    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, [amount1, navigate, Id, tokenu]);

  useEffect(() => {
    if (razorpayResponse && paymentGatewayResponse) {
      const apiUrl = 'https://test.e-prathibha.com/apis/success';
      const requestData = {
        orderId: paymentGatewayResponse.data.order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          tokenu: tokenu,
          Id: Id,
          serverkey: '3w99V63pW7tJ7vavGXtCKo8cp'
        },
        body: JSON.stringify(requestData)
      };

      fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Handle success response
        })

        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [razorpayResponse, paymentGatewayResponse, tokenu, Id]);

  return (
    <div>
      
    </div>
  );
};

export default CreateOrder;
