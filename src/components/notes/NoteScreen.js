import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note)
    const { body, title} = formValues;

    const dispatch = useDispatch();

    const activeId = useRef(note.id);

    useEffect(() => {
        if(activeId.current !== note.id){
            reset(note);
            activeId.current = note.id;
        }
        
    }, [reset, note]);

   

    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues})) 
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch(startDelete(note.id))
    }

    return (
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>
                {
                    (note.url) &&
                    <div className='notes__image'>
                        <img
                            src={note.url}
                            alt='imagen'
                        />
                    </div>
                }
            </div>
            <button className='btn btn-danger'
                onClick={handleDelete}
            >
                DELETE
            </button>
        </div>
    )
}

export default NoteScreen
