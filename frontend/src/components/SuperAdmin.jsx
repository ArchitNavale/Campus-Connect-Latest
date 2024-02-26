import React, {useState} from 'react'

function SuperAdmin() {
    const [club, setClub] = useState('');
    const [rollnumber ,setRoll] = useState('');
    const [name ,setName] = useState('');
    const [password ,setPass] = useState('');
    const handleClick = () => {
        fetch('/add-club', {
            method:'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                club,
                rollnumber,
                name,
                password
            })
        }).then(res=>res.json()).then((res) => console.log('superadmin', res))
    }
  return (
    <div className='text-black-500 bg-green-200'>
      want to add club?
      <input type='text' onChange={(e) => setClub(e.target.value)}/>
     name: <input type='text' onChange={(e) => setName(e.target.value)}/>
     roll: <input type='text' onChange={(e) => setRoll(e.target.value)}/>
     pass: <input type='text' onChange={(e) => setPass(e.target.value)}/>
      <button onClick={handleClick}>Add club</button>
    </div>
  )
}

export default SuperAdmin;
