import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultExam = () => {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const location = useLocation();
  const id = location.state.id;
  const token = location.state.token;
  const e1Id = location.state.eId;
  console.log(id);
  console.log(token);
  console.log(e1Id);
  useEffect(() => {
    const fetchExamResult = async () => {
      try {
        const response = await fetch('https://test.e-prathibha.com/apis/my_result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
            id: id,
            tokenu: token,
          },
          body: JSON.stringify({
            id: id,
          }),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.ok && data.status === 200) {
          const filteredResults = data.data.filter(examResult => examResult.Exam.id === e1Id);
          setResultData(filteredResults);
          setIsFinished(true);
        } else {
          console.log('Failed to fetch exam result');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchExamResult();
  }, [id, token, e1Id]);

  const goToExamList = () => {
    navigate('/ExamList', {
      state: {
        id: id,
        token: token,
      },
    });
  };

  if (!resultData) {
    return <h2 className="exname" style={{ color: '#FF0000' }}>Loading Results...</h2>;
  }

  return (
    <div >
      {isFinished && resultData && resultData.length > 0 && (
        <div className="result">
          {/* <h2 style={{ color: '#FF0000' }} >Exam Result</h2> */}
          <br/>
          <br/>
          <br/>
          <fieldset className='fieldset' style={{ width: '400px', margin: '0 auto' }}>
          <legend style={{ fontSize: '20px', fontWeight: 'bold',color: '#FF0000' }}>Results:</legend>
          <div>
            <h3 style={{ color: '#FF0000' }} >Submitted Exam: {resultData[0].Exam.name}</h3>
            <hr style={{ width: '80%' ,color: '#FF0000'  }} />
            <p>Total Question: {resultData[0].Result.total_question}</p>
            <p>Total Answered: {resultData[0].Result.total_answered}</p>
            <p>Percent: {resultData[0].Result.percent}</p>
            <p>Result: {resultData[0].Result.result}</p>
          </div>
          </fieldset>
        </div>
      )}
      <div className='exam-list-container'>
        <button className="finish-exam-btn" onClick={goToExamList}>
          Go to Exam List
        </button>
      </div>
    </div>
  );
};

export default ResultExam;
