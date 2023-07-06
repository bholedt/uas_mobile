import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import CustomButton from "./components/CustomButton";
import { getItems, deleteItem } from "./utils/Api";
import AddDataForm from "./components/AddDataForm";
import EditDataForm from "./components/EditdataForm";

const App = () => {
  const [items, setItems] = useState([]);
  const [addProducts, setAddProducts] = useState(false);
  const [editProducts, setEditProducts] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      {addProducts && !editProducts && (
        <View style={styles.main}>
          <AddDataForm
            setItems={setItems}
            items={items}
            setAddProducts={setAddProducts}
          />
        </View>
      )}
      {editProducts && !addProducts && (
        <View style={styles.main}>
          <EditDataForm
            setItems={setItems}
            items={items}
            setEditProducts={setEditProducts}
            id={id}
          />
        </View>
      )}
      {!addProducts && !editProducts && (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.header}>Products List</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.text}>{item.title}</Text>
              <Image source={{ uri: item?.image }} style={styles.image} />
              <Text style={styles.price}>${item.price}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Description: </Text>
              <Text>{item.description}</Text>
              <View style={styles.buttonGroup}>
                <CustomButton
                  title="Delete"
                  onPress={() => handleDeleteItem(item.id)}
                  color="#FF0000"
                />
                <CustomButton
                  title="Edit"
                  onPress={() => {
                    setEditProducts(true);
                    setId(item.id);
                  }}
                  color="#4CAF50"
                />
              </View>
            </View>
          ))}
          <CustomButton
            title="Add Item"
            onPress={() => setAddProducts(true)}
            color="#0000FF"
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = {
  main: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // menambahkan padding di bawah agar konten tidak terpotong
  },
  card: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  text: {
    marginBottom: 10,
    alignSelf: "center",
  },
  price: {
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 30,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
};
export default App;
