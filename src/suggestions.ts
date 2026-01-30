export interface Suggestion {
  id: string;
  name: string;
}

export const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { id: '1', name: 'Suggestion 1' },
  { id: '2', name: 'Suggestion 2' },
  { id: '3', name: 'Suggestion 3' },
  { id: '4', name: 'Suggestion 4' },
  { id: '5', name: 'Suggestion 5' },
];

export const filterSuggestions = (
  inputText: string,
  suggestions: Suggestion[] = DEFAULT_SUGGESTIONS
): Suggestion[] => {
  if (inputText.length === 0) {
    return [];
  }
  return suggestions.filter((item) =>
    item.name.toLowerCase().includes(inputText.toLowerCase())
  );
};
