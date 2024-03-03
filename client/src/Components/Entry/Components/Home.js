import React from 'react'
import Navbar from './Navbar'
import twistaImg from "../../../Assets/tweet_search.png"
import {FiArrowRight} from "react-icons/fi"
import style from '../Entry.module.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={style["home-container"]}>
        <Navbar/>
        <div className={style["home-banner-container"]}>


          <div className={style["home-text-section"]}>
            <h1 className={style['primary-heading']}>Welcome to Twista</h1>
            <p className={style['primary-text']}>
              Build your tweet dataset effortlessly for analysis and insights.
            </p>
            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <button className={style['secondary-button']}>
                Get started <FiArrowRight/>
              </button>
            </Link>
          </div>

          <div className={['home-image-container']}>
            <img src={twistaImg}/>
          </div>

            


        </div>

    </div>
  )
}

export default Home