function toCamelCase(input: string): string {
  return input
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string by spaces
    .map(
      (word, index) =>
        index === 0
          ? word // Keep the first word in lowercase
          : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the first letter of subsequent words
    )
    .join(""); // Join the words back together without spaces
}

export default toCamelCase;
