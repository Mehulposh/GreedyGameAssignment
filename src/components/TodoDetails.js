"use client"
import Status from '@/components/Badge'
import DateFormater from '@/utils/DateFormater';
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { TbFlag3 } from "react-icons/tb";
import { SlCalender } from "react-icons/sl"

export default function TodoDetails({todo,onClose,handleEdit,handleDelete}){

    return (
        <div className='absolute top-0 left-0 right-0 h-full w-full flex justify-end bg-black/30'>

            <div className='p-10 w-1/3 bg-white h-screen'>
                <div className='flex justify-between items-center  text-lg'>
                <h4 className='font-semibold'>Todo Details</h4>
                <button className='text-gray-400 cursor-pointer' onClick={onClose}>
                    X
                </button>
                </div>
                <h1 className='text-2xl font-semibold mt-5'>{todo.title}</h1>

                <div className='flex justify-start items-center gap-10 mt-5'>
                    <p className='flex gap-1 items-center justify-start'>
                        <SlCalender className='size-5 text-gray-400'/>
                        Due Date
                    </p>
                    {DateFormater(todo.due_at)}
                </div>
                <div className='flex justify-start items-center gap-15 mt-5'>
                    <p className='flex gap-1 items-center justify-start'> 
                        <TbFlag3 className='size-5 text-gray-400'/>
                        Status
                    </p>
                    <Status status={todo.completed} />
                </div>

                <div className="space-x-3 mt-5">
                    <button  onClick={() => handleEdit(todo)}>
                        <BiEditAlt className='size-6 text-gray-400'/>
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>
                        <MdDeleteForever className='size-6 text-gray-400'/>
                    </button>
                </div>

                <hr className='mt-5 text-gray-300'/>

                <div className='flex flex-col justify-start items-start gap-2 mt-5'>
                    <p className='font-semibold text-md'>Description</p>
                    <p className='text-sm  w-full '>{todo.description}</p>
                </div>
            </div>
        </div>
    )
}