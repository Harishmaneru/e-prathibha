import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExamPage = () => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState(null);
  const location = useLocation();
  const [selectedExamName, setSelectedExamName] = useState('');
  const { id, token, examId } = location.state;
  console.log(id);
  console.log(token);
  console.log('examid:', examId);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch(`https://test.e-prathibha.com/apis/start_exam?examId=${examId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
            Id: id,
            tokenu: token,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
          setExamData(data.data.exam);
          setSelectedExamName(data.data.exam[0].Exam.name);
        } else {
          console.error('Failed to fetch exam data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchExamData();
  }, [id, token, examId]);

  const handleFinishExam = () => {
    navigate('/Finish', {
      state: {
        id: id,
        token: token,
        examId: examId,
      },
    });
  };

  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      alert('You have been logged out!');
      navigate('/login');
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  if (!examData) {
    return <h2 className="exname" style={{ color: '#FF0000' }}>Loading Exam...</h2>;
  }

  return (
    <div>
      <br />
      <br />
      <h2 className="exname" style={{ color: '#FF0000' }}>Selected Exam: {selectedExamName}</h2>
      <ul className="list">
        {examData.map((item, index) => (
          <li key={index}>
            {item.Question && (
              <div className="exam-q">
                <h3>Question {index + 1}</h3>
                <div
                  className="exam-q1"
                  dangerouslySetInnerHTML={{ __html: item.Question.question.above }}
                />
                <div className="exam-q2">
                  {Object.keys(item.Question)
                    .filter((key) => key.startsWith('option') && item.Question[key])
                    .map((optionKey, optionIndex) => (
                      <label key={`${index}-${optionIndex}`} className="exam-option">
                        <input
                          type={item.Question.qtype_id === '1' ? 'radio' : 'checkbox'}
                          name={`question_${index}`}
                          value={item.Question[optionKey]}
                        />
                        <span className="" dangerouslySetInnerHTML={{ __html: item.Question[optionKey] }} />
                      </label>
                    ))}
                </div>
              </div>
            )}

            {item.Exam && (
              <div>
                <p>Exam Name: {item.Exam.name}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="finish-exam-btn" onClick={handleFinishExam}>
        Submit
      </button>
    </div>
  );
};

export default ExamPage;
