import React, { useEffect } from 'react';
import { useUsersState, useUsersDispatch, getUser } from './UsersContext';

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  useEffect(() => {
    getUser(dispatch, id)
  }, [dispatch, id]);

  const { loading, data: user, error } = state.user; // 비구조화 할당을 통한 이름(key) 바꾸기 (data -> user)

  if (loading) return <div>LOADING....</div>;
  if (error) return <div>ERROR!!</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email: </b> {user.email}
      </p>
    </div>
  );
}

export default User;