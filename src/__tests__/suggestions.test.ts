import { filterSuggestions, DEFAULT_SUGGESTIONS, type Suggestion } from '../suggestions';

describe('filterSuggestions utility function', () => {
  describe('with default suggestions', () => {
    it('should return empty array when input is empty', () => {
      const result = filterSuggestions('');
      expect(result).toEqual([]);
    });

    it('should return all matching suggestions for "Suggestion"', () => {
      const result = filterSuggestions('Suggestion');
      expect(result.length).toBe(5);
      expect(result).toEqual(DEFAULT_SUGGESTIONS);
    });

    it('should return filtered suggestion for "Suggestion 1"', () => {
      const result = filterSuggestions('Suggestion 1');
      expect(result.length).toBe(1);
      expect(result[0]?.name).toBe('Suggestion 1');
      expect(result[0]?.id).toBe('1');
    });

    it('should return filtered suggestion for "Suggestion 2"', () => {
      const result = filterSuggestions('Suggestion 2');
      expect(result.length).toBe(1);
      expect(result[0]?.name).toBe('Suggestion 2');
      expect(result[0]?.id).toBe('2');
    });

    it('should return filtered suggestions for "suggestion" (lowercase)', () => {
      const result = filterSuggestions('suggestion');
      expect(result.length).toBe(5);
    });

    it('should return filtered suggestions for "SUGGESTION" (uppercase)', () => {
      const result = filterSuggestions('SUGGESTION');
      expect(result.length).toBe(5);
    });

    it('should return filtered suggestion for "3"', () => {
      const result = filterSuggestions('3');
      expect(result.length).toBe(1);
      expect(result[0]?.name).toBe('Suggestion 3');
    });

    it('should return empty array for non-matching input', () => {
      const result = filterSuggestions('NonExistent');
      expect(result.length).toBe(0);
    });

    it('should filter suggestions starting with "Suggestion 1"', () => {
      const result = filterSuggestions('Suggestion 1');
      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('1');
    });

    it('should filter suggestions starting with "Suggestion 4"', () => {
      const result = filterSuggestions('Suggestion 4');
      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('4');
    });

    it('should filter suggestions starting with "Suggestion 5"', () => {
      const result = filterSuggestions('Suggestion 5');
      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('5');
    });
  });

  describe('with custom suggestions', () => {
    const customSuggestions: Suggestion[] = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Cherry' },
    ];

    it('should return empty array when input is empty', () => {
      const result = filterSuggestions('', customSuggestions);
      expect(result).toEqual([]);
    });

    it('should return all suggestions matching "a"', () => {
      const result = filterSuggestions('a', customSuggestions);
      expect(result).toHaveLength(2);
      expect(result.map((s) => s.name)).toEqual(['Apple', 'Banana']);
    });

    it('should return matching suggestion for "Apple"', () => {
      const result = filterSuggestions('Apple', customSuggestions);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Apple');
    });

    it('should return matching suggestion for "Banana"', () => {
      const result = filterSuggestions('Banana', customSuggestions);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Banana');
    });

    it('should return matching suggestion for "Cherry"', () => {
      const result = filterSuggestions('Cherry', customSuggestions);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Cherry');
    });

    it('should handle case-insensitive search for "apple"', () => {
      const result = filterSuggestions('apple', customSuggestions);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Apple');
    });

    it('should handle case-insensitive search for "BANANA"', () => {
      const result = filterSuggestions('BANANA', customSuggestions);
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Banana');
    });

    it('should return empty array for non-matching input', () => {
      const result = filterSuggestions('Grape', customSuggestions);
      expect(result).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should work with single character input', () => {
      const result = filterSuggestions('1');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle partial matches', () => {
      const result = filterSuggestions('estion');
      expect(result.length).toBe(5);
    });

    it('should return array (not other types)', () => {
      const result = filterSuggestions('test');
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return filtered array with Suggestion interface', () => {
      const result = filterSuggestions('1');
      result.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(typeof item.id).toBe('string');
        expect(typeof item.name).toBe('string');
      });
    });

    it('should return array of same type as input', () => {
      const customSuggestions: Suggestion[] = [
        { id: 'test', name: 'Test Item' },
      ];
      const result = filterSuggestions('Test', customSuggestions);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
    });
  });

  describe('DEFAULT_SUGGESTIONS constant', () => {
    it('should have 5 default suggestions', () => {
      expect(DEFAULT_SUGGESTIONS).toHaveLength(5);
    });

    it('should have valid Suggestion structure', () => {
      DEFAULT_SUGGESTIONS.forEach((suggestion) => {
        expect(suggestion).toHaveProperty('id');
        expect(suggestion).toHaveProperty('name');
        expect(typeof suggestion.id).toBe('string');
        expect(typeof suggestion.name).toBe('string');
      });
    });

    it('should have unique IDs', () => {
      const ids = DEFAULT_SUGGESTIONS.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique names', () => {
      const names = DEFAULT_SUGGESTIONS.map((s) => s.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should contain expected suggestion names', () => {
      const names = DEFAULT_SUGGESTIONS.map((s) => s.name);
      expect(names).toContain('Suggestion 1');
      expect(names).toContain('Suggestion 2');
      expect(names).toContain('Suggestion 3');
      expect(names).toContain('Suggestion 4');
      expect(names).toContain('Suggestion 5');
    });
  });
});
