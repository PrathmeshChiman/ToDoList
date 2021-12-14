import './App.css';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap-css-only/css/bootstrap.min.css'; 

let ID = 0;

function EditItem(props){
  const {todo,todos,setTodos,setValue,setFlag} = props;
  const {id} = todo;

  return(
    <div>
      <input type="text" placeholder="Enter a new task" onKeyUp={function(e){
        if (e.key === 'Enter' || e.keyCode === 13) {
          if(e.target.value !==""){
            const newTodo = todos.map((item) => {
            if(item.id === id){
              return { task: e.target.value,id:id}
            }
            return item;  
          })
          setTodos(newTodo);
          setValue("");
          setFlag(false)
          // console.log("edit",id,todos,newTodo);
        }
        // console.log("Enter event Occured",e.target.value);
        }
      }} autoFocus/>
    </div>
  )
}

function TodoItem(props){
  const {todo,todos,setTodos,value,setValue} = props;
  const { task, id} = todo;
  const [flag, setFlag] = useState(false);

  if(flag === true){
    // console.log("RERENDERING");
    return(
      <>
      <div className="items">
        {task}
        <div>
          <EditItem todo={todo} todos={todos} setTodos={setTodos} value={value} setValue={setValue} setFlag={setFlag}/>
        </div>
        <div>
          <button className="backBtn" onClick={function(){
            setFlag(false);
            }}  title="Cancel">X</button>
        </div>
        
      </div>
    </>
    )
  }else{
    return(
      <>
      <div className="items">
      <div>
        {task}
      </div>
        <div>
          <button onClick={function(){
            setFlag(true);
            if(value !==""){
              const newTodo = todos.map((item) => {
              if(item.id === id){
                return { task: value,id:id}
              }
              return item;  
            })
            setTodos(newTodo);
            setValue("");
            // console.log("edit",id,todos,newTodo);
          }}} className="btn btn-success btn-sm rounded-0 editbtn" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></button>
          <button onClick={function(){
            if(window.confirm("Are you sure about deleting the item")){
              const newTodo = todos.filter((item) => {
                return item.id !== id;
              })
              setTodos(newTodo);
              // console.log("delete",id,todos,newTodo);
            }       
          }} className="btn btn-danger btn-sm rounded-0 deletebtn" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
        </div>     
      </div>
    </>
    )
  }
}

function TodoList(props){
  const {todos, setTodos,value,setValue} = props;

  return(
    <div>
        {todos.map((todo) => {
          return <TodoItem todo={todo} todos={todos} setTodos={setTodos} value={value} setValue={setValue}/>
        })}
    </div>
  )
}

function ToDoApp(){
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  return(
    <>
      <div className="main-container">
        <h1 style={{color:"red"}}>To Do List</h1>
        <br></br>
        <input type="text" placeholder="Enter a Task" onChange={(e) => {
          setValue(e.target.value);
        }} value = {value} />
        <button onClick={ function(){
          if(value !== ""){
            // setTodos([...todos,value]); 
            setTodos( [...todos,{ task: value,id: ID++}])
            setValue("");
          }
        }} className="btn btn-primary btn-sm rounded-0 addbtn" type="button" data-toggle="tooltip" data-placement="top" title="Add">Add</button>        
        <div className="itemList">
          <TodoList todos={todos} setTodos={setTodos} value={value} setValue={setValue}/>
       </div>
      </div>  
    </>
  )
}

function App() {
  return (
    <ToDoApp/>
  );
}

export default App;

// To Develop a To-Do-List.
// Feature: Assign dates to task,add and check task on day basis and add future task by selecting different date.
// Role: Developer | Tech Stack: React JS.
