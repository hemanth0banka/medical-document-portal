import UploadForm from "./components/uploadForm.jsx"
import List from "./components/documentsList.jsx"
import { useState } from 'react'
import "./App.css"
export default function App() {
    const [fresh, refresh] = useState(false)
    function trigger() {
        refresh((prev) => {
            return !prev
        })
    }
    return (<>
        <UploadForm onUpload={trigger} />
        <List refresh={fresh} />
    </>)
}