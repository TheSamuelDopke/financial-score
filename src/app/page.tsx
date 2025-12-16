'use client'

import {db} from '../data/db/db'



export default function Home() {


const addEntity = () => {
    console.log("BOTÃO CLICADO!") // ← Isso TEM que aparecer
    if (!db) {
        console.log("DB não existe")
        return
    }
    
    db.entities.add({ 
        name: 'João', 
        type: 'Person' as const, 
        cpfCnpj: '123', 
        created: new Date().toISOString() 
    }).then(() => {
        console.log("ENTIDADE ADICIONADA!")
    }).catch(console.error)
}



  return (
    <button onClick={addEntity} style={{padding: '10px', background: 'blue', color: 'white'}}>Clique-me</button>
  );
}
