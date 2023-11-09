import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';

const RolesViewModel = () => {

  const { user } = useContext(UserContext)

  return {
    user
  }
}

export default RolesViewModel;