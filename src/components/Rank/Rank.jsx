import React from 'react';
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div className='rank-section'>
            <div className='white f4'>
                {`${name}, your current entry count is:`}
            </div>
            <div className='white f4'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;