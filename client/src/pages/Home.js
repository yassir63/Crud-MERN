// npm i axios for front end and backend linking
// and add proxy in package.json

import React, { useEffect , useState } from 'react'
import InputGroup from '../components/InputGroup'
import RowDetail from '../components/RowDetails'
import Alert from '../components/Alert'
import axios from 'axios'

function Home() {
  // useeffect is used in action without button but with the start of the component !
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.post('/api/users', form)
    .then(res=>{
      console.log(res.body)
      setMessage(res.data.message)
      /* hide form after save */
      setForm({})
      /* hide errors after save */
      setErrors({})
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
    })
    .catch(err=>setErrors(err.response.data))
    
  }

  useEffect(() => {
    const getUsers = async () => {
      await axios.get('/api/users')
      .then(res => {
        // console.log(res)
        setUsers(res.data)
      })
    }

    getUsers();
    
  })

  const OnDelete = (id__)=>{
    if(window.confirm("are you sure to delete this user")){
 
     axios.delete(`/api/users/${id__}`)
     .then(res=>{
      setMessage(res.data.message)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 4000);
     })
    }
   }

  return (
    <div>
        <div className="row p-4">

        <Alert  message={message} show={show}/>
        
     <div className="mt-4">
        <h2>Crud Users</h2>
     </div>
     <div className="col-12 col-lg-4">
         <form onSubmit={onSubmitHandler}>
            <InputGroup label="Email" type="text" name="Email" onChangeHandler={onChangeHandler} errors={errors.Email}/>
            <InputGroup label="Lastname" type="text" name="Lastname" onChangeHandler={onChangeHandler} errors={errors.Lastname}/>
            <InputGroup label="Firstname" type="text" name="Firstname" onChangeHandler={onChangeHandler} errors={errors.Firstname}/>
            <InputGroup label="Age" type="text" name="Age" onChangeHandler={onChangeHandler} errors={errors.Age}/>
            <button className="btn btn-primary" type="submit" >Add user</button>
         </form>
     </div>
     <div className="col-12 col-lg-7">
        <table className="table">
            <thead>
              <tr>
                <th scope='col'>Email</th>
                <th scope='col'>Lastname</th>
                <th scope='col'>Firstname</th>
                <th scope='col'>Age</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                users.map(({Email, Lastname, Firstname, Age, _id}) => {
                  
                  <RowDetail Email={Email} Lastname={Lastname} Firstname = {Firstname} Age={Age} Id={_id}/>
                ))
              } */}

{users.map(({ Email, Lastname, Firstname, Age, _id }) => (
              <RowDetail
                Email={Email}
                Lastname={Lastname}
                Firstname={Firstname}
                Age={Age}
                Id={_id}
                OnDelete={OnDelete}                
              />
            ))}
                
            </tbody>
        </table>    
     </div>
    </div>
    </div>
  )
}

export default Home