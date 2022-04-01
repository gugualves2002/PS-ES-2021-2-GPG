
import React, {useRef, useState} from 'react'
import{ Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== 
            passwordConfirmRef.current.value){
                return setError('Senha informada não é idêntica')
            }
            try{
                setError('')
                setLoading(true)
               await signup(emailRef.current.value, passwordRef.current.value)
               
            }catch{
                setError('Falha em criar conta')
            }
            setLoading(false)

        
    }

  return (
    <>
    <Card>
        <Card.Body>
            <h1 className='text-center mb-3'>GPG</h1>
            <h2 className='text-center mb-4'>Cadastre-se</h2>
            
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

                <Form.Group id='password-confirm'>
                    <Form.Label>Confirme a senha</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} required />
                </Form.Group>
              <Button disabled={loading} className='w-100 mt-4' type='submit' >Cadastrar</Button>

            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Já possui uma conta? <Link to="/login" style={{ textDecoration: 'none' }}>Entrar</Link>
    </div>

    </>
  )
}
