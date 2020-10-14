module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true,
    },
    purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {}
    },
    variants: {
        cursor: ['responsive', 'hover', 'focus'],
    },
    plugins: []
}