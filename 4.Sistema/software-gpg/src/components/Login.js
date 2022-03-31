
import React, {useRef, useState} from 'react'
import{ Form, Button, Card, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

            try{
                setError('')
                setLoading(true)
               await login(emailRef.current.value, passwordRef.current.value)
               history.push("/")
            }catch{
                setError('Falha em entrar com conta')
            }
            setLoading(false)

        
    }

  return (
    <>
    <Card>
        <Card.Body>
            <h1 className='text-center mb-3'>GPG</h1>
            <h2 className='text-center mb-4'>Entre com sua conta</h2>
            
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>

                <Form.Group id='password'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>

                
              <Button disabled={loading} className='w-100 mt-4' type='submit' >Entrar</Button>

            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Não possui uma conta? <Link to="/signup" style={{ textDecoration: 'none' }}>Cadastre-se</Link>
    </div>

    </>
  )
}
