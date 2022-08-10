import { useSelector } from 'react-redux';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Auth from './Auth/Auth';
import Sample from './Sample';

function App() {
  const user = useSelector(state => state.auth)
  return (
    <>
    <Router>
      <Routes>
        <Route path="/"  element={<Auth />}/>
        <Route path="/auth/dashboard/" element={<Sample />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
