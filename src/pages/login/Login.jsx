
import React,{useState,useEffect} from 'react'
import "./login.scss"
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const Login = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {

      e.preventDefault();

      const user = {
          email, password
      }

      dispatch(login(user));
  }

  if(auth.authenticate){
      return <Navigate to={`/`} />
  }
  return (
    <div>
      <section className="register">

<form action="" onSubmit={(e)=>e.preventDefault()}>
    <h3>register now</h3>
    <input type="email" name="" placeholder="enter your email" id="" className="box"value={email}  onChange={(e) => setEmail(e.target.value)}  />
    <input type="password" name="" placeholder="enter your password" id="" className="box"  value={password}   onChange={(e) => setPassword(e.target.value)} />
    <input type="submit" value="register now" className="btn" onClick={userLogin} />
</form>

</section>
    </div>
  )
}

export default Login