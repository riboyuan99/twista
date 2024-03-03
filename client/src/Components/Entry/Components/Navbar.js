import React, { useState } from 'react'
import style from '../Entry.module.css'




const Navbar = () => {
  return (
    <nav>
      <div className={style["nav-logo-container"]}>
        <h1 className={style["Twista-logo"]}>Twista</h1>
      </div>
    </nav>
  )
}

export default Navbar;
