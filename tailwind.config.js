module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'tumble-3d': 'tumble3d 15s linear infinite',
        'flow-diag': 'flowDiag 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        tumble3d: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)' },
        },
        flowDiag: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-150vw, 150vh)' },
        },
      },
    },
  },
};