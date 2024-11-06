function Info() {
  return(
    <div className="info-block">
       <div className="info-header">
        Заработок в <br /> Интернете без <br /> вложений
       </div>
       <div className="info-descripton">
          {'>'}Выполняй простые <br />
          задания в тематике <br /> криптовалюты
          <br /><br />{'>'}Получи свои первые <br /> 100 $
          <br /><br />{'>'}Выводи деньги на <br /> свой кошелек <br /><br /> 
       </div>
       <a href="#/" className="info-link">Узнать подробнее</a>
       <div className="info-card card-1">
        <div className="card-header">Активных заданий <br /> на платформе</div>
        <div className="card-value">1 271</div>
       </div>
       <div className="info-card card-2">
        <div className="card-header">Выплачено денег <br /> пользователям</div>
        <div className="card-value">4 942 376 $</div>
       </div>
       <div className="info-card card-3">
        <div className="card-header">Зарегистрированных <br /> пользователей</div>
        <div className="card-value">18 953</div>
       </div>
    </div>
  )
}

export default Info;