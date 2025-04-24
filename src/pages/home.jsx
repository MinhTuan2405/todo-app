import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    const getNote = async () => {
        await api.get('/api/notes/')
            .then(res => res.data)
            .then(res => { setNotes(res); console.log(res); })
            .catch((err) => {
                toast.error("Failed to fetch notes")
                console.log (err)
            })
    }

    const deleteNote = async (id) => {
        await api.delete(`/api/notes/delete/${id}/`)
            .then(res => {
                if (res.status === 204) {
                    toast.success("Note deleted")
                    getNote()
                } else {
                    toast.error("Failed to delete note")
                }
            })
            .catch(err => {
                toast.error("Error deleting note")
                console.log (err)
            })
    }


    const createNote = async (e) => {
        e.preventDefault()
        await api.post('/api/notes/', { content, title })
            .then(res => {
                if (res.status === 201) {
                    toast.success("Note created")
                    setTitle("")
                    setContent("")
                    getNote()
                } else {
                    toast.error("Failed to create note")
                }
            })
            .catch(err => {
                toast.error("Error creating note")
                console.log (err)
            })
    }

    useEffect(() => {
        getNote()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">📒 Your Notes</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {notes.map((note) => (
                        <Note key={note.id} note={note} onDelete={deleteNote} />
                    ))}
                </div>

                <div className="mt-12 p-6 bg-white shadow-lg rounded-2xl border border-blue-100">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">✍️ Create New Note</h2>
                    <form onSubmit={createNote} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                className="w-full mt-1 px-4 py-2 h-28 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
