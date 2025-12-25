import axios from 'axios'
import { useState, useEffect } from 'react'
import "./documentsList.css"
const api = import.meta.env.VITE_apiUrl
export default function list(props) {
    const [documents, setDocuments] = useState([])
    async function load() {
        try {
            let res = await axios.get(`${api}/documents/`)
            setDocuments(res.data.data)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        load();
    }, [props.refresh]);
    async function download(id) {
        try {
            window.location.href = `${api}/documents/${id}`
        }
        catch (e) {
            console.log(e)
            alert(`Download failed`)
        }
    }
    async function del(id) {
        try {
            await axios.delete(`${api}/documents/${id}`)
            alert('Deleted Succesfully')
            load()
        }
        catch (e) {
            console.log(e)
            alert('Delete Failed')
        }
    }
    return (<ul>
        {
            documents.map((doc) => {
                return <li>
                    <strong>{doc.originalname}</strong>
                    <div>
                        <button className="download" onClick={() => { download(doc.id) }}> Download </button>
                        <button className="delete" onClick={() => { del(doc.id) }}> Delete </button>
                    </div>
                </li>
            })
        }
    </ul>)
}