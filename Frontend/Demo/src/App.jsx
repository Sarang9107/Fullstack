import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState({ name: '', rollNumber: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/info')
      .then(response => {
        setInfo(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="App">Loading...</div>;
  if (error) return <div className="App">{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Portfolio</h1>
        <p><strong>Name:</strong> {info.name}</p>
        <p><strong>Roll Number:</strong> {info.rollNumber}</p>
        <p>Data fetched from backend API!</p>
      </header>
    </div>
  );
}

export default App;
