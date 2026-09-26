import { useState, useEffect} from "react"
import './tasks.css';
export default function TodoApp(){

const [task, setTask] =useState([
    {id: 1, title:"Задание 1", done: false, deadline: null},
    {id: 2, title:"Задание 2", done: true, deadline: "2025-12-31"}
]);

const [input,setInput] =useState("");
const [deadline,setDeadline] =useState("");





const addTask =(e) =>{
    e.preventDefault();
    const trimmed = input.trim();
    if(!trimmed) return;


const newTask = {
    id: crypto.randomUUID(),
    title: trimmed,
    done: false,
    deadline: deadline === "" ? null : deadline
};

setTask((prev)=>[...prev,newTask]);
setInput("");
setDeadline("");
};

const toggleTask =(id)=>{
    setTask((prev)=>
    prev.map((t)=>(t.id ===id? {...t,done : !t.done} : t))
    );
};

const deleteTask =(id)=>{
        setTask((prev)=> prev.filter((t)=> t.id !==id));
};

const todayIso = (ofsetDays = 0)=>{
    const today = new Date()
    today.setDate(today.getDate()+ ofsetDays)

    let year = String(today.getFullYear()).padStart(4,"0")
    let month = String(today.getMonth() + 1).padStart(2,"0")
    let day = String(today.getDate()).padStart(2,"0")
    return(`${year}-${month}-${day}`)
    
}

const deadlineWithColor = (deadline,done)=>{
    if(!deadline){return null}
    let deadlineColor = null
    if(done === true){return null}
    if(deadline < todayIso()){deadlineColor = "color_red"}
    if(deadline === todayIso() || deadline === todayIso(1)){deadlineColor = "color_yellow"}
    return(deadlineColor)
};


useEffect(()=>{localStorage.setItem("task", JSON.stringify(task))})

return(
 <>
 <h1>Todo</h1>

 <form onSubmit={addTask}>
    <input value={input} 
    onChange={(e)=> setInput(e.target.value)}
    placeholder="Новая задача"
    />
    <input type="date" 
    value={deadline}
    onChange={(e)=> setDeadline(e.target.value)}
    
    />
    <button type ="submit">Добавить</button>
 </form>
 
 {task.length ===0 ?(
    <p>Список пуст</p>
 ):(
    <ul>
        {task.map((t)=>(
            <li key = {t.id}>
                <input type="checkbox"
                checked={t.done}
                onChange={()=> toggleTask(t.id)}
                />
                {t.title}
                {t.deadline && (<span className={deadlineWithColor(t.deadline,t.done)}>Дедлайн:{t.deadline}</span>)}
                <button onClick={()=> deleteTask(t.id)}>Удалить</button>
            </li>
        ))}
    </ul>
 )}
 </>   
)



}

