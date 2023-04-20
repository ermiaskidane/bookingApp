import { Fragment, useRef, useContext, useState } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { auth, provider, provider2 } from '../firebase'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

export default function Login({ closeLogin }) {
  // const [user, setUser] = useState('')
  const [open, setOpen] = useState(true)

  const { user, loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const cancelButtonRef = useRef(null)

  const signInWithGoogle = async () => {
    dispatch({ type: 'LOGIN_START' })

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        axios
          .post('/auth/google', {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            // close the google login
            // setOpen((prevState) => !prevState)
            // setUser(res.data)
            navigate('/')
          })
      })
      .catch((err) => {
        console.log('@@@@@@@@@@@@@@@@@', err)
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
      })
  }

  console.log('~~~~~~~~~~~~~~~~~~~~', user)
  return (
    <Transition.Root
      show={open}
      as={Fragment}
      onClick={() => closeLogin(false)}
    >
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex  justify-center sm:px-6'>
                  <button
                    type='button'
                    className=' w-1/2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                    onClick={signInWithGoogle}
                  >
                    Google Login
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
