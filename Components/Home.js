import React, { useState } from 'react'

// 
import axios from 'axios';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Url Validation
import { isWebUri } from 'valid-url';
import { Spinner } from 'react-bootstrap';

export default function Home() {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [postLoading, setPostLoading] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(value){
            if(isWebUri(value)) {
                setError('')
                try{
                    setPostLoading(true)
                    await axios.post(`/api/links`, {
                        originalLink: value
                    })
                    setPostLoading(false)
                }catch(err){
                    setPostLoading(false)
                    console.log(err.message)
                    setError(err.message)
                }
                console.log('Done.')
            }else{
                setError('Not A valid URL!')
            }
        }
    }
    return (
        <div className=''>
            <h1>Home</h1>
            <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <Form.Group className="" controlId="formBasicEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control value={value} onChange={(e) => setValue(String(e.target.value))} type="text" placeholder="Enter Url" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {error && !postLoading && <p className='text-danger'>{error}</p>}
            {postLoading && !error && <Spinner animation="border" variant="secondary" />}
        </div>
    )
}
