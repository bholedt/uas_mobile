import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { updateItem, getItem } from "../utils/Api";
import CustomButton from "./CustomButton";

export default function EditDataForm(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [editedProducts, setEditedProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getItem(props?.id);
        if (response) setEditedProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [props.id]);

  useEffect(() => {
    console.log(editedProducts);
    setTitle(editedProducts?.title);
    setPrice(editedProducts?.price);
    setDescription(editedProducts?.description);
    setImage(editedProducts?.image);
    setCategory(editedProducts?.category);
  }, [editedProducts]);

  const handleSubmit = async () => {
    try {
      const data = {
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      };
      const response = await updateItem(props?.id, data);
      if (response) {
        const productIndex = props?.items.findIndex(
          (item) => item.id === props?.id
        );
        if (productIndex !== -1) {
          const updatedProducts = [...props?.items];
          updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            ...response.data,
          };
          props?.setItems(updatedProducts);
        }
        setTitle("");
        setPrice("");
        setDescription("");
        setImage("");
        setCategory("");
        props?.setEditProducts(false);
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
        value={price?.toString()}
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
        title="Update Data"
        onPress={handleSubmit}
        color="#4CAF50"
      />
    </View>
  );
}
