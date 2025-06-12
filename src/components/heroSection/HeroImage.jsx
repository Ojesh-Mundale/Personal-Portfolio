import { PiHexagonThin } from "react-icons/pi";
console.log("IMAGE TEST", new Image().src = "/images/me.png");

const HeroImage = () => {
  return (
    <div className="relative min-h-[400px] w-full flex items-center justify-center bg-black">
      <div className="relative w-full h-full">
        <img
          src="/images/me.png"
          alt="Ojesh Mundale"
          className="w-auto h-auto md:max-w-[570px] sm:max-w-[380px] absolute bottom-0 left-1/2 -translate-x-1/2 z-50 border-4 border-red-500"
        />

        {/* Hexagon backgrounds */}
        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center rotate-90">
          <PiHexagonThin className="md:h-[90%] sm:h-[120%] min-h-[600px] w-auto text-orange opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center rotate-90">
          <PiHexagonThin className="md:h-[90%] sm:h-[120%] blur-lg min-h-[600px] w-auto text-orange opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center">
          <PiHexagonThin className="md:h-[90%] sm:h-[120%] min-h-[600px] w-auto text-cyan opacity-70 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className="w-full h-full absolute bottom-[-20%] -z-10 flex justify-center items-center">
          <PiHexagonThin className="md:h-[90%] sm:h-[120%] min-h-[600px] w-auto text-cyan opacity-70 blur-lg animate-[spin_20s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
