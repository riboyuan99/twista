import React from 'react'
import twistaImg from "../../../Assets/tweet_search.png"
import style from "../Entry.module.css"

const Functions = () => {
    const functions = [
        {
            image: twistaImg,
            title: "Search",
            text: "Search tweets based on keyword"
        },
        {
            image: twistaImg,
            title: "Filter",
            text: "Filter tweets based on your need"
        },
        {
            image: twistaImg,
            title: "Save",
            text: "Generate your own dataset"
        }
    ]
  return (
    <div className={style['work-section-wrapper']}>
        <div className={style['work-section-top']}>
            <h2 className={style['primary-heading']}>Functions</h2>
            <p className={style['primary-text']}>There are many things you can do with Twista</p>
        </div>

        <div className={style['work-section-bottom']}>
            {
                functions.map((f) => (
                    <div className={style['work-section-info']}>
                        <div className={style['info-boxes-img-container']}>
                            <img src={f.image}/>
                        </div>
                        <h2>{f.title}</h2>
                        <p>{f.text}</p>

                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default Functions