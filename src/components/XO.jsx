import { motion } from "framer-motion";

export const X = ({scale}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`scale-[${scale}]`}><motion.path variants={svgVariants} initial="default" animate="show" d="M18 6 6 18"/><motion.path d="m6 6 12 12" variants={svgVariants} initial="default" animate="show"/></svg>;
};

export const O = ({scale}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`scale-[${scale}]`}><motion.circle variants={svgVariants} initial="default" animate="show" cx="12" cy="12" r="10"/></svg>;
};

const svgVariants = {
    default : {
        pathLength:0,
    },

    show : {
        pathLength:1
    }
}