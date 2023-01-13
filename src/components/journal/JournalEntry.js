import moment from 'moment'
import React from 'react'
import {useDispatch} from 'react-redux'
import { activeNote } from '../../actions/notes';

const JournalEntry = ({id, date, body, title, url}) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleActiveNote = () => {
        const note = {
            date, body, title, url
        }
        dispatch(activeNote(id, note))
    }

    return (
        <div 
        className='journal__entry animate__animated animate__fadeIn animate__faster'
            onClick={handleActiveNote}
        >
            {
                (url) &&
                <div 
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
                className='journal__entry-picture'>
            </div>
            }
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    {title}
                </p>
                <p className='journal__entry-content'>
                    {body}
                </p>
            </div>
            <div className='journal__entry-date-box'>
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('DD')}</h4>
            </div>
        </div>
    )
}

export default JournalEntry
