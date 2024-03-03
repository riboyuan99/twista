import React from 'react'
import twistaImg from "../../../Assets/tweet_search.png"
import style from "../Entry.module.css"

const Footer = () => {
  return (
    <div className={style['footer-wrapper']}>
        <div className={style["footer-section-columns"]}>
          <span>302-407-9827</span>
          <span>yuanribo@gmail.com</span>
        </div>
        <div className={style["footer-section-columns"]}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
    </div>
  )
}

export default Footer