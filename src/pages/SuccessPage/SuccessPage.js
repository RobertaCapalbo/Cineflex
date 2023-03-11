import styled from "styled-components"
import axios from "axios"
import {useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

export default function SuccessPage({name, cpf, ids, titulo, dia, horario}) {
    const navigate = useNavigate()

    function returnHomePage() {
        navigate("/")
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{titulo}</p>
                <p>{dia} - {horario}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                <p>Assento 01</p>
                <p>Assento 02</p>
                <p>Assento 03</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <button>Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`