import './App.css';
import CardsDatail from './Routs/Card';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewUser from './Routs/NewUser';
import EditUser from './Routs/EditUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const url = "https://demo-rnvn.onrender.com"

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<CardsDatail/>} />
      <Route path='/new' element={<NewUser/>} />
      <Route path='/edit/:id' element={<EditUser/>} />
      <Route path="*" element={<Navigate to='/'/>}  />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
