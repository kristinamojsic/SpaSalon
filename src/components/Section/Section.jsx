import React from 'react';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import './Section.css';

function Section({ title, description, image, leftbtn, rightbtn,pageType }) {
    const showButtons = pageType !== 'zaposleni'  && pageType !== 'korisnik';
    return (
        <Wrap bgImage={image}>
            <Fade bottom>
                <ItemText>
                    <h2>{title}</h2>
                    <p className='paragraf'>{description}</p>
                </ItemText>
            </Fade>
            <Buttons>
                <Fade bottom>
                <ButtonGroup>
    {showButtons && (
        <>
            <LeftButton>{leftbtn}</LeftButton>
            {rightbtn && <RightButton>{rightbtn}</RightButton>}
        </>
    )}
</ButtonGroup>
                </Fade>
                <DownArrow src="/images/down-arrow.svg" />
            </Buttons>
        </Wrap>
    );
}

export default Section;


const Wrap = styled.section`
    height: 100vh;
    weight: 100vw;
    background-size: cover;
    background-image: url('/images/${(props) => props.bgImage}');
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
`;

const ItemText = styled.div`
    padding-top: 15vh;
    text-align: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    margin-bottom: 50px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LeftButton = styled.div`
    background-color: rgba(23, 26, 32, 0.8);
    height: 60px;
    width: 265px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    opacity: 0.85;
    text-transform: uppercase;
    font-size: 20px;
    cursor: pointer;
    margin: 20px;
`;
const RightButton = styled(LeftButton)`
    background: #fff;
    opacity: 0.65;
    color: #000;
    font-size: 20px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const DownArrow = styled.img`
    height: 40px;
    margin-bottom: 20px;
    overflow-x: hidden;
    animation: animateDown infinite 1.5s !important;
`;
