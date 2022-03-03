import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([{ message: 'Loading...' }]);
  const [input, setInput] = useState("");
  const fetchMessages = async () => {
    await fetch('http://localhost:8080/messages')
      .then(response => response.json())
      .then(data => setMessages(data.messages.sort((a, b) => b.date - a.date)));
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  const sendMessage = async () => {
    try {
      await fetch('http://localhost:8080/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input, date: Date.now() })
      })
        .then(response => response.json())
        .then(data => console.log(data));
    } catch (err) {
      console.log(err);
    }

    await fetchMessages();
    setInput("");
  }

  return (
    <div className="App">
      <h1>Messages: </h1>
      <textarea
        cols="50" rows="5"
        style={{ marginBottom: '5px' }}
        type="text" value={input} placeholder="Enter message" onChange={(e) => setInput(e.target.value)} />
      <button
        style={{ marginBottom: '5px' }}
        onClick={() => sendMessage(input)}>Send</button>
      {messages.map(m => {
        return (
          <div style={{
            border: "1px solid red",
            marginBottom: "5px",
            minWidth: "150px",
          }}>
            <h2>{m.message}</h2>
            <p>{new Date(m.date).toUTCString()}</p>
          </div>
        )
      })}
    </div>
  );

}

export default App;
