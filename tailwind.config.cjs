const gridLines = Object.fromEntries(Array.from({ length: 24 }, (_, index) => [index + 2, String(index + 2)]))

module.exports = {
  "content": [
    "./index.html",
    "./blogs/*/index.html",
    "./js/*.js"
  ],
  "darkMode": "class",
  "theme": {
    "extend": {
      "fontFamily": {
        "sans": [
          "var(--blog-sans, Poppins)",
          "sans-serif"
        ],
        "heading": [
          "Inter",
          "sans-serif"
        ]
      },
      "colors": {
        "theme-text": "#e5e7eb",
        "theme-text-sec": "#9ca3af",
        "theme-bg": "#000000",
        "theme-fg": "#edecec",
        "theme-card": "#161618",
        "theme-card-hover": "#1c1c1e",
        "theme-accent": "#f54e00",
        "theme-border-01": "#edecec06",
        "bn-soft": "#FAF9EE",
        "bn-green": "#1A1A1a",
        "bn-white": "#EEEEEE",
        "bn-black": "#010101",
        "bn-dark": "#1A1A1A",
        "forge": {
          "50": "#fff7ed",
          "100": "#ffedd5",
          "200": "#fed7aa",
          "300": "#fdba74",
          "400": "#fb923c",
          "500": "#f97316",
          "600": "#ea580c",
          "700": "#c2410c",
          "800": "#9a3412",
          "900": "#7c2d12"
        }
      },
      "spacing": {
        "v1": "1.4rem",
        "v1/12": "0.116rem",
        "v3": "4.2rem",
        "v4": "5.6rem",
        "g1": "0.625rem"
      },
      "borderRadius": {
        "xs": "4px"
      },
      "fontSize": {
        "type-xl-inspo": "3.25rem"
      },
      "gridTemplateColumns": {
        "24": "repeat(24, minmax(0, 1fr))"
      },
      "gridColumnStart": gridLines,
      "gridColumnEnd": gridLines
    }
  }
}
