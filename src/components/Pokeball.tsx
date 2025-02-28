  
const Pokeball = () => {
    return (
      <div className="relative w-[50px] h-[50px] rounded-full border-[2px] border-black bg-gradient-to-b from-gray-300 to-white animate-bounce">
       
        <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-red-700 to-red-500 border-b-[2px] border-black rounded-t-full"></div>
  
  
        <div className="absolute top-1/2 left-1/2 w-[10px] h-[10px] bg-gradient-to-b from-white to-gray-400 rounded-full border-[1px] border-black shadow-[0_0_0_1px_black,0_0_0_2px_gray-300,0_0_0_3.5px_black,0_0_5px_2.5px_rgba(0,0,0,0.4)] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    );
  };
  
  export default Pokeball;
  