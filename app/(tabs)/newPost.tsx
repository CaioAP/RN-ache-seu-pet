import { useEffect, useState } from "react";
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
import { Post } from "@/types/Post";
import { Theme } from "@/constants/Theme";

interface FormErrors {
  images: string;
  name: string;
  color: string;
  breed: string;
  description: string;
}

interface FormTouched {
  images: boolean;
  name: boolean;
  color: boolean;
  breed: boolean;
  description: boolean;
}

const initialFormData: Post = {
  id: null,
  images: [],
  thumbnailImage: "",
  name: "",
  age: 0,
  color: "",
  breed: "",
  description: "",
  reward: 0,
  location: { ...InitialRegion },
};

const initialErrors: FormErrors = {
  images: "",
  name: "",
  color: "",
  breed: "",
  description: "",
};

const initialTouched: FormTouched = {
  images: false,
  name: false,
  color: false,
  breed: false,
  description: false,
};

export default function NewPost() {
  const [formData, setFormData] = useState<Post>({ ...initialFormData });
  const [touched, setTouched] = useState<FormTouched>({ ...initialTouched });
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageSelect = (newImages: string[]) => {
    handleInputChange("images", newImages);
    handleInputTouched("images");
  };

  const handleImageRemove = () => {
    handleInputChange("images", []);
  };

  const handleInputChange = (
    field: string,
    value: number | string | string[] | Coordinates
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputTouched = (field: keyof FormTouched) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    const newErrors: FormErrors = { ...initialErrors };
    if (touched.images && !formData.images.length) {
      newErrors.images = "Insira ao menos uma imagem";
    }
    if (touched.name && !formData.name) {
      newErrors.name = "Nome é obrigatório";
    }
    if (touched.color && !formData.color) {
      newErrors.color = "Cor é obrigatório";
    }
    if (touched.breed && !formData.breed) {
      newErrors.breed = "Raça é obrigatório";
    }
    if (touched.description && !formData.description) {
      newErrors.description = "Descrição é obrigatório";
    }
    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((err) => !err));
  };

  const handleSubmit = () => {
    setTouched({
      images: true,
      name: true,
      color: true,
      breed: true,
      description: true,
    });
    if (isFormValid) {
      setLoading(true);
      createPost(formData);
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const handleClear = () => {
    setFormData({ ...initialFormData });
    setTouched({ ...initialTouched });
    setErrors({ ...initialErrors });
  };

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <ImagePickerCarousel
              selectedImages={formData.images}
              onChange={handleImageSelect}
              onRemove={handleImageRemove}
            />
            {touched.images && errors.images ? (
              <Text style={styles.errorMessage}>{errors.images}</Text>
            ) : null}
          </View>
          <View style={styles.form}>
            {formData.images.length ? (
              <Text style={styles.label}>Escolha a foto de capa</Text>
            ) : null}
            <ImagePickThumbnail
              images={formData.images}
              onChange={(image) => handleInputChange("thumbnailImage", image)}
            />
            <Text style={styles.label}>Dados do pet</Text>
            <View style={styles.inputBlock}>
              <InputField
                label="Nome"
                value={formData.name}
                maxLength={30}
                error={!!errors.name}
                errorMessage={errors.name}
                required
                onChange={(name) => handleInputChange("name", name)}
                onBlur={() => handleInputTouched("name")}
              />
              <View style={styles.inputRow}>
                <NumberField
                  label="Idade"
                  value={formData.age || 0}
                  min={0}
                  onChange={(age) => handleInputChange("age", age)}
                />
                <InputField
                  label="Cor"
                  value={formData.color}
                  maxLength={30}
                  error={!!errors.color}
                  errorMessage={errors.color}
                  required
                  onChange={(color) => handleInputChange("color", color)}
                  onBlur={() => handleInputTouched("color")}
                />
              </View>
              <InputField
                label="Raça"
                value={formData.breed}
                maxLength={30}
                error={!!errors.breed}
                errorMessage={errors.breed}
                required
                onChange={(breed) => handleInputChange("breed", breed)}
                onBlur={() => handleInputTouched("breed")}
              />
              <InputField
                label="Descrição"
                value={formData.description}
                multiline
                maxLength={250}
                error={!!errors.description}
                errorMessage={errors.description}
                required
                onChange={(description) =>
                  handleInputChange("description", description)
                }
                onBlur={() => handleInputTouched("description")}
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
              value={formData.reward || 0}
              onChange={(reward) => handleInputChange("reward", reward)}
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
                onChange={(location) => handleInputChange("location", location)}
              />
            </View>
            <Button
              label="Salvar"
              loading={loading}
              primary
              onPress={handleSubmit}
            />
            <Button label="Limpar" onPress={handleClear} />
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
    gap: 4,
  },
  inputRow: {
    flexDirection: "row",
    gap: 16,
  },
  errorMessage: {
    marginTop: 2,
    marginLeft: 16,
    fontSize: 12,
    lineHeight: 16,
    color: Theme.colors.error,
  },
});
