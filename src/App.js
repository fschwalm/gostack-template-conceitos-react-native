import React, { useState, useEffect } from "react";

import { SafeAreaView, FlatList, StatusBar, StyleSheet } from "react-native";
import api from "./services/api";
import Repository from "./Repository";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get("/repositories");

        setRepositories(response.data);
      } catch (error) {
        throw error;
      }
    }
    loadRepositories();
  }, []);

  async function handleLikeRepository(id) {
    try {
      const response = await api.post(`/repositories/${id}/like`);
      setRepositories((prevRepositories) =>
        prevRepositories.map((repository) => {
          if (repository.id !== id) {
            return repository;
          }
          return {
            ...repository,
            ...response.data,
          };
        })
      );
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          renderItem={({ item }) => (
            <Repository {...item} onLikeRepository={handleLikeRepository} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
});
