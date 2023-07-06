import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { createItem } from "../utils/Api";
import CustomButton from "./CustomButton";

export default function AddDataForm(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    try {
      const data = {
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      };

      const response = await createItem(data);
      if (response) {
        props?.setItems([...props?.items, response.data]);
        setTitle("");
        setPrice("");
        setDescription("");
        setImage("");
        setCategory("");
        props?.setAddProducts(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Title:</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Price:</Text>
      <TextInput
        value={price}
        onChangeText={(text) => setPrice(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Description:</Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Image Url:</Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <Text>Category:</Text>
      <TextInput
        value={category}
        onChangeText={(text) => setCategory(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <CustomButton
        title="Tambah Data"
        onPress={handleSubmit}
        color="#0000FF"
      />
    </View>
  );
}
