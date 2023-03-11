import styled from "styled-components"
import axios from "axios"
import {useEffect, useState } from "react"
import { useParams } from 'react-router-dom';


export default function Seat({assento, chosenSeats}) {
    const [isSelected, setIsSelected] = useState(null)

    function selectSeat(assento){
        if(chosenSeats.includes(assento.id)){
            const index = chosenSeats.indexOf(assento.id)
            chosenSeats.splice(index,1)
            setIsSelected(null)
        } else {
            chosenSeats.push(assento.id)
            setIsSelected(assento.id)
        }
    }

    return (
     <>
     <SeatItem onClick={() => {selectSeat(assento)}} isSelected={isSelected} isAvailable={assento.isAvailable}>{assento.name}</SeatItem>
     </>
    )
}

const SeatItem = styled.div`
    border: ${(props) => (props.isAvailable ? '#7B8B99' : '#F7C52B')};
    background-color:  ${(props) => (props.isSelected ? '#1AAE9E' : props.isAvailable ? '#C3CFD9' : '#F7C52B')};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`