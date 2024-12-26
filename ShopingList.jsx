import React, { useState, useEffect } from 'react';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('other');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/shoplist');
        const data = await response.json();
        console.log('Полученные данные:', data.items);
        const filteredData = data.items.filter(item => item.type === selectedType).sort((a, b) => {return (a.name > b.name) ? 1 : (a.name < b.name ? -1 : 0)});
        console.log('Фильтрованные данные:', filteredData);
        setItems(filteredData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
  
    fetchData();
  }, [selectedType]);
  

  const types = [
    { name: 'Парфюмерия', type: 'perfume' },
    { name: 'Овощи', type: 'vegetables' },
    { name: 'Фрукты', type: 'fruits' },
    { name: 'Мясо', type: 'meat' },
    { name: 'Прочее', type: 'other' },
  ];

  return (
    <div id="container" className="container m-3">
      <div className="shopList">
        <h3>Список покупок:</h3>
        <div className="controls">
          <select name="itemtype" id="itemtype" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            {types.map(type => (
              <option key={type.type} value={type.type}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <table className="shopTable">
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingList;