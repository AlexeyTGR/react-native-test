import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [76, 80, 83, 80, 77, 85],
      color: (opacity = 1) => `rgba(133,0,0,${opacity})`,
    },
    {
      data: [65, 60, 63, 67, 62, 59],
      color: (opacity = 1) => `rgba(0,133,0,${opacity})`,
    },
  ],
  legend: ['Weight', 'Another weight'],
};

const chartConfig = {
  backgroundGradientFrom: '#1E2990',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(80, 100, 150, ${opacity})`,
};

const Graph = () => {
  const screenWidth = Dimensions.get('screen').width;

  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default Graph;
