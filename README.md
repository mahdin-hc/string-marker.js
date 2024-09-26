# string-marker.js

I wrote this shit for parsing and highlighting specific patterns in text, such as user mentions and URLs. It transforms plain text into styled HTML elements, making it easy to create interactive content.

## Features

- Identifies user mentions (e.g., `@username`).
- Detects URLs (e.g., `https://example.com`).
- Generates HTML elements with appropriate styles.

## Quick Demo

Simply include the `string-marker.js` file in your HTML or JavaScript project:

```html
<script src="path/to/string-marker.js"></script>
```

## Usage

### Parsing a String

To parse a string and highlight patterns, use the `parseString` function:

```javascript
const text = "Hello @user! Check out this link: https://example.com.";
const parsedElement = parseString(text);
document.body.appendChild(parsedElement);
```

### Customizing Patterns

You can customize the patterns by modifying the `patterns` array in the library:

```javascript
const patterns = [
    new Pattern(/@[a-z0-9_-]+/g, 'transparent', 'mark-userurl'), // User URL
    new Pattern(/\b(https?|ftp):\/\/[^\s/$.?#].[^\s]*\b|www\.[^\s/$.?#].[^\s]*\b/g, 'transparent', 'mark-link')
];
```

### Styling

To style the highlighted patterns, add CSS for the class names used in the patterns:

```css
.mark-userurl {
    color: blue;
    font-weight: bold;
}

.mark-link {
    color: green;
    text-decoration: underline;
}
```
