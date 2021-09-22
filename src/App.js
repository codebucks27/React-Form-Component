import './App.css'
import useForm from './Hooks/useForm'

function App() {
  const formLogin = () => {
    //call back function
    console.log(
      'This is Callback function which is called after form submission!'
    )
    console.log('Form Values: ')
    console.log(values)
  }
  const { values, handleChange, handleSubmit, errors } = useForm(formLogin)

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='E-mail'
          onChange={handleChange}
        />
        {errors.email && <h3>{errors.email}</h3>}
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          minLength='8'
        />

        {errors.password && <h3>{errors.password}</h3>}
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          required
          minLength='5'
        />
        {errors.username && <h3>{errors.username}</h3>}

        <input type='submit' value='Submit' className='submit' />
      </form>
    </div>
  )
}

export default App
