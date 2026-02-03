import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()

  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }

  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    console.log([...passwordArray, form])
    setForm({site: "", username: "", password: ""})
    toast('Password saved successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  
  const deletePassword = (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Do you really want to delete the password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast('Password deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    setForm(passwordArray.filter(item=>item.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    } else {
      alert("Do you want to show the password?");
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]"></div>
      <div className="bg-cyan-50 mycontainer w-3/4 my-8 rounded-2xl">
        <h1 className='logo font-bold text-2xl text-center'>LockR</h1>
        <p className='text-center'>Your own Password Manager</p>
        <div className="flex flex-col p-4 gap-4 items-center">
          <input onChange={handleChange} value={form.site} placeholder='Enter Website URL' className='bg-white rounded-full w-full border border-cyan-200 p-4 py-1' type="text" name="site" id="" />
          <div className="flex w-full justify-between gap-8">
            <input onChange={handleChange} name='username' value={form.username} placeholder='Enter Username' className='bg-white rounded-full w-full border border-cyan-200 p-4 py-1' type="text" />
            <div className="relative">
              <input ref={passwordRef} onChange={handleChange} value={form.password} name='password' placeholder='Enter Password' className='bg-white rounded-full w-full border border-cyan-200 p-4 py-1' type="password" />
              <span onClick={showPassword} className="absolute right-1 top-1 cursor-pointer">
                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-cyan-200 rounded-full px-4 py-1 w-fit hover:bg-cyan-400 gap-2 border-2 border-cyan-400 m-4'>
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover">
            </lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4 pt-0'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className='bg-cyan-300'>
                <tr>
                  <th className='py-2'>Website</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-cyan-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='py-2 border border-white text-center'>
                      <div className="flex items-center justify-center">
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center '>
                        <span>{item.username}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center '>
                        <span>{item.password}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='justify-center py-2 border border-white text-center'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  )
}

export default Manager
