import styles from "./convertor.module.css"
import React, { useRef, useState } from "react"

export const Convertor = () => {
  
  const rgbRef = useRef<HTMLInputElement>(null)
  const [rgbValue, setRGBValue] = useState<string>("Тут будет rgb") 
  const [backgroundColor, setBackgroundColor] = useState<string>("")
      
  const onchangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{    
    let userColor = e.target.value 
    let reg = new RegExp(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
    let letters = userColor.match(reg);
    
    if(userColor.length === 7 && letters) {
      let RGBArray = [];
      let pairsLetter = [letters[1], letters[2], letters[3]]
      
      for(const pair of pairsLetter){
        let rgbNum = parseInt(pair, 16)
        RGBArray.push(rgbNum)
        }

        let RGB = `rgb(${RGBArray.join(", ")})`;
        
        setRGBValue(RGB)
        setBackgroundColor(RGB)
        return RGB
      } else if(userColor.length >= 7 && !letters){
        setBackgroundColor("red")
        setRGBValue('Ошибка!')
      } else {
        setBackgroundColor("")
        setRGBValue('Тут будет rgb')
      }
    }
    
  return (
    <div className={styles["form-container"]} style={{backgroundColor}}>
      <form className={styles["form-convertor"]}>
        <input className = {styles["input-color-hex"]} type="text" onChange={onchangeHandler} placeholder="Цвет в формате HEX"></input>
        <input className = {styles["color-rgb"]} ref={rgbRef} value={rgbValue} readOnly></input>
      </form>
    </div>
)
    }
