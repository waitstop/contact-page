import './navbar.css'
import {InstagramAsciiIcon, TelegramAsciiIcon, VkAsciiIcon} from "./Icons";


const Navbar = () => {
  return(
      <div className={"navbar"}>
        <a target={"_blank"} rel={"noreferrer"} href="https://t.me/wait_stop">
            <TelegramAsciiIcon/>
        </a>
        <a target={"_blank"} rel={"noreferrer"} href="https://www.instagram.com/emtyxd/">
            <InstagramAsciiIcon/>
        </a>
        <a target={"_blank"} rel={"noreferrer"} href="https://vk.com/3waitstop">
            <VkAsciiIcon/>
        </a>
      </div>
  )
}


export default Navbar