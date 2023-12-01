import React from 'react'
import LoginForm from '../ui/login/loginForm/LoginForm';
import styles from '../ui/login/login.module.css'

 
// export const metadata = {
//   title: 'login | ADMIN DASHBOARD',
// };

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm/>
    </div>
  );
}

export default LoginPage