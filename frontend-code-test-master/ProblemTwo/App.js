import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './components/Button';
// import { CalculateFunctionality } from './function/CalculatorFunction';

export default function App() {

  const [result, setResult] = useState(0);
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [equalPressed, setEqualPressed] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    let resultStr = result.toString();
    setLength(resultStr.length);
  }, [result]);


  const decimalCount = num => {
    const numStr = String(num);
    if (numStr.includes('.')) {
       return numStr.split('.')[1].length;
    };
    return 0;
  }

  const calculate = useCallback((input) => {
    equalPressed === true && operation === null ?
      (setResult(input), setEqualPressed(false)) :
    result === 0 && operation === null ? 
      setResult(input) : 
    result !== 0 && operation === null && length < 10 ? 
      setResult(result => (`${result}${input}`)) : 
    result === '0.' && operation !== null && firstNumber === null ? 
      (setFirstNumber(result), setResult(`0.${input}`)) :
    result !== 0 && operation !== null && firstNumber === null ? 
      (setFirstNumber(result), setResult(input)) :
    result !== 0 && operation !== null && firstNumber !== null && length < 10 ?
      setResult(result => (`${result}${input}`)) : 
      null
    });

    console.log('result', result, 'operation', operation, 'firstNum', firstNumber, 'equalpress?', equalPressed)

  const operate = useCallback((input) => {
    result !== 0 ?
    setOperation(input) :
    null
  })

  const solve = useCallback(() => {

    

    if (firstNumber !== null) {
      switch (operation) {
        case '+':
          let answerPlus = (parseFloat(firstNumber) + parseFloat(result));
          let plusStr = answerPlus.toString();
          let decimalCheckPlus = (decimalCount(answerPlus));
          plusStr.length > 9 ?
          (setResult(answerPlus.toPrecision(2)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) : 
          decimalCheckPlus > 4 ? (setResult(answerPlus.toFixed(4)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) :
          setResult(answerPlus); setFirstNumber(null); setOperation(null); setEqualPressed(true);
          break;
        case '-':
          let answerSubtract = (parseFloat(firstNumber) - parseFloat(result));
          let subtractStr = answerSubtract.toString();
          let decimalCheckSubtract = (decimalCount(answerSubtract));
          subtractStr.length > 9 ?
          (setResult(answerSubtract.toPrecision(2)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) : 
          decimalCheckSubtract > 4 ? (setResult(answerSubtract.toFixed(4)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) :
          setResult(answerSubtract); setFirstNumber(null); setOperation(null); setEqualPressed(true);
          break;
        case 'x':
          let answerMult = (parseFloat(firstNumber) * parseFloat(result));
          let multStr = answerMult.toString();
          let decimalCheckMult = (decimalCount(answerMult));
          console.log(multStr.length)
          multStr.length > 9 ?
          (setResult(answerMult.toPrecision(2)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) : 
          decimalCheckMult > 4 ? (setResult(answerMult.toFixed(4)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) :
          setResult(answerMult); setFirstNumber(null); setOperation(null); setEqualPressed(true);
          break;
        case '/':
          let answerDiv = (parseFloat(firstNumber) / parseFloat(result));
          let divStr = answerDiv.toString();
          let decimalCheckDiv = (decimalCount(answerDiv));
          divStr.length > 9 ?
          (setResult(answerDiv.toPrecision(2)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) : 
          decimalCheckDiv > 4 ? (setResult(answerDiv.toFixed(4)), setFirstNumber(null), setOperation(null), setEqualPressed(true)) :
          setResult(answerDiv); setFirstNumber(null); setOperation(null); setEqualPressed(true);
          break;
      }
    

    }
  });



  const reset = () => {
    setResult(0); setFirstNumber(null); setOperation(null); setEqualPressed(false);
  };

  // NEED TO FIGURE OUT SWAPPING WHEN ITS EXPONENTIAL

  const swap = useCallback(() => {
    let resultStr = result.toString();
    console.log(resultStr)
    resultStr.length > 9 ?
      setResult(result => (`-${result}`)) :
      setResult(result => Math.abs(result) * -1);
  });

  const decimal = useCallback(() => {
    result === 0 ? 
      setResult('0.') :
    result !== 0 && operation === null && equalPressed === true ?
      (setResult(`0.`), setEqualPressed(false)):
    result !== 0 && operation === null  ?
      setResult(result => (`${result}.`)) :
    result !== 0 && operation !== null ?
      (setFirstNumber(result), setResult('0.')) :
    
    null
      
    // equalPressed === true || operation === null ?
    // (console.log(operation),
    // setResult(result => (`${result}.`))) :
    // (setResult(`0.`), setEqualPressed(false));
  });

  const percentage = useCallback(() => {
    let percentageDecimalCheck = decimalCount(result);
    console.log(percentageDecimalCheck)
    percentageDecimalCheck > 4 ? 
    (setResult(result => (result / 100).toFixed(4)), setEqualPressed(true)) :
    setResult(result => (result / 100)), setEqualPressed(true);
  });

  const checkLengthOfResult = num => {
    const numStr = String(num);
    if (numStr.length < 5) {
      return 100
    } else if (numStr.length === 5) {
      return 85
    } else if (numStr.length === 6) {
      return 75
    } else if (numStr.length === 7) {
      return 70
    } else if (numStr.length === 8) {
      return 65
    } else if (numStr.length === 9) {
      return 55
    } else {
      return 55
    }
  };

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
      fontSize: checkLengthOfResult(result),
  
      
    },
    buttonContainer: {
      flex: 4,
      flexDirection: "row",
      flexWrap: "wrap",
    }
  });



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{result}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button calculate={reset} size={1} text={'AC'} theme={'gray'} />
          <Button calculate={swap} size={1} text={'+/-'} theme={'gray'}/>
          <Button calculate={percentage} size={1} text={'%'} theme={'gray'}/>
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
          <Button calculate={decimal} size={1} text={'.'} theme={'lightgray'}/>
          <Button calculate={solve} size={1} text={'='} theme={'orange'}/>
        </View>
      </SafeAreaView>
    </View>
  );
}


