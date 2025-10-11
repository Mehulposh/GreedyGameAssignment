"use client"
import TodoStore from "@/store/TodoStore";
import { add } from "date-fns";
import { useState, useEffect } from "react";

export default function TodoForm({onClose,editingTodo}){
    const {addTodo,updateTodo} = TodoStore()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [formData,setFormData] = useState({
        title: '',
        description: '',
        due_at: '',
        time: '',
    })
    
    // Populate form if editing
    useEffect(() => {
        if (editingTodo) {
            const dueDate = editingTodo.due_at ? new Date(editingTodo.due_at) : null
            setFormData({
                title: editingTodo.title || '',
                description: editingTodo.description || '',
                due_at: dueDate ? dueDate.toISOString().split('T')[0] : '',
                time: dueDate ? dueDate.toTimeString().slice(0, 5) : '',
            })
        }
    }, [editingTodo])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        
        
        // Validation
        if (!formData.title.trim()) {
            setError('Title is required')
            return
        }

        try {
            setLoading(true)
            
            // Combine date and time into ISO format
            let dueDateTime = null
            if (formData.due_at && formData.time) {
                dueDateTime = `${formData.due_at}T${formData.time}:00Z`
            } else if (formData.due_at) {
                dueDateTime = `${formData.due_at}T00:00:00Z`
            }

            const todoData = {
                title: formData.title,
                description: formData.description,
                due_at: dueDateTime,
            }

            if(editingTodo){
                await updateTodo(editingTodo.id,todoData)
            }
            else{
                await addTodo(todoData)
            }
            onClose() // Close the form after successful submission
        } catch (err) {
            setError('Failed to add todo. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className=" absolute right-0 top-0 h-screen w-1/3 bg-white p-5 space-y-5 ">
                    <div className="flex justify-between items-center  font-semibold text-xl">
                        <h2>Add Todo</h2>
                        <button onClick={onClose}>
                            X
                        </button>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <label className="flex flex-col gap-2">
                            <p>Title<span className="text-red-500">*</span></p>
                            <input 
                                className="py-3 rounded-lg px-2 ring-1 ring-black/8"
                                placeholder="Enter Title"
                                value={formData.title}
                                onChange={(e)=> {setFormData({...formData,title: e.target.value})}}
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <p>Description<span className="text-red-500">*</span></p>
                            <textarea 
                                className="py-3 rounded-lg px-2 ring-1 ring-black/8"
                                placeholder="Enter Description"
                                value={formData.description}
                                onChange={(e)=> {setFormData({...formData,description: e.target.value})}}
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <p>Due Date<span className="text-red-500">*</span></p>
                            <input 
                                type="date"
                                placeholder="Choose Due Date"
                                className="py-3 rounded-lg px-2 ring-1 ring-black/8"
                                value={formData.date}
                                onChange={(e)=> {setFormData({...formData,due_at: e.target.value})}}
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <p>Due Time<span className="text-red-500">*</span></p>
                            <input 
                                type="time"
                                placeholder="Choose Due Time"
                                className="py-3 rounded-lg px-2 ring-1 ring-black/8"
                                value={formData.time}
                                onChange={(e)=> {setFormData({...formData,time: e.target.value})}}
                            />
                        </label>

                        <div className="flex items-start justify-end mt-5">
                            <button
                            type="submit" 
                            disabled={loading}
                            className="bg-green-600 text-white py-3 px-3 rounded-lg text-sm"
                            >
                                {editingTodo ? 'Update' : ' + Create Todo'}
                            </button>
                        </div>
                    </form>
                   {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
    )
}