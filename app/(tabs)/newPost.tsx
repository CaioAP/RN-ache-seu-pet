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

export default function NewPost() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [petName, setPetName] = useState<string>("");
  const [petAge, setPetAge] = useState<number>(0);
  const [petColor, setPetColor] = useState<string>("");
  const [petBreed, setPetBreed] = useState<string>("");
  const [petDescription, setPetDescription] = useState<string>("");
  const [petReward, setPetReward] = useState<number>(0);
  const [petLocation, setPetLocation] = useState<Coordinates>(InitialRegion);

  const setImages = (images: string[]) => {
    setSelectedImages(images);
  };

  const removeImages = () => {
    setSelectedImages([]);
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
                initValue={petName}
                maxLength={10}
                onChange={(text) => setPetName(text)}
              />
              <View style={styles.inputRow}>
                <NumberField
                  label="Idade"
                  initValue={petAge}
                  min={0}
                  onChange={setPetAge}
                />
                <InputField
                  label="Cor"
                  initValue={petColor}
                  onChange={(text) => setPetColor(text)}
                />
              </View>
              <InputField
                label="Raça"
                initValue={petBreed}
                onChange={(text) => setPetBreed(text)}
              />
              <InputField
                label="Descrição"
                initValue={petDescription}
                onChange={(text) => setPetDescription(text)}
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
              initValue={petReward}
              onChange={(text) => setPetReward(text)}
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
                onChange={(coords) => setPetLocation(coords)}
              />
            </View>
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
