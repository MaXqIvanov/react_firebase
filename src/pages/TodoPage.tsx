import React, { useEffect, useState } from 'react'
import {SiSpringCreators} from 'react-icons/si'
import {AiOutlinePlus} from 'react-icons/ai'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineFileAdd} from 'react-icons/ai'
import {BsFileArrowDownFill} from 'react-icons/bs'
import {AiOutlineQuestion} from 'react-icons/ai'
import { useAppDispatch } from '../hooks/redux'
import { ChangeTodo, createTask, CreateTodo, DeleteTodo, getFile, GetTodo, uploadFile } from '../store/reducers/todo/ActionTodo'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { TTask, TTodo } from '../ts/type'
import { addNewTask, changeCurrentTask, changeCurrentTodo, changeDateTask, deleteTask, setCurrentTask, setCurrentTodo, uploadTaskFile } from '../store/reducers/todo/TodoSlice'
import 'dayjs/locale/ru';
import moment from 'moment';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import useClickOutSide from '../hooks/useClickOutSide'

const locales = ['ru'] as const;

export const TodoPage = () => {
  const dispatch = useAppDispatch()
  const {todos, current_index_task} = useSelector((state: RootState)=> state.todo)
  const [createTodoInput, setCreateTodoInput] = useState('')
  const [date, setDate] = useState(dayjs(new Date()));
  const [currentDate, setCurrentDate] = useState<any>()
  const [locale, setLocale] = useState<typeof locales[number]>('ru');
  const [isVisibleDescription, setIsVisibleDescription] = useState<boolean>(false)
  useEffect(() => {
    dispatch(GetTodo({}))
  }, [])

  const text_area = useClickOutSide(()=> {
    setIsVisibleDescription(false)
  })
  
  const createTodo = async ()=> {
    if(createTodoInput.length === 0){
      alert('Введите название todo листка, чтобы его создать')
    }else{
      dispatch(CreateTodo({name: createTodoInput}))
      setCreateTodoInput('')
    }

  }

  const [file, setFile] = useState<any>()
  const handleCapture = ({ target }: any) => {
    setFile(target.files[0]);
    console.log(target.files[0]);
    dispatch(uploadTaskFile({file: target.files[0]}))
    dispatch(uploadFile({file: target.files[0]}))
  };

  const changeDate = ({value, index, index_task, todo}:{value:any, index: number, index_task: number, todo: TTodo}) => {
    setDate(value)
    dispatch(changeDateTask({date: value}))
    dispatch(ChangeTodo(todo))
  }

  useEffect(() => {
    let current_date:any = moment()
    setCurrentDate(current_date._d.getTime())
    setInterval(()=> {
      setCurrentDate(current_date._d.getTime())
    }, 10000)
  }, [])
  
  

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
            <>
            <div key={task.id} onClick={()=> dispatch(setCurrentTask({index_task, index}))} className='task todo__task'>
                <input onChange={(e)=> {
                  dispatch(changeCurrentTask({complete: e.target.checked}))
                  dispatch(ChangeTodo(todo))
                }} checked={task.complete} type={'checkbox'}/>
                <div className='line task__line'></div>
                <div className='line task__line_2'></div>
                <div className='name task__name'>
                  <input style={{textDecoration: (task.complete || currentDate > new Date(task.finish_date).getTime()) ? 'line-through' : 'none'}} onBlur={()=> dispatch(ChangeTodo(todo))} value={task.name} onChange={(e)=> dispatch(changeCurrentTask({name: e.target.value}))}/>
                  <div title="Удалить задачу" onClick={()=> {
                    dispatch(deleteTask({index_task, index}))
                    dispatch(ChangeTodo(todo))
                  }} className='task__delete'><RiDeleteBin6Line /></div>
                </div>
                {
                  task.file?.length > 1 ?
                  <div title="Скачать файл" onClick={()=> dispatch(getFile({task}))} className='upload_file'>
                    <BsFileArrowDownFill />
                  </div>
                  :
                  <label title='Прикрепить файл к задаче' htmlFor={`${task.id}`} className='load_file'>
                    <AiOutlineFileAdd />
                    <input onChange={handleCapture} type={'file'} id={`${task.id}`} style={{opacity: '0', maxHeight: '1px', maxWidth: '1px'}}/>
                  </label>
                }
                <LocalizationProvider adapterLocale={locale} dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    className='date_picker'
                    renderInput={(props:any) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={task.finish_date}
                    onChange={(value:any) => {
                      changeDate({value, index, index_task, todo});
                    }}
                  />
                </LocalizationProvider>
                <div onClick={()=> setIsVisibleDescription(!isVisibleDescription)} title="Показать описание задачи" className='task__description'><AiOutlineQuestion /></div>
              </div>
            {isVisibleDescription && index_task === current_index_task && <div ref={text_area}><textarea onMouseLeave={()=> dispatch(ChangeTodo(todo))} value={task.description} onChange={(e)=> dispatch(changeCurrentTask({description: e.target.value}))} className='task__area'/></div>}
            </>
            )}
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