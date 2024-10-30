import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ImagePickerCarousel from "@/components/ImagePickerCarousel";
import ImagePickThumbnail from "@/components/ImagePickThumbnail";
import InputField from "@/components/InputField";
import NumberField from "@/components/NumberField";
import CurrencyField from "@/components/CurrencyField";
import MapScreen from "@/components/MapScreen";
import { Coordinates } from "@/types/Coordinates";
import { InitialRegion } from "@/constants/InitialRegion";
import Button from "@/components/Button";
import { createPost } from "@/api/Post";

export default function NewPost() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [reward, setReward] = useState<number>(0);
  const [location, setLocation] = useState<Coordinates>(InitialRegion);
  const [loading, setLoading] = useState<boolean>(false);

  const setImages = (images: string[]) => {
    setSelectedImages(images);
  };

  const removeImages = () => {
    setSelectedImages([]);
  };

  const submitPost = () => {
    setLoading(true);
    createPost({
      images: selectedImages,
      name,
      age,
      color,
      breed,
      description,
      reward,
      location,
    });
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView>
        <ScrollView>
          <ImagePickerCarousel
            selectedImages={selectedImages}
            setImages={setImages}
            removeImages={removeImages}
          />
          <View style={styles.form}>
            {selectedImages.length ? (
              <Text style={styles.label}>Escolha a foto de capa</Text>
            ) : null}
            <ImagePickThumbnail images={selectedImages} />
            <Text style={styles.label}>Dados do pet</Text>
            <View style={styles.inputBlock}>
              <InputField
                label="Nome"
                initValue={name}
                maxLength={10}
                onChange={(text) => setName(text)}
              />
              <View style={styles.inputRow}>
                <NumberField
                  label="Idade"
                  initValue={age}
                  min={0}
                  onChange={setAge}
                />
                <InputField
                  label="Cor"
                  initValue={color}
                  onChange={(text) => setColor(text)}
                />
              </View>
              <InputField
                label="Raça"
                initValue={breed}
                onChange={(text) => setBreed(text)}
              />
              <InputField
                label="Descrição"
                initValue={description}
                onChange={(text) => setDescription(text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Recompensa</Text>
              <Text style={styles.subLabel}>
                Caso não queira adicionar uma recompensa deixe o campo abaixo em
                branco
              </Text>
            </View>
            <CurrencyField
              placeholder="R$ 0,00"
              initValue={reward}
              onChange={(text) => setReward(text)}
            />
            <View>
              <Text style={styles.label}>Onde o perdeu?</Text>
              <Text style={styles.subLabel}>
                Escolha no mapa o local em que viu seu pet pela última vez
              </Text>
            </View>
            <View style={{ flex: 1, borderRadius: 8 }}>
              <MapScreen
                initialRegion={InitialRegion}
                onChange={(coords) => setLocation(coords)}
              />
            </View>
            <Button
              primary
              loading={loading}
              label="Salvar"
              onPress={submitPost}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    gap: 16,
    margin: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: "#565656",
  },
  subLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: "#aaaaaa",
  },
  inputBlock: {
    flex: 1,
    gap: 24,
  },
  inputRow: {
    flexDirection: "row",
    gap: 16,
  },
});
