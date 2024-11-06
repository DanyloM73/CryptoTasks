import {useState, useEffect} from "react";

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeat, setRepeat] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [repeatVisibility, setRepeatVisibility] = useState(false);

  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [repeatDirty, setRepeatDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);

  const [passwordError, setPasswordError] = useState('Это поле не может быть пустым');
  const [emailError, setEmailError] = useState('Это поле не может быть пустым');
  const [repeatError, setRepeatError] = useState('Это поле не может быть пустым');
  const [nameError, setNameError] = useState('Это поле не может быть пустым');

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if(passwordError || emailError || repeatError || nameError){
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [passwordError, emailError, repeatError, nameError])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, password, email };

    try {
      const response = await fetch('http://localhost:3001/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('An error occurred while executing the request', error);
    }
  };

  const blurHandler = (e) => {
    switch(e.target.name){
      case 'e-mail':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'repeat':
        setRepeatDirty(true)
        break
      case 'name': 
        setNameDirty(true)
        break
      default:
        return
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный e-mail');
      if(!e.target.value) {
        setEmailError('Это поле не может быть пустым');
      }
    } else {
      setEmailDirty(false);
      setEmailError('');
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if(e.target.value.length < 7 || e.target.value.length > 15) {
      setPasswordError('Пароль должен быть длиннее 7 и короче 15 символов');
      if(!e.target.value) {
        setPasswordError('Это поле не может быть пустым');
      }
    } else {
      setPasswordDirty(false);
      setPasswordError('')
    }
  }

  const repeatHandler = (e) => {
    setRepeat(e.target.value);
    if(String(e.target.value) !== String(password)) {
      setRepeatError('Значение в этом поле не соответстует паролю, который вы задали выше');
      if(!e.target.value) {
        setRepeatError('Это поле не может быть пустым');
      }
    } else {
      setRepeatDirty(false);
      setRepeatError('');
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

  useEffect(() => {
    if(String(repeat) !== String(password)){
      setRepeatError('Значение в этом поле не соответстует паролю, который вы задали выше');
    } else {
      setRepeatDirty(false);
      setRepeatError('');
    }
  }, [repeat, password])

  return(
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="info">Заполните поля для того, чтобы <br /> зарегистрироваться</div>

        <div className="e-mail input">
          <input type="text" name="e-mail" value={email}  onBlur={(e) => blurHandler(e)} onChange={(e) => emailHandler(e)} placeholder="E-mail" autoComplete="off"/>
          {(emailDirty && emailError) && <div className="error"> <div className="err-msg" data-title={emailError}></div> </div>}
        </div>

        <div className="login input">
          <input type="text" name="name" onChange={(e) => nameHandler(e)} onBlur={(e) => blurHandler(e)} placeholder="Логин" autoComplete="off"/>
          {(nameDirty && nameError) && <div className="error"> <div className="err-msg" data-title={nameError}></div> </div>}
        </div>
        
        <div className="password input">
          <input type={passwordVisibility ? "text" : "password"} name="password" value={password} onBlur={(e) => blurHandler(e)} onChange={(e) => passwordHandler(e)} placeholder="Пароль" autoComplete="off"/>
          {(passwordDirty && passwordError) && <div className="error"> <div className="err-msg" data-title={passwordError}></div> </div>}
          <input type="checkbox" id="password-toggle" onClick={() => !passwordVisibility ? setPasswordVisibility(true) : setPasswordVisibility(false)} />
          <label className="pass-btn" htmlFor="password-toggle">
            <div className="eye-pass"></div>
          </label>
        </div>
        
        <div className="password input">
          <input type={repeatVisibility ? "text" : "password"} name="repeat" value={repeat} onBlur={(e) => blurHandler(e)} onChange={(e) => repeatHandler(e)} placeholder="Повторите пароль" autoComplete="off"/>
          {(repeatDirty && repeatError) && <div className="error"> <div className="err-msg" data-title={repeatError}></div> </div>}
          <input type="checkbox" id="repeat-toggle" onClick={() => !repeatVisibility ? setRepeatVisibility(true) : setRepeatVisibility(false)} />
          <label className="rep-btn" htmlFor="repeat-toggle">
            <div className="eye-rep"></div>
          </label>  
        </div>
        
        <div className="referral input" ><input type="text" name="referral-code" placeholder="Реферальный код" autoComplete="off"/></div>
        <button type="submit" disabled={!formValid} className="form-button button">Регистрация</button>
        <div className="privacy-info">
          <a href="#/" className="privacy-link">
          Регистрируясь, Вы принимаете наше пользовательское <br />
          соглашение, политику конфиденциальности и даете
          согласие на <br /> обработку персональных данных</a>
        </div>
      </div>
    </form> 
  )
}

export default Register;