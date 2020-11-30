import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App() {
  const [devocion, setDevotion] = useState(undefined);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    axios.get('https://devotionals-api.herokuapp.com/api/v1/devotionals/today')
    .then(({data}) => setDevotion(data[0]))
    .catch((erro) => setError(erro))
    .finally(() => setIsLoad(true))
  },[]);

  if(error)
    return(
      <div className="App">
        <h2>Ocurio un error</h2>
        <p>Error: {error.message}</p>
      </div>
    );
  else if(!isLoad)
    return(
      <div className="App">
        <h2 className="loading">Cargando...</h2>
      </div>
    );
  else
    return(
      <div className="App">
        <Devocional data={devocion}/>
      </div>
    );
}

function Devocional({data}){
  return(
    <div className="devocion">
      <div className="devocion-content">
        <p className="devDate">{data.date}</p>
        <h2 className="devTitle">{data.title}</h2>
        <p className="devVers">{data.vers}</p>
        <div className="devContent">
            {data.content.map((n,m) => <p key={m}>{n}</p>)}
        </div>
        <h3>Feliz Dia!!!</h3>
      </div>
    </div>
  );
}

export default App;
