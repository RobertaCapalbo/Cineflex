import styled from "styled-components"
import axios from "axios"
import {useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"


export default function SessionsPage({title, setTitle}) {
    const [image, setImage] = useState([])
    const { idFilme } = useParams()
  
    useEffect(() => {
      const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
      const promise = axios.get(url)
      promise.then((res) => {
        setImage(res.data)
        setTitle(res.data.title)
      })
  
      promise.catch((err) => {
        console.log(err.response.data)
      })
    }, [])
  
    if (image.length === 0) {
      return <SessionContainer><img src={"https://serravelha.com.br/images/loader.gif"} alt="loading" /></SessionContainer>
    }

    return (
        <PageContainer>
            Selecione o horário
            
         <div>
            {image.days.map((img) => (
                <SessionContainer data-test="movie-day">
                    {img.weekday} - {img.date}
                    <ButtonsContainer key={img.id}>
                    {img.showtimes.map((horario)=><Link to={`/assentos/${horario.id}`} key={horario.id}><button>{horario.name}</button></Link>)}
                    </ButtonsContainer>
                </SessionContainer>
            ))}
         </div>
           

            <FooterContainer data-test="footer">
                <div>
                    <img src={image.posterURL}  alt="poster" />
                </div>
                <div>
                    <p>{image.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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