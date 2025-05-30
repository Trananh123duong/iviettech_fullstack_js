import React from 'react'
import MainCss from './Main.module.css'

const Main = ({isShowSiderBar}) => {
  return (
    <div className={`${MainCss.main_container} ${isShowSiderBar ? MainCss.show_sidebar : ''}`}>
      <form>
        <div>
          <label for="userName">UserName</label><br />
          <input type="text" name="userName" id="userName" />
          <span class="error"></span>
        </div>
        <div>
          <label for="password">Password</label><br />
          <input type="password" name="password" id="password" />
          <span class="error"></span>
        </div>
        <div>
          <label for="confirmPassword">Confirm Password</label><br />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          <span class="error"></span>
        </div>
        <button id="submitButton" type="button">Submit</button>
      </form>
    </div>
  )
}

export default Main
