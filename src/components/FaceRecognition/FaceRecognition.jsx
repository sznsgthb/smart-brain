import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
            <div className='face-container'>
            {imageUrl ? (
                <img
                    id='inputimage'
                    src={imageUrl}
                    alt=''
                    width='100%'
                    style={{ maxWidth: '700px', height: 'auto' }}
                    />
                ) : null}
            <div 
                    className='bounding-box'
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol}}>
                </div>
            </div>
    );
}

export default FaceRecognition;