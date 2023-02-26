

const metroStations = [
    { id: 1, name: '北車', x: 200, y: 400 },
    { id: 2, name: '中山', x: 200, y: 350 },
    { id: 3, name: '雙聯', x: 200, y: 300 },
    { id: 4, name: '民權西路', x: 200, y: 250 },
    { id: 5, name: '圓山', x: 200, y: 200 },
    { id: 6, name: '劍潭', x: 200, y: 150 },
  ];

  const metroLines = [
    { id: 1, color: '#FF5733', stations: [1, 2] },
    { id: 2, color: '#FF5733', stations: [2, 3] },
    { id: 3, color: '#FF5733', stations: [3, 4] },
    { id: 4, color: '#FF5733', stations: [4, 5] },
    { id: 5, color: '#FF5733', stations: [5, 6] },
  ];

module.exports = {metroLines, metroStations};
