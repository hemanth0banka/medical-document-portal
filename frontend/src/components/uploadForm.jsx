import axios from 'axios'
import { useState } from 'react'
import "./uploadForm.css"
const api = import.meta.env.VITE_apiUrl
export default function UploadForm(props) {
    const [file, setFile] = useState(null)
    function change(e) {
        const f = e.target.files[0]
        if (f.type !== 'application/pdf') {
            alert('Only pdf files allowed')
            e.target.value = ''
            setFile(null)
            return
        }
        setFile(f)
    }
    async function upload(e) {
        e.preventDefault()
        try {
            if (!file) {
                alert('please select a file')
                return
            }
            const formData = new FormData()
            formData.append('file', file)
            await axios.post(`${api}/documents/upload`, formData)
            alert('File Uploaded successfully')
            e.target.reset()
            setFile(null)
            props.onUpload()
        }
        catch (e) {
            console.log(e)
            const msg = e.response.data.message || 'Upload failed'
            alert(msg)
        }
    }
    return (<form onSubmit={upload}>
        <input type="file" onChange={change} />
        <button type="submit">upload</button>
    </form>)
}