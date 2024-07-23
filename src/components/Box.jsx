const Box = (props) => {

  const { num, onClick, value } = props;

  return (
    <div className={` border-yellow-200 ${num==0 ? 'border-b border-e' : (num==2 ? 'border-b border-s' : (num==6 ? 'border-t border-e' : (num==8 ? 'border-t border-s' : (num==1 ? 'border-b border-x' : (num==3?'border-y border-e':( num==4 ? 'border':(num==5 ? 'border-y border-s' : (num==7 && 'border-x border-t'))))))))} xo flex items-center justify-center text-center text-8xl w-[200px] h-[200px] cursor-pointer select-none`} onClick={onClick}>{value}</div>
  )
}

export default Box