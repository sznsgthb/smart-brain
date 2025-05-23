import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, sentiments }) => { //add: sentiments as props
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt=' ' width='1000px' height='auto' />
                <div 
                    className='bounding-box'
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol}}>
                </div>
            </div>

                        {/* Sentiment output */}
                        {sentiments.length > 0 && (
                <div className='sentiment-output mt3'>
                    <h3>Detected Sentiments:</h3>
                    <ul>
                        {sentiments.map((concept, index) => (
                            <li key={index}>
                                {concept.name}: {(concept.value * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FaceRecognition;