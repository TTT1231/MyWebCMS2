/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,vue}"],
  theme: {
    screens:{
        "minx":"500px",
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
    },
    extend: {
      /**
       * linear：动画速度在整个过程中保持恒定。
         ease：默认缓动函数，动画开始和结束时较慢，中间较快。
         ease-in：动画开始时较慢，逐渐加速至结束。
         ease-out：动画开始时较快，逐渐减速至结束。
         cubic-bezier(x1, y1, x2, y2)：自定义缓动函数，可以根据具体需求调整曲线。
       */
      animation:{
        'enterx-faster': 'enterx 0.5s',
        'enterx-medspeed': 'enterx 0.8s',
        'enterx-autospeed': 'enterx 1s',
        '-enterx-faster': `-enterx 0.5s `,
        '-enterx-medspeed': '-enterx 0.8s ',
        '-enterx-autospeed': '-enterx 1s ',
      },
      keyframes:{
        enterx:{
          from:{
            transform: `translateX(50px)`,
            opacity: 0
         },
         to:{
            transform: `translateX(0px)`,
            opacity: 1,
         }
        },
        '-enterx':{
          from:{
            transform: `translateX(-50px)`,
            opacity: 0
         },
         to:{
            transform: `translateX(0px)`,
            opacity: 1,
         }
        }
      },
     
    },
  },
  plugins: [],
}

