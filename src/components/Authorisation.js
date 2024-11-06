import {useState} from "react";
import Register from "./Register";
import SignIn from "./SignIn";

function Authorisation() {
  const [selectedOption, setOption] = useState(0);

  return(
    <div className={selectedOption === 1 ? "authorisation-block register" : "authorisation-block sign-in"}>
      <div className="switcher">
        <div className={selectedOption === 0 ? "switch-item item-active" : "switch-item"} onClick={() => {setOption(0)}}>Вход</div>
        <div className={selectedOption === 1 ? "switch-item item-active" : "switch-item"} onClick={() => {setOption(1)}}>Регистрация</div>
        <span className={selectedOption === 1 ? "triangle register-checked" : "triangle"}></span>
      </div>
      {selectedOption === 1 ? <Register /> : <SignIn />}
    </div>
  )
}

export default Authorisation;