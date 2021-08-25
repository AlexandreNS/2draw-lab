import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from "./pages/Home";
import { PersonConfig } from "./pages/PersonConfig";
import { Draw } from './pages/Draw';
import { Header } from "./components/Header";

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/person-config" exact component={PersonConfig} />
          <Route path="/draw" exact component={Draw} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;