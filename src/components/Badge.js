"use client"

export default function Status({status}){
    return (
        <div className={`${status ? "bg-green-200 text-green-500" : "bg-yellow-100 text-yellow-600"} w-fit px-3 py-1 rounded-xl`}>
            <p>{status ? 'Completed' : "Upcoming"}</p>
        </div>
    )
}