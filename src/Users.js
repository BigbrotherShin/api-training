import React, { useState } from 'react';
import User from './User';
import styled, { css } from 'styled-components';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';

const UserItem = styled.li`
  &:hover {
    cursor: pointer;
  }
  ${props =>
    props.check &&
    css`
      font-weight: bold;
    `}
`;

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
    setUserId(null);
  };

  if (loading) return <div>LODADING...</div>;
  if (error) return <div>ERROR!!!</div>;
  if (!users) return <button onClick={fetchData}>LOADING</button>

  return (
    <>
      <ul>
        {users.map(user => (
          <UserItem
            check={userId === user.id}
            key={user.id}
            onClick={() => setUserId(userId === user.id ? null : user.id)}
          >
            {user.username} ({user.name})
          </UserItem>
        ))}
      </ul>
      <button onClick={fetchData}>RELOADING</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
