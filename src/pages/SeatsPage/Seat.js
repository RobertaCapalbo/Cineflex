import styled from "styled-components"
import axios from "axios"
import {useEffect, useState } from "react"
import { useParams } from 'react-router-dom';


export default function Seat({assento, chosenSeats, seatsIds, setSeatsIds}) {
    const [isSelected, setIsSelected] = useState(null)


    function selectSeat(e, assento){
        e.stopPropagation()
        console.log(assento)
        if(assento.isAvailable === false){
            return
            }
        if(chosenSeats.includes(assento.name)){
            const index = chosenSeats.indexOf(assento.name)
            chosenSeats.splice(index,1)
            const indexIDS = seatsIds.indexOf(assento.id)
            setSeatsIds(seatsIds.splice(indexIDS,1))
            setIsSelected(null)
        } 
        else {
            chosenSeats.push(assento.name)
            chosenSeats.sort()
            console.log(seatsIds)
            setSeatsIds([...seatsIds, assento.id])
            console.log(seatsIds)
            setIsSelected(assento.id)
        }
    }

    return (
     <>
     <SeatItem onClick={(e) => {selectSeat(e, assento)}} isSelected={isSelected} isAvailable={assento.isAvailable}>{assento.name}</SeatItem>
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