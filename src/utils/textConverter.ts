// humanize
export const humanize = (content: string) => {
    return content
        .replace(/^[\s_]+|[\s_]+$/g, "")
        .replace(/[_\s]+/g, " ")
        .replace(/[-\s]+/g, " ")
        .replace(/^[a-z]/, function (m) {
            return m.toUpperCase();
        });
};

// titleify
export const titleify = (content: string) => {
    const humanized = humanize(content);
    return humanized
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
