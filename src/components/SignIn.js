import { useEffect, useState } from "react";

function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState('Это поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Это поле не может быть пустым');

  const [passwordVisibility, setpasswordVisibility] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if(nameError || passwordError){
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordError, nameError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, password };

    try {
      const response = await fetch('http://localhost:3001/api/findUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Помилка при виконанні запиту', error);
    }
  };

  const blurHandler = (e) => {
    switch(e.target.name){
      case 'name':
        setNameDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      default:
        return
    }
  }

  const nameHandler = (e) => {
    setName(e.target.value);
    if(!e.target.value){
      setNameError('Это поле не может быть пустым')
    } else {
      setNameDirty(false);
      setNameError('');
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if(!e.target.value){
      setPasswordError('Это поле не может быть пустым')
    } else {
      setPasswordDirty(false);
      setPasswordError('');
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="info">Заполните поля для того, чтобы <br /> зайти в свой аккаунт</div>

        <div className="login input">
          <input type="text" name="name" onChange={(e) => nameHandler(e)} onBlur={(e) => blurHandler(e)} placeholder="E-mail или логин" autoComplete="off"/>
          {(nameDirty && nameError) && <div className="error"> <div className="err-msg" data-title={nameError}></div> </div>}
        </div>

        <div className="password input">
          <input type={passwordVisibility ? "text" : "password"} name="password" onChange={(e) => passwordHandler(e)} onBlur={(e) => blurHandler(e)} placeholder="Пароль" autoComplete="off"/>
          {(passwordDirty && passwordError) && <div className="error"> <div className="err-msg" data-title={passwordError}></div> </div>}
          <input type="checkbox" id="password-toggle" onClick={() => !passwordVisibility ? setpasswordVisibility(true) : setpasswordVisibility(false)} />
          <label className="pass-btn" htmlFor="password-toggle">
            <div className="eye-pass"></div>
          </label>
        </div>

        <button type="submit" disabled={!formValid} className="form-button button">Войти</button>
        <div className="password-info">
          <a href="#/" className="password-recovery">Забыли пароль?</a>
        </div>
      </div>
    </form>
  )
}

export default SignIn;