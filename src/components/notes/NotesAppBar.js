import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadFile } from '../../actions/notes'

const NotesAppBar = () => {

    const dispatch = useDispatch()
    const {active: note} = useSelector(state => state.notes)
    const dateNote = moment(note.date);
    const handleSave = () => {
        dispatch(startSaveNote(note));
    }

    const handlePicture = () => {
        const fileSelector = document.querySelector('#fileSelector');
        fileSelector.click();
    }

    const handleInputFile = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(startUploadFile(file))
        }
    }

    return (
        <div className='notes__appbar'>
            <span>{`${dateNote.format("D")} de ${dateNote.format("MMMM")}`}</span>
            <input 
                type={"file"}
                id='fileSelector'
                style={{display: 'none'}}
                onChange={handleInputFile}
            />
            <div>
                <button className='btn'
                    onClick={handlePicture}
                >
                    Picture
                </button>
                <button className='btn'
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default NotesAppBar
