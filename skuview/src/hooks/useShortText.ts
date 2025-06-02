export function useShortText(text: string,limit = 40) {
    if (!text) return '';
    
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
}