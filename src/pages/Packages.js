import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
const PackageDetails = () => {
  const [packageData, setPackageData] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('6 months');
  const location = useLocation();
  const navigate = useNavigate();
  const dynamicId1 = location.state.id;
  const dynamicToken1 = location.state.token;
//   console.log('packageDetails:', dynamicId1);
//   console.log('packageDetails:', dynamicToken1);
  useEffect(() => {
    const fetchPackageDetails = async () => {
      const url = 'https://test.e-prathibha.com/apis/packageDetails';
      const token = dynamicToken1;
      const id = dynamicId1;
      const serverKey = '3w99V63pW7tJ7vavGXtCKo8cp';

      try {
        const response = await fetch(url, {
          headers: {
            tokenu: token,
            Id: id,
            server_key: serverKey,
          },
        });
       // console.log(response);
        const data = await response.json();
       // console.log('API data:', data);
        if (data.status === 200) {
          setPackageData(data.data);
        } else {
          console.error('Failed to fetch package details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPackageDetails();
  }, [dynamicId1, dynamicToken1, setPackageData]);

  const handlePayAmount = (amount) => {
    navigate('/RazorpayPayment', {
        state: {
          id: dynamicId1,
          token: dynamicToken1,
            amount:amount
        },
      });
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <div className="package-details-container">
      <h2>Package Details</h2>
      {packageData && (
        <div>
          <h3 style={{ color: '#FF0000' }}>Package Name: {packageData.name}</h3>
          <p>Select Duration:</p>
          <div>
            <label>
              <input
                type="radio"
                value="6 months"
                checked={selectedDuration === '6 months'}
                onChange={handleDurationChange}
              />
              6 Months
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="1 year"
                checked={selectedDuration === '1 year'}
                onChange={handleDurationChange}
              />
              1 Year
            </label>
          </div>
          <p>Selected Duration: {selectedDuration}</p>
          {selectedDuration === '6 months' && <p>Amount: {packageData.amount}</p>}
          {selectedDuration === '1 year' && <p>Amount: {packageData.amount_year}</p>}
          <button onClick={() => handlePayAmount(selectedDuration === '6 months' ? packageData.amount : packageData.amount_year)}>
            Pay Amount
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
