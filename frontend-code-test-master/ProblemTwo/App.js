import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
// import { CalculateFunctionality } from './function/CalculatorFunction';

export default function App() {

  const [result, setResult] = useState(0);
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [equalPressed, setEqualPressed] = useState(false);

  const calculate = useCallback((input) => {
    equalPressed === true && operation === null ?
      (setResult(input), setEqualPressed(false)) :
    result === 0 && operation === null ? 
      setResult(input) : 
    result !== 0 && operation === null ? 
      setResult(result => (`${result}${input}`)) : 
    result !== 0 && operation !== null && firstNumber === null ? 
      (setFirstNumber(result), setResult(input)) :
    result !== 0 && operation !== null && firstNumber !== null ?
      setResult(result => (`${result}${input}`)) : 
      null
    });

    console.log('result', result, 'operation', operation, 'firstNum', firstNumber, 'equalpress?', equalPressed)

  const operate = useCallback((input) => {
    setOperation(input)
  })

  const solve = useCallback(() => {
    if (firstNumber !== null) {
      switch (operation) {
        case '+':
          let answerPlus = (parseFloat(firstNumber) + parseFloat(result));
          setResult(answerPlus); setFirstNumber(null); setOperation(null); setEqualPressed(true)
          break;
        case '-':
          let answerSubtract = (parseFloat(firstNumber) - parseFloat(result));
          setResult(answerSubtract); setFirstNumber(null); setOperation(null); setEqualPressed(true)
          break;
        case 'x':
          let answerMult = (parseFloat(firstNumber) * parseFloat(result));
          setResult(answerMult); setFirstNumber(null); setOperation(null); setEqualPressed(true)
          break;
        case '/':
          let answerDiv = (parseFloat(firstNumber) / parseFloat(result));
          setResult(answerDiv); setFirstNumber(null); setOperation(null); setEqualPressed(true)
          break;
      }
    }
  });


  const reset = useCallback(() => {
    setResult(0); setFirstNumber(null); setOperation(null); setEqualPressed(false)
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{result}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button calculate={reset} size={1} text={'AC'} theme={'gray'} />
          <Button calculate={calculate} size={1} text={'+/-'} theme={'gray'}/>
          <Button calculate={calculate} size={1} text={'%'} theme={'gray'}/>
          <Button calculate={operate} size={1} text={'/'} theme={'orange'}/>
          <Button calculate={calculate} size={1} text={7} theme={'lightgray'}/>
          <Button calculate={calculate} size={1} text={8} theme={'lightgray'}/>
          <Button calculate={calculate} size={1} text={9} theme={'lightgray'}/>
          <Button calculate={operate} size={1} text={'x'} theme={'orange'}/>
          <Button calculate={calculate} size={1} text={4} theme={'lightgray'}/> 
          <Button calculate={calculate} size={1} text={5} theme={'lightgray'}/>
          <Button calculate={calculate} size={1} text={6} theme={'lightgray'}/>
          <Button calculate={operate} size={1} text={'-'} theme={'orange'}/>
          <Button calculate={calculate} size={1} text={1} theme={'lightgray'}/>
          <Button calculate={calculate} size={1} text={2} theme={'lightgray'}/>
          <Button calculate={calculate} size={1} text={3} theme={'lightgray'}/>
          <Button calculate={operate} size={1} text={'+'} theme={'orange'}/>
          <Button calculate={calculate} size={2} text={0} theme={'lightgray'}/>
          <Button calculate={calculate} size={1} text={'.'} theme={'lightgray'}/>
          <Button calculate={solve} size={1} text={'='} theme={'orange'}/>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "center",
    alignItems: "center"
  },
  valueContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 71
  },
  value: {
    color: 'white',
    fontSize: 100,

    
  },
  buttonContainer: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  }
});
