import logo from './logo.svg';
import './App.css';
import { ThemeProviderWrapper } from './theme';
import MainLayout from './component/mainLayout';

/*global chrome*/
function App() {
  return (
    <ThemeProviderWrapper>
      <MainLayout />
    </ThemeProviderWrapper>
  );
}

export default App;
