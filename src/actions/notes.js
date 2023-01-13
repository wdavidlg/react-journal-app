import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/config";
import { types } from "../types/types";


export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        try {
            const cNotes = collection(db, `${uid}/journal/notes`);
            const docRef = await addDoc(cNotes, newNote);
            console.log('Se ha insertado: ', docRef.id);
            dispatch(activeNote(docRef.id, newNote))
            dispatch(addNewNote(docRef.id, newNote))
        } catch (error) {
            console.log('Error insertar NewNote');
        }


    }
}

const addNewNote = (id, newNote) => {
    return {
        type: types.notesAddNew,
        payload: {
            id,
            ...newNote
        }
    }
}

export const activeNote = (id, newNote) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...newNote
        }
    }
}

export const startLoadNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const notes = [];
        try {
            const cNotes = collection(db, `${uid}/journal/notes`)
            const querySnapshot = await getDocs(cNotes);
            querySnapshot.forEach((doc) => {
                notes.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            dispatch(loadNotes(notes));
        } catch (error) {
            console.log('Error load notes');
        }
    }
}

const loadNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!note.url) {
            delete note.url
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            const docRef = doc(db, `${uid}/journal/notes`, note.id);
            await updateDoc(docRef, noteToFirestore);
            dispatch(refreshNote(note));
            Swal.fire("Saved", note.title, "success");
        } catch (error) {
            console.log("Error save note", error);
        }
    }
}

const refreshNote = (note) => {
    return {
        type: types.notesUpdated,
        payload: { ...note }
    }
}

export const startUploadFile = (file) => {
    return async (dispatch, getState) => {

        const { active: noteActive } = getState().notes;

        try {
            const cloudUrl = "https://api.cloudinary.com/v1_1/djxert0q5/upload";
            const formData = new FormData();
            formData.append("upload_preset", "react-journal");
            formData.append("file", file);
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            })
            const result = await fetch(cloudUrl, {
                method: "POST",
                body: formData
            })
            if (result.ok) {
                const cloudResp = await result.json();
                noteActive.url = cloudResp.secure_url;
                dispatch(startSaveNote(noteActive));

            } else {
                throw new Error("No se pudo subir");
            }
            Swal.close();
        } catch (error) {
            console.log("Error upload picture");
        }
    }
}

export const startDelete = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        try {
            const docRef = doc(db, `${uid}/journal/notes`, id);
            await deleteDoc(docRef);
            dispatch(deleteNote(id));
            Swal.fire("Delete", "Delete note success", "warning")
            
        } catch (error) {
            console.log("Error delete note");
        }
    }

}

const deleteNote = (id) => {
    return {
        type: types.notesDeleted,
        payload: {id}
    }
}

export const cleanNotesLogout = () => {
    return {
        type: types.notesLogoutCleaning
    }
}