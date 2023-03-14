import styled from "styled-components"
import axios from "axios"
import {useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import Seat from "./Seat";
import { useNavigate } from "react-router-dom"

export default function SeatsPage({cpf, setCPF, nome, setNome, chosenSeats, setTime, setDay, setSeatsIds, seatsIds}) {
    const [seats, setSeats] = useState([])
    const { idSessao } = useParams()
    const navigate = useNavigate()
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    useEffect(() => {
        const promise = axios.get(url)
        promise.then((res) => {
            setSeats(res.data)
            setDay(res.data.day.date)
            setTime(res.data.name)    
        })

        promise.catch(err => console.log(err.response.data))
    }, [])

    if (seats.length === 0) {
        return <PageContainer><img src={"https://serravelha.com.br/images/loader.gif"} alt="loading" /></PageContainer>
    }

        async function finalizarCompra (event) {
            event.preventDefault();

            const informacoesFinais = {
                ids: seatsIds,
                name: nome,
                cpf: cpf,
            }
     
            console.log(informacoesFinais)
            try {
                await axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", informacoesFinais)
                console.log("try")
                navigate("/sucesso")
            } catch (error) {
                console.log(error)
            }
    
        }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer data-test="seat">
            {seats.seats.map((assento) => (
               <Seat seatsIds={seatsIds} setSeatsIds={setSeatsIds} key={assento.id} assento={assento} chosenSeats={chosenSeats}></Seat>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircleS />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleD />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircleI />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>
      
            <FormContainer>
            <form onSubmit={finalizarCompra}>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..." type="text" value={nome} onChange={(event) => setNome(event.target.value)} required/>

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." type="text" value={cpf} onChange={(event) => setCPF(event.target.value)} required/>

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
            </form>    
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircleS = styled.div`
    border: #0E7D71;      
    background-color: #1AAE9E;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    
`

const CaptionCircleD = styled.div`
    border: #7B8B99;
    background-color: #C3CFD9;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    
`
const CaptionCircleI = styled.div`
    border: #F7C52B; 
    background-color: #FBE192;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`