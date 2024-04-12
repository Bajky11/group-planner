export function generateRandomNonWhiteHexColor() {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    // Generate a value between 0 to 200, as 255 would give us white shades
    const component = Math.floor(Math.random() * 201)
      .toString(16)
      .padStart(2, "0");
    color += component;
  }
  return color;
}
