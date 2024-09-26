class Pattern {
    constructor(regex, className) {
        this.regex = regex;
        this.className = className;
    }
}

const patterns = [
    new Pattern(/@[a-z0-9_-]+/g, 'mark-userurl'), // User URL
    new Pattern(/\b(https?|ftp):\/\/[^\s/$.?#].[^\s]*\b|www\.[^\s/$.?#].[^\s]*\b|^(localhost|127\.0\.0\.1|::1)(:\d+)?(\/[^\s]*)?\b/g, 'mark-link')
];

function parseString(text) {
    const main = document.createElement('div');
    main.classList.add('mark-container');
    const parsedArray = getParsedArray(text || '');

    parsedArray.forEach(({ className, data }) => {
        let element;

        if (className === patterns[0].className) {
            element = document.createElement('span');
            element.className = className;
            element.innerText = data.slice(1); // Remove '@'
        } else if (className === patterns[1].className) {
            element = document.createElement('a');
            element.className = className;
            element.href = data;
            element.target = '_blank';
            element.innerText = data;
        } else {
            element = document.createElement('span');
            element.innerText = data;
        }

        main.appendChild(element);
    });

    return main;
}

function getParsedArray(text) {
    const ranges = getPatternRanges(text);
    const result = [];

    if (ranges.length > 0) {
        let lastIndex = 0;

        ranges.forEach(({ start, end, className }) => {
            if (lastIndex < start) {
                result.push({ data: text.slice(lastIndex, start), className: '' });
            }
            result.push({ data: text.slice(start, end), className });
            lastIndex = end;
        });

        if (lastIndex < text.length) {
            result.push({ data: text.slice(lastIndex), className: '' });
        }
    } else {
        result.push({ data: text, className: '' });
    }

    return result;
}

function getPatternRanges(text) {
    const ranges = [];

    patterns.forEach(pattern => {
        let match;
        while ((match = pattern.regex.exec(text)) !== null) {
            ranges.push({
                start: match.index,
                end: match.index + match[0].length,
                className: pattern.className
            });
        }
    });

    return mergeRanges(ranges);
}

function mergeRanges(ranges) {
    ranges.sort((a, b) => a.start - b.start);
    const merged = [];

    for (let i = 0; i < ranges.length; i++) {
        const current = ranges[i];

        if (merged.length === 0 || merged[merged.length - 1].end < current.start) {
            merged.push(current);
        } else {
            // Merge overlapping ranges
            merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, current.end);
        }
    }

    return merged;
}
