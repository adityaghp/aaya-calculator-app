/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Animated, Easing, Dimensions, Image } from 'react-native';

export default function App() {
  const [lengthFeet, setLengthFeet] = useState<string>('');
  const [lengthInches, setLengthInches] = useState<string>('');
  const [breadthFeet, setBreadthFeet] = useState<string>('');
  const [breadthInches, setBreadthInches] = useState<string>('');
  const [areaInches, setAreaInches] = useState<number | null>(null);
  const [areaFeet, setAreaFeet] = useState<string | null>(null);
  const [aayaValue, setAayaValue] = useState<number | null>(null);
  const [dhanaValue, setDhanaValue] = useState<number | null>(null);
  const [runaValue, setRunaValue] = useState<number | null>(null);
  const [ayushValue, setAyushValue] = useState<number | null>(null);

  // Animation values
  const inputCardPosition = useRef(new Animated.Value(0)).current;
  const aayaCardOpacity = useRef(new Animated.Value(0)).current;
  const dhanaCardOpacity = useRef(new Animated.Value(0)).current;
  const runaCardOpacity = useRef(new Animated.Value(0)).current;
  const ayushCardOpacity = useRef(new Animated.Value(0)).current;

  // Reset animation values when component mounts
  useEffect(() => {
    inputCardPosition.setValue(0);
    aayaCardOpacity.setValue(0);
    dhanaCardOpacity.setValue(0);
    runaCardOpacity.setValue(0);
    ayushCardOpacity.setValue(0);
  }, []);

  // Check if all inputs are filled
  const isCalculateDisabled = !lengthFeet || !lengthInches || !breadthFeet || !breadthInches;

  const getAayaText = (value: number) => {
    switch (value) {
      case 0:
        return "Zero value (0)";
      case 3:
        return "Dwaja (3)";
      case 5:
        return "Vrushaba (5)";
      case 7:
        return "Gaja (7)";
      default:
        return value.toString();
    }
  };

  const formatAyushValue = (value: number) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(5);
  };

  const calculateArea = () => {
    const lengthIn = (parseInt(lengthFeet) * 12) + parseInt(lengthInches);
    const breadthIn = (parseInt(breadthFeet) * 12) + parseInt(breadthInches);
    const areaInSquareInches = lengthIn * breadthIn;
    const areaInSquareFeet = areaInSquareInches / 144;

    // Calculate Aaya value
    const dividedBy8 = areaInSquareInches / 8;
    const decimalPart = dividedBy8 - Math.floor(dividedBy8);
    const aayaResult = decimalPart * 8;

    // Calculate Dhana value
    const multipliedBy8 = areaInSquareInches * 8;
    const dividedBy12 = multipliedBy8 / 12;
    const decimalPartDhana = dividedBy12 - Math.floor(dividedBy12);
    const dhanaResult = decimalPartDhana * 12;

    // Calculate Runa value
    const multipliedBy3 = areaInSquareInches * 3;
    const dividedBy8Runa = multipliedBy3 / 8;
    const decimalPartRuna = dividedBy8Runa - Math.floor(dividedBy8Runa);
    const runaResult = decimalPartRuna * 8;

    // Calculate Ayush value
    const multipliedBy9 = areaInSquareInches * 9;
    const dividedBy120 = multipliedBy9 / 120;
    const decimalPartAyush = dividedBy120 - Math.floor(dividedBy120);
    const ayushResult = decimalPartAyush * 112;

    // Set values and start animation
    setAreaInches(areaInSquareInches);
    setAreaFeet(areaInSquareFeet.toFixed(2));
    setAayaValue(aayaResult);
    setDhanaValue(dhanaResult);
    setRunaValue(runaResult);
    setAyushValue(ayushResult);

    // Start animations
    animateResults();
  };

  const animateResults = () => {
    // First animate input card moving up
    Animated.timing(inputCardPosition, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      // After input card animation completes, start showing result cards
      const animateCard = (value: Animated.Value, delay: number) => {
        Animated.timing(value, {
          toValue: 1,
          duration: 300,
          delay: delay,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start();
      };

      // Start animations with delays
      animateCard(aayaCardOpacity, 100);
      animateCard(dhanaCardOpacity, 200);
      animateCard(runaCardOpacity, 300);
      animateCard(ayushCardOpacity, 400);
    });
  };

  const inputCardStyle = {
    transform: [{
      translateY: inputCardPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20]
      })
    }]
  };

  const resetCalculator = () => {
    // Reset all input values
    setLengthFeet('');
    setLengthInches('');
    setBreadthFeet('');
    setBreadthInches('');
    setAreaInches(null);
    setAreaFeet(null);
    setAayaValue(null);
    setDhanaValue(null);
    setRunaValue(null);
    setAyushValue(null);

    // Reset animation values
    inputCardPosition.setValue(0);
    aayaCardOpacity.setValue(0);
    dhanaCardOpacity.setValue(0);
    runaCardOpacity.setValue(0);
    ayushCardOpacity.setValue(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Sample Calculator</Text>
          <Text style={styles.headerSubtitle}>Xylem Constructions</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={resetCalculator}
            disabled={!aayaValue}
          >
            <Text style={[styles.resetButtonText, !aayaValue && styles.resetButtonDisabled]}>↻</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[
          styles.scrollContent,
          !aayaValue && styles.centeredContent
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.inputContainer, inputCardStyle]}>
          <View style={styles.card}>
            <Text style={styles.label}>Length:</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Feet"
                value={lengthFeet}
                onChangeText={setLengthFeet}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Inches"
                value={lengthInches}
                onChangeText={setLengthInches}
              />
            </View>

            <Text style={styles.label}>Breadth:</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Feet"
                value={breadthFeet}
                onChangeText={setBreadthFeet}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Inches"
                value={breadthInches}
                onChangeText={setBreadthInches}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, isCalculateDisabled && styles.buttonDisabled]} 
                onPress={calculateArea}
                disabled={isCalculateDisabled}
              >
                <Text style={[styles.buttonText, isCalculateDisabled && styles.buttonTextDisabled]}>
                  Calculate Aaya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {aayaValue !== null && (
          <Animated.View style={[styles.card, { opacity: aayaCardOpacity }]}>
            <Text style={styles.aayaTitle}>Aaya</Text>
            <Text style={styles.aayaValue}>{getAayaText(Math.round(aayaValue))}</Text>
          </Animated.View>
        )}

        {dhanaValue !== null && (
          <Animated.View style={[styles.card, { opacity: dhanaCardOpacity }]}>
            <Text style={styles.aayaTitle}>Dhana</Text>
            <Text style={styles.aayaValue}>{Math.round(dhanaValue)}</Text>
          </Animated.View>
        )}

        {runaValue !== null && (
          <Animated.View style={[styles.card, { opacity: runaCardOpacity }]}>
            <Text style={styles.aayaTitle}>Runa</Text>
            <Text style={styles.aayaValue}>{Math.round(runaValue)}</Text>
          </Animated.View>
        )}

        {ayushValue !== null && (
          <Animated.View style={[styles.card, { opacity: ayushCardOpacity }]}>
            <Text style={styles.aayaTitle}>Ayush</Text>
            <Text style={styles.aayaValue}>{formatAyushValue(ayushValue)}</Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007BFF',
  },
  header: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    width: 50,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  resetButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#E8E8E8',
  },
  aayaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  aayaValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007BFF',
    textAlign: 'center',
  },
});