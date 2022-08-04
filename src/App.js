import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [cats, setCats] = useState();
  const [token, setToken] = useState();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      fetch('http://localhost/sanctum/csrf-cookie', {
        method: 'get',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: 'same-origin',
      }).then((response) => {
        // console.log(response);
        fetch('http://localhost/api/login', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            email: "vturner@example.org",
            password: "password"
          })
        }).then((response_one) => response_one.json())
          .then((data) => {
            // console.log(data);
            fetch('http://localhost/api/categories', {
              method: 'GET',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + data.data?.token
              },
              credentials: 'same-origin',
            }).then((response_two) => response_two.json())
              .then((data) => {
                console.log(data.data?.data)
              }).catch((e) => { console.log(e) });
          }).catch((e) => { console.log(e) });
      });
    }
  }, []);

  return (
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
          Learn React sasas
        </a>
      </header>
    </div>
  );
}

export default App;
