/*
Hooks: Primeiro Api: useStatus
       Segundo Api: useEffect
       Terceiro Api: useMemo
       Quarto Api: useCallback
*/

import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

    const [tarefas, setTarefas] = useState([]);

    const [input, setInput] = useState('');

    // Ciclos de vida dos componentes (useEffect)
    useEffect(() => {
        const tarefasStorage = localStorage.getItem('tarefas');

        // Adiciona no setTarefas
        if(tarefasStorage){
            setTarefas(JSON.parse(tarefasStorage));
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    /*
    function handleAdd(){
        setTarefas([...tarefas, input]);
        setInput('');
    }
    */

    const handleAdd = useCallback(() => {
        setTarefas([...tarefas, input]);
        setInput('');
    }, [input, tarefas]);

    const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

    return(
        <div>
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa}>{tarefa}</li>
                ))}
            </ul>
            <br/>
            <strong>Você tem {totalTarefas} tarefas!</strong><br/>        
            <input type="text" value={input} onChange={e => setInput(e.target.value)}></input>
            <br/>
            <button type="button" onClick={handleAdd}>Adicionar</button>
        </div>
    );
    
}

export default App;
