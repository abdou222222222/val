import FloatingHearts from "./FloatingHearts";
import pinkFlower from '../assets/page2/PinkFlower.png';
import s14Feb from '../assets/page2/14Feb.png';
import violetFlower from '../assets/page2/VilotFlower.png';
import blueFlower from '../assets/page2/blueFlower.png';
import yellowFlower from '../assets/page2/yellow flower.png';
import mixedFlowers from '../assets/page2/pink, red and purple flowers.png';

export const Decorations = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">


            <FloatingHearts count={800} />
            {/* Floating Images on the Left Side */}
            <img
                src={pinkFlower}
                alt=""
                className="absolute top-[50%] left-[12%] w-20 md:w-32 opacity-80 animate-float-subtle"
                style={{ animationDelay: '1s' }}

            />
            <img
                src={s14Feb}
                alt=""
                className="absolute top-[5%] left-[0%] w-24 md:w-56 opacity-80 animate-float-subtle"
            />

            <img
                src={yellowFlower}
                alt=""
                className="absolute top-[80%] left-[3%] w-16 md:w-24 opacity-75 animate-float-subtle"
                style={{ animationDelay: '2s' }}
            />


            {/* Floating Images on the Right Side */}
            <img
                src={blueFlower}
                alt=""
                className="absolute top-[15%] right-[2%] w-22 md:w-36 opacity-75 animate-float-subtle"
                style={{ animationDelay: '1.5s' }}
            />
            <img
                src={mixedFlowers}
                alt=""
                className="absolute top-[45%] right-[7%] w-26 md:w-34 opacity-70 animate-float-subtle-delayed"
                style={{ animationDelay: '0.8s' }}
            />
            <img
                src={pinkFlower}
                alt=""
                className="absolute top-[70%] right-[4%] w-18 md:w-26 opacity-80 animate-float-subtle"
                style={{ animationDelay: '2.3s' }}
            />
            <img
                src={violetFlower}
                alt=""
                className="absolute bottom-[10%] right-[8%] w-20 md:w-28 opacity-65 animate-float-subtle-delayed"
                style={{ animationDelay: '1.2s' }}
            />
        </div>
    );
};
