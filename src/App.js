import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import '../src/pages/Registration.css';
import Login from './pages/login';
import ExamList from '../src/pages/ExamList';
import VerifyEmail from '../src/pages/VerifyEmail';
import RegistrationForm from '../src/pages/Registration';
import ExamPage from '../src/pages/StartExam';
import FinishExam from '../src/pages/Finish';
import ResultExam from '../src/pages/Myresult';
import PackageDetails from '../src/pages/Packages';
import CreateOrder from '../src/pages/RazorpayPayment';
import TransactionDetails from '../src/pages/Transaction';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ExamList" element={<ExamList />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/StartExam" element={<ExamPage />} />
        <Route path="/Finish" element={<FinishExam />} />
        <Route path="/Myresult" element={<ResultExam />} />
        <Route path="/Packages" element={<PackageDetails />} />
        <Route path="/RazorpayPayment" element={<CreateOrder />} />
        <Route path="/Transaction" element={<TransactionDetails />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </BrowserRouter>
  );
};

const NotFound = () => {
  return (
    <div className='noroute'>
      <div className='content'>
        <h1>404 Page Not Found</h1>
        <p>
          Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
        </p>
        <p>
          <a href="/"><strong>&lt; Back to our site</strong></a>
        </p>
      </div>
    </div>
  );
};


export default App;
