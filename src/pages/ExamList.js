import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExamList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [exams, setExams] = useState([]);
  const [showExams, setShowExams] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
const dynamicId = location.state.id;
 const dynamicToken = location.state.token;

 // console.log(dynamicId);
  //console.log(dynamicToken);

  useEffect(() => {
    const fetchExamList = async () => {
      try {
        const response = await fetch('https://test.e-prathibha.com/apis/test_free_exam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            id: dynamicId,
            server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
            tokenu: dynamicToken,
          },
        });
        const data = await response.json();
       // console.log('API response:', data);
        if (data.status === 200) {
          setExams(data.data.exams);
         // console.log(showExams);
        } else {
          console.error('Failed to fetch exam list');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (showExams) {
      fetchExamList();
    }
  }, [showExams, dynamicId, dynamicToken]);

  const handleClickLoadExams = () => {
    setShowExams(true);
  };

  const handleClickExam = (exam) => {
  //  console.log('Selected Exam:', exam);
    setSelectedExam(exam);
  };

  const handleStartExam = (examId) => {
    navigate('/StartExam', {
      state: {
        id: dynamicId,
        token: dynamicToken,
        examId: examId,
      },
    });
  };
  const handleClickPackage = () => {
    navigate('/Packages', {
      state: {
        id: dynamicId,
        token: dynamicToken,
      },
    });
  };

  const handleClickTransactions = () => {
    navigate('/Transaction', {
      state: {
        id: dynamicId,
        token: dynamicToken,
      },
    });
  };


  const renderExamDetails = (exam) => {
    const examDetails = Object.entries(exam).map(([key, subExams]) => {
      if (Array.isArray(subExams)) {
        const subDetails = subExams.map((subExam) => (
          <li key={subExam.Exam.id} className="exam-item">
            <div className="exam-name">{subExam.Exam.name}</div>
            <div className="button-container">
              <button className="start-exam-btn" onClick={() => handleStartExam(subExam.Exam.id)}>
                Start Exam
              </button>
            </div>
          </li>
        ));

        return (
          <li key={key}>
            <h4>{key}</h4>
            <ul className="sub-exam-list">{subDetails}</ul>
          </li>
        );
      }
      return null;
    });

    return <ul className="exam-details">{examDetails}</ul>;
  };


  return (
    <div className="exam-list-container">
      <nav className='nav'>
        <h2 className='e-p'>E-PRATHIBHA UPSC Civils Papers!</h2>
        <div className="navbar">
        <button className="navbar-btn" onClick={handleClickPackage}>
            Package Details
          </button>
          <button className="navbar-btn" onClick={handleClickTransactions}>
            Transactions
          </button>
        </div>
      </nav>
         <br/>
        <br/>
        <br/>
      {!showExams && <button onClick={handleClickLoadExams}>Load Exams</button>}
      
      {showExams && (
        <div className="exam-list">
          {exams.map((exam, index) => (
            <div key={index} className="exam-item">
              <h3>{exam.name}</h3>
              <div className="button-container">
                {index === 0 && (
                  <button className="view-exam-btn" onClick={() => handleClickExam(exam)}>
                    Old question papers for UPSC Civils (Pre)
                  </button>
                )}
                {index === 1 && (
                  <button className="view-exam-btn" onClick={() => handleClickExam(exam)}>
                    Limited UPSC exams other than Civils
                  </button>
                )}
                {index === 2 && (
                  <button className="view-exam-btn" onClick={() => handleClickExam(exam)}>
                    Limited NCERT exams
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedExam && (
        <div className="selected-exam-details">
          <h3>Selected Exam: {selectedExam.name}</h3>
          {renderExamDetails(selectedExam)}
        </div>
      )}
      <br />
    </div>
  );
};

export default ExamList;
