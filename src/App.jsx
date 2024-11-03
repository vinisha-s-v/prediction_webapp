
import HomePage from './pages/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  

  return (
   <div>
    <HomePage/>
    <ToastContainer />
   </div>
  );
}

export default App;
