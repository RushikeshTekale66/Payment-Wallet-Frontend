import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../../Components/PageTitle';


const Home = () => {
  const { user } = useSelector(state => state.users);
  // const dispatch = useDispatch;
  return (
    <div>
      <PageTitle title={
        `Hellow ${user.firstName} ${user.lastName}, Welcome to the Wallet`
      } />

      <div className='bg-tertiary p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase'>
        <div className='flex justify-between'>
          <h1 className='text-md text-white'>Account Number</h1>
          <h1 className='text-md text-white'>{user._id}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md text-white'>Balence</h1>
          <h1 className='text-md text-white'>$ {user.balence || 0}</h1>
        </div>
      </div>
      <div className='card p-2 mt-2 w-50 br-3 flex flex-col gap-1 uppercase'>
        <div className='flex justify-between'>
          <h1 className='text-md '>First Name</h1>
          <h1 className='text-md '>{user.firstName}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md '>Last Name</h1>
          <h1 className='text-md '>{user.lastName}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md '>Email</h1>
          <h1 className='text-md '>{user.email}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md '>Mobile</h1>
          <h1 className='text-md '>{user.phoneNumber}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md '>Identificatin Type</h1>
          <h1 className='text-md '>{user.identificationType}</h1>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-md '>Identificatin Number</h1>
          <h1 className='text-md '>{user.identificationNumber}</h1>
        </div>
      </div>
    </div>
  )
}

export default Home