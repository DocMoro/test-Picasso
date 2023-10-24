import './App.css';

import { useRoutes } from 'react-router-dom';
import ROUTES from '../constants/constans'

function App() {
  let routes = useRoutes(ROUTES);

  return routes;
}

export default App;
