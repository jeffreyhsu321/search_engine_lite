import React, { useState } from 'react';
import './Card.css';

function Card({title, imageUrl, artist, rank, year, snippet, lyrics}) {

    /*----------LYRICS MODAL----------*/
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <div className="card-wrapper">
                <div className="image-wrapper">
                    <img src={imageUrl} alt='' />
                </div>
                <div className="card-content">
                    <div className="card-title">
                        <h3>{title}</h3>
                    </div>
                    <div className="card-body">
                        <p>{artist}</p>
                        <p>{year}</p>
                        <p id="rank">RANK - {rank}</p>
                        <p id="snippet">..{snippet}..</p>
                    </div>
                </div>
                <div className="btn">
                    <button className="modal-open" onClick={toggleModal}>
                        view lyrics
                    </button>
                </div>
            </div>

            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-lyrics">
                        <h3>{title}</h3>
                        <h4>{artist}</h4>
                        <h4>{year}</h4>
                        <h4 id="rank">RANK - {rank}</h4>
                        <p>{lyrics}</p>
                        <button className="modal-close" onClick={toggleModal}>close</button>
                    </div>
                </div>
            )}
        </div>
    )
} export default Card;