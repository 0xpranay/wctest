import logo from './logo.svg';
import './App.css';
import CustomButton from './CustomButton';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function App() {

  function getLibrary(provider){
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <CustomButton> </CustomButton>
          
        </header>
      </div>
    </Web3ReactProvider>
  );
}

export default App;
