import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useEffect, useState } from "react"


export default function App() {
    const [cpf, setCPF] = useState("")
    const [nome, setNome] = useState("")
    let chosenSeats = []
    // let seatsIDS = []
    const [seatsIds, setSeatsIds] = useState([])
    const [title, setTitle] = useState("")
    const [day, setDay] = useState("")
    const [time, setTime] = useState("")
    
    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>

            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/assentos/:idSessao" element={<SeatsPage 
                    cpf={cpf}
                    setCPF={setCPF}
                    nome={nome}
                    setNome={setNome}
                    chosenSeats={chosenSeats}
                    setTime={setTime}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setSeatsIds={setSeatsIds}
                    seatsIds={seatsIds}/>}/>
              <Route path="/sessoes/:idFilme" element={<SessionsPage 
                    setTitle={setTitle}
                    title={title}/>}/>
              <Route path="/sucesso" element={<SuccessPage 
                    cpf={cpf}
                    setCPF={setCPF}
                    nome={nome}
                    setNome={setNome}
                    chosenSeats={chosenSeats}
                    setTitle={setTitle}
                    title={title}
                    setTime={setTime}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setSeatsIds={setSeatsIds}
                    seatsIds={seatsIds}
                    />}/>
            </Routes>

        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
