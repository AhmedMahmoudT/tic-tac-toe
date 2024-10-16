import { motion } from "framer-motion";

export const HorizontalLine = ({margin}) => {
  return <motion.div initial={{width:0}} animate={{width:550}} className={`absolute ${margin} left-[25px] bg-ylw  h-2 rounded-full`}></motion.div>;
};

export const VerticalLine = ({margin}) => {
  return <motion.div initial={{height:0}} animate={{height:550}} className={`absolute top-[25px] bg-ylw ${margin} w-2 rounded-full`}></motion.div>;
};

export const RotatedLine = ({from}) => {
    return <motion.div initial={{height:0}} animate={{height:600}} className={`absolute top-0 ${from=='left'?'right-[296px] rotate-45':'left-[296px] -rotate-45'} bg-ylw w-2 rounded-full`}></motion.div>;
  };

// export const DrawLine = () => {
//     return <motion.svg className={'absolute top-[96px] right-[96px]'} initial={{pathLength:0}} animate={{pathLength:1}} width="408" height="408" viewBox="0 0 408 408" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M4 4H204C270.667 4 404 44 404 204C404 364 270.667 404 204 404H4" stroke="#FEF08A" strokeWidth="8" strokeLinecap="round"/>
//     </motion.svg>
  
// }