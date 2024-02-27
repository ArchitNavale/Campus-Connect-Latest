import React, { useState, useEffect } from "react";
const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = () => {
        fetch('/allusers')
            .then(res => res.json())
            .then((result) => {
                setUsers(result)
            })
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <div className="text-black">
            <h1>Users</h1>
            {users?.map((user, i) => {
                return (
                    <div key={i}>
                        name: {user?.name}
                        club: {user?.club}
                    </div>
                )
            })}
        </div>
    )
}
export default ViewUsers;