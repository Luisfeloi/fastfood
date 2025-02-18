import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProductPage = () => {
  return (
    <div className="p-5 border red-500 rounded-xl">
      <h1 className='text-red-500'>Product Page</h1>
      <Button>FWS 7.0</Button>
      <Input placeholder='Bora Fechar' />
    </div>
  )
}

export default ProductPage