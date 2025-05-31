import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f4'>
                {'This is the Magic Brain.'}
            </p>
            <p className='f4'>
                {'It can detect faces and guess their mood.'}
            </p>
            <p className='f4'>
                {'Give it a go and drop a URL below!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input
                        className='f4 pa2 w-70 center'
                        type='text'
                        onChange={onInputChange} />
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white'
                        style={{ backgroundColor: '#5a8cdb' }}
                        onClick={onPictureSubmit}
                        >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;