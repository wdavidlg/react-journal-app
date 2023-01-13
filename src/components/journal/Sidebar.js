import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { cleanNotesLogout, startNewNote } from '../../actions/notes'
import JournalEntries from './JournalEntries'

const Sidebar = () => {

    const {name} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(cleanNotesLogout())
    }

    const handleNewEntry = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className='jounal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <i className='far fa-moon' />
                    <span> {name} </span>
                </h3>
                <button className='btn'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className='journal__new-entry'
                onClick={handleNewEntry}
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>
                    New Entry
                </p>
            </div>

            <JournalEntries/>
        </aside>
    )
}

export default Sidebar
