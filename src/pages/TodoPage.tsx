import React, { useEffect, useState } from 'react'
import {SiSpringCreators} from 'react-icons/si'
import {AiOutlinePlus} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { useAppDispatch } from '../hooks/redux'
import { ChangeTodo, createTask, CreateTodo, DeleteTodo, GetTodo } from '../store/reducers/todo/ActionTodo'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { TTask, TTodo } from '../ts/type'
import { addNewTask, changeCurrentTask, changeCurrentTodo, deleteTask, setCurrentTask, setCurrentTodo } from '../store/reducers/todo/TodoSlice'

export const TodoPage = () => {
  const dispatch = useAppDispatch()
  const {todos} = useSelector((state: RootState)=> state.todo)
  const [createTodoInput, setCreateTodoInput] = useState('')
  useEffect(() => {
    dispatch(GetTodo({}))
  }, [])
  
  const createTodo = async ()=> {
    if(createTodoInput.length === 0){
      alert('Введите название todo листка, чтобы его создать')
    }else{
      dispatch(CreateTodo({name: createTodoInput}))
      setCreateTodoInput('')
    }

  }
  return (
    <div className='todos'>
      {todos?.length > 0 && todos.map((todo: TTodo, index: number)=>  <div onClick={()=> dispatch(setCurrentTodo({
        todo: todo,
        index: index
      }))} key={todo.id} className='todo todos__todo'>
          <div className='img todo__img'>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
          </div>
          <div className='todo__name'>
            <input onBlur={()=> dispatch(ChangeTodo(todo))} onChange={(e)=> dispatch(changeCurrentTodo({name: e.target.value}))} value={todo!.name}/>
            <div onClick={()=> {
              dispatch(addNewTask({index}))
              dispatch(createTask({
              todo, index
            }))}} className='btn_plus'>
              <AiOutlinePlus />
            </div>
          </div>
          <div className='todo_wrapper'>
            {todo.tasks?.length > 0 && todo.tasks.map((task: TTask, index_task: number)=>
            <div key={task.id + index_task} onClick={()=> dispatch(setCurrentTask({index: index_task}))} className='task todo__task'>
                <input onChange={(e)=> {
                  dispatch(changeCurrentTask({complete: e.target.checked}))
                  dispatch(ChangeTodo(todo))
                }} checked={task.complete} type={'checkbox'}/>
                <div className='line task__line'></div>
                <div className='line task__line_2'></div>
                <div className='name task__name'>
                  <input style={{textDecoration: task.complete ? 'line-through' : 'none'}} onBlur={()=> dispatch(ChangeTodo(todo))} value={task.name} onChange={(e)=> dispatch(changeCurrentTask({name: e.target.value}))}/>
                  <div onClick={()=> {
                    dispatch(deleteTask({index_task, index}))
                    dispatch(ChangeTodo(todo))
                  }} className='task__delete'><RiDeleteBin6Line /></div>
                </div>
              </div>)}
          </div>
          <div onClick={()=> dispatch(DeleteTodo(todo))} className='delete_btn'><RiDeleteBin6Line /></div>
      </div>)}
      <div className='todo todos__todo'>
          <div className='img todo__img'>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
            <div className='spring_img'><SiSpringCreators /></div>
          </div>
          <div className='todo__name'><input onBlur={()=> createTodo()} value={createTodoInput} onChange={(e)=> setCreateTodoInput(e.target.value)} placeholder='Название todo листа'/></div>
      </div>
    </div>
  )
}

// todo 1 Прикрепление файлов к записи
// todo 2 Реализовать дату завершения записи