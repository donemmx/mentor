import React from 'react'
import { registerUser } from '../../utils/Validation'
import { useRecoilState } from 'recoil'
import { registerUserAtom } from '../../atom/registrationAtom'
import { useEffect } from 'react'
import { user } from '../../atom/userAtom'

export default function ProfileAccount() {
  const [ userData ] = useRecoilState(user)

  useEffect(() => {
    console.log('Hello world')
    console.log(userData)
  }, [])

  return (
    <div>
      <div className="h-[70vh] mt-5  ">
          <div className='flex flex-wrap items-center my-1'>
            <span className='text-[30px] font-bold mr-5 p-0'>{userData.firstName} {userData.lastName}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>        
            <span className=' ml-2'>{userData.province}</span>
          </div>
          <div className=''>Role - {userData.role}</div>
          <br />
          <div>
            <table>
              <tr>
                <td className='font-bold p-5 border'>Phone</td>
                <td className='px-5'>{userData.phone}</td>
              </tr>
              <tr>
                <td className='font-bold p-5 border'>Address</td>
                <td className='px-5'>{userData.provice} {userData.postalcode}</td>
              </tr>
              <tr>
                <td className='font-bold p-5 border'>Email</td>
                <td className='px-5'>{userData.id}</td>
              </tr>
              <tr>
                <td className='font-bold p-5 border'>Gender</td>
                <td className='px-5'>Female</td>
              </tr>
            </table>

          </div>
        </div>
    </div>
  )
}
