import React, { useEffect, useState } from 'react'
import {BsPersonPlusFill} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import logo from "../assets/cast.png"
import { useShoppingCart } from '../Context/CartContext'
import CastCart from './CastCart'
import Modal from './Modal'


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const {openCart,state} = useShoppingCart()
  const [isOpen , setOpen]=useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <React.Fragment>
        <div className=' absolute left-0 top-[100px] md:left-[60px] md:top-[110px] '>
   
    </div>
      <nav className={` w-full fixed  top-0  ${scrolled ? ` bg-white`:` bg-transparent`}   z-20 flex  justify-between  sm:gap-[100px] items-center py-2 px-6 sm:px-8`}>
      <div className=' flex items-center gap-1 '>
      <img src={logo} alt="enrgy casting log" className=' w-[60px] h-[60px]  object-cover'/>
      <h1 className=''><span className=' font-bold'>Energy</span> Casting</h1>
      </div>
     <button className=' block sm:hidden'>
      <GiHamburgerMenu className='w-12 h-12 text-gray-800'/>
     </button>
  
     <ul className=' sm:flex justify-center items-center gap-x-4 hidden '>
       <li>
        <NavLink to='/' className='text-black text-[14px]'>Home</NavLink>
       </li>
       <li>
        <NavLink to='/about' className='text-black text-[14px]'>About</NavLink>
       </li>
       <li>
       <NavLink to='/login' className='text-black text-[14px]'>Login</NavLink>
       </li>
       <li className={` border-dotted  border-[4px] p-2 border-[#ED7D31]  `}>
        <NavLink to='/how' className='text-black text-[14px]'>How it works</NavLink>
       </li>
        
     </ul>
      <button 
      onClick={()=>{setOpen(true)}}
      className={`p-3 h-16 sm:w-16 rounded-full border-[4px]  border-[#ED7D31]  flex justify-center items-center`}>
      <BsPersonPlusFill className=' text-gray-900 ' size={28}/>
      <p className={` text-gray-900 relative top-[-4px] left-0 ${state.length>0 ? `bg-red-600 p-1 rounded-full`:``} `} >{state.cart.length}</p>
       </button>
      <CastCart isOpen={isOpen}/>
  </nav>
  <Modal
   isOpen={isOpen}
   onClose={()=>{setOpen(false)}}
   className={` absolute top-0 right-0  w-[40%]  translate-x-[-0%] translate-y-[-0%]  `}
  >
    <section className='mt-6'>
      <h3 className=' text-black font-semibold'>You have Selected {state.cart.length} Cast's </h3>
      <p className='text-[12px] text-gray-400'>file your name and Phone Number  to book</p>
    <div className='grid grid-cols-1   gap-3'>
     
     {
       state.cart.map((cart,i)=>{
         return(
         
           <div className='flex  bg-[#E6EEFB]'>
             <div className=' w-[80px] h-[80px]  p-2'>
               <img src={cart.img}  alt='sgs' className=' rounded-full object-cover w-full h-full'/>
             </div>
             <div>asrat</div>
             <button className='text-red-600 ml-auto'>delete</button>
     
           </div>
           
         )
       })
     }
     </div>
     <form className='mt-6'>
     <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                your or company Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  placeholder='yafet film production'
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
     <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                phone number
              </label>
              <div className="mt-1">
                <input
                  type="phone"
                  name="phone"
                  placeholder=' ex:091656****'
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <button
                type="submit"
                className="group relative w-full mt-6 h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ED7D31] hover:bg-orange-800"
              >
                Book !
              </button>
     </form>
    </section>

  </Modal>
    </React.Fragment>
 
  )
}

export default Navbar