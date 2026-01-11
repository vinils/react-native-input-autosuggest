import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Suggestion {
  id: string;
  name: string;
}

const suggestions: Suggestion[] = [
  { id: '1', name: 'Suggestion 1' },
  { id: '2', name: 'Suggestion 2' },
  { id: '3', name: 'Suggestion 3' },
  { id: '4', name: 'Suggestion 4' },
  { id: '5', name: 'Suggestion 5' },
];

  export const InputAutoSugest: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);

  const handleSelect = (item: Suggestion) => {
    setInputText(item.name);
  };

  const renderItem = ({ item }: { item: Suggestion }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelect(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    var filtered: Suggestion[] = [];

    if (inputText.length > 0) {
      filtered = suggestions.filter(item =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      );
    }
    setFilteredSuggestions(filtered);
  }, [inputText, suggestions]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
      />
      {filteredSuggestions.length > 0 && (
        <FlatList
          data={filteredSuggestions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.suggestionsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1, // Ensure suggestions appear above other content
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  suggestionsList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    maxHeight: 200, // Limit height of the suggestion list
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default InputAutoSugest;