import React from 'react'
import { useSelector } from 'react-redux';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {

    const {notes} = useSelector(state => state.notes);

    const showEntries = () => {
       return notes.map((note) => (
            <JournalEntry 
                key={note.id}
                {...note} 
            />    
       ));
    }
    return (
        <div className='journal__entries'>
            {showEntries()}
        </div>
    )
}

export default JournalEntries
