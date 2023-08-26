import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FinishExam = () => {
  const navigate = useNavigate();
  const [examCompletionStatus, setExamCompletionStatus] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const location = useLocation();
  const id = location.state.id; 
  const token = location.state.token ;
  const eId = location.state.examId;
  
  useEffect(() => {
    const handleFinishExam = async () => {
      try {
        const requestOptions = {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
            id: id,
            tokenu: token,
          },
          body: JSON.stringify({
            examId: eId,
            qno: '1',
          }),
        };
        const response = await fetch('https://test.e-prathibha.com/apis/finishExam', requestOptions);
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (data.status === 200) {
          setExamCompletionStatus(data.data);
          setIsFinished(true);
        } else {
          console.log('Exam not Finished!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    handleFinishExam();
  }, [id, token, eId]);

  // const goToExamList = () => {
  //   navigate('/ExamList', {
  //     state: {
  //       id: id,
  //       token: token,
  //     },
  //   });
  // };

  const goToResultPage = () => {
    navigate('/Myresult', {
      state: {
        id: id,
        token: token,
        eId:eId
      },
    });
  };

  return (
    <div>
      {isFinished && examCompletionStatus && (
        <div>
          <h2>Exam Completion Status</h2>
          <p className="successmsg">{examCompletionStatus}</p>
        </div>
      )}
      <div className='exam-list-container'>
        {/* <button className="finish-exam-btn" onClick={goToExamList}>
          Go to Exam List
        </button> */}
        <br/>
        <button className="result-page-btn" onClick={goToResultPage}>
          Go to Result
        </button>
      </div>
    </div>
  );
};

export default FinishExam;
