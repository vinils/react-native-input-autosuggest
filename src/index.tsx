import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { filterSuggestions, type Suggestion, DEFAULT_SUGGESTIONS } from './suggestions';

export const handleSelectAction = (item: Suggestion, setInputText: (text: string) => void): void => {
  setInputText(item.name);
};

export const getSuggestionDisplayText = (item: Suggestion): string => {
  return item.name;
};

export const InputAutoSugest: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);

  const handleSelect = (item: Suggestion) => {
    handleSelectAction(item, setInputText);
  };

  const renderItem = ({ item }: { item: Suggestion }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelect(item)}>
      <Text>{getSuggestionDisplayText(item)}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const filtered = filterSuggestions(inputText, DEFAULT_SUGGESTIONS);
    setFilteredSuggestions(filtered);
  }, [inputText]);

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