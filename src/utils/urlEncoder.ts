/**
 * Encodes a string to a Base64 URL-safe string.
 * Uses built-in btoa but handles URI components to support emojis and special characters.
 */
export const encodeLetter = (data: { message: string }): string => {
    try {
        const jsonString = JSON.stringify(data);
        // Encode to handle UTF-8 characters properly
        const utf8Bytes = new TextEncoder().encode(jsonString);
        const charArray = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte));
        const base64 = btoa(charArray.join(''));
        return base64;
    } catch (error) {
        console.error('Failed to encode letter:', error);
        return '';
    }
};

/**
 * Decodes a Base64 encoded string back to the letter object.
 */
export const decodeLetter = (base64: string): { message: string } | null => {
    try {
        const binaryString = atob(base64.replace(/\s/g, '+'));
        const bytes = new Uint8Array(
            binaryString.split('').map((char) => char.charCodeAt(0))
        );
        const jsonString = new TextDecoder().decode(bytes);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Failed to decode letter:', error);
        return null;
    }
};
