export function textCutter(text, length) {
    if (text.length > length) {
        // Cut the text to the specified length
        text = text.substring(0, length);
        // Trim any trailing spaces
        text = text.trim();
        // Add ellipsis
        text += "...";
    }
    text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    return text;
}
