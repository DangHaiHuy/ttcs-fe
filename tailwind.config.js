export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0284c7',
                "slate-250": 'rgb(195 208 222)',
            },
            backgroundImage: {
                main: "url('/src/assets/Images/aug_8_01.jpg')",
            },
            animation: {
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
        },
    },
    plugins: [],
};
