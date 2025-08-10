import React from 'react'

const UserList = async () => {
    const response = await fetch("http://localhost:3000/api/test");
    const test = await response.json();
    
  return (
    <>
    <div>UserList</div>
    <div>API result: {test.message}</div>
    </>
  )
}

export default UserList