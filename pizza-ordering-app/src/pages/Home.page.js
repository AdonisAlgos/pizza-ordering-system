import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import '../App.css'

const HomePage = () => {

  const [selectedPizza, setSelectedPizza] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [mushrooms, setMushrooms] = useState(false);
  const [sweetcorn, setSweetcorn] = useState(false);
  const [pickles, setPickles] = useState(false);

  const handleCheckboxChange = (event) => {
    switch (event.target.name) {
      case 'mushrooms':
        setMushrooms(event.target.checked);
        break;
      case 'sweetcorn':
        setSweetcorn(event.target.checked);
        break;
      case 'pickles':
        setPickles(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleFinishOrderClick = () => {
    if (!mushrooms && !sweetcorn && !pickles) {
      alert('Please select at least one topping before finishing your order.');
    } else {
      let order = 'You ordered a pizza with: ';
      if (mushrooms) order += 'mushrooms, ';
      if (sweetcorn) order += 'sweetcorn, ';
      if (pickles) order += 'pickles, ';
      alert(order);
  
      setMushrooms(false);
      setSweetcorn(false);
      setPickles(false);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedPizza(event.target.value);
  }

  const orderPizza = () => {
    if (!selectedPizza) {
      alert('Please select a pizza before ordering.');
    } else {
      alert(`You selected: ${selectedPizza}`);
      setSelectedPizza('');
    }
  };

  const handleCustomOrderClick = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseClick = () => {
    setShowMenu(false);
  };




  return (
    <div>
    <div className="button-container">
       <Button className="peperoniPizza">Peperoni Pizza(Image)</Button>
       <Button className="margharitaPizza">Margharita Pizza(Image)</Button>
       <Button className="bbqChickenPizza">BBQ Chicken Pizza(Image)</Button>
    </div>
    <div className="radio-buttons">
       <input type="radio" id="peperoni" name="pizza" value="peperoni" onChange={handleRadioChange}  checked={selectedPizza === 'peperoni'}/>
       <label htmlFor="peperoni">Peperoni Pizza</label>
       <input type="radio" id="margharita" name="pizza" value="margharita" onChange={handleRadioChange} checked={selectedPizza === 'margharita'}/>
       <label htmlFor="margharita">Margharita Pizza</label>
       <input type="radio" id="bbqChicken" name="pizza" value="bbqChicken" onChange={handleRadioChange} checked={selectedPizza === 'bbqChicken'}/>
       <label htmlFor="bbqChicken">BBQ Chicken Pizza</label>
    </div>
    <Button className="orderButton" onClick={orderPizza}>Order</Button>
    <Button className="customOrderButton" onClick={handleCustomOrderClick}>Custom Order</Button>

    {showMenu && (
      <div className="custom-checkbox-buttons">
        <h3>Custom Order</h3>
        <input type="checkbox" id="mushrooms" name="mushrooms" value="mushrooms"  checked={mushrooms} onChange={handleCheckboxChange}/>
         <label htmlFor="mushrooms">mushrooms</label>
         <input type="checkbox" id="sweetcorn" name="sweetcorn" value="sweetcorn" checked={sweetcorn} onChange={handleCheckboxChange}/>
         <label htmlFor="sweetcorn">sweetcorn</label>
         <input type="checkbox" id="pickles" name="pickles" value="pickles" checked={pickles} onChange={handleCheckboxChange}/>
         <label htmlFor="pickles">pickles</label>
         <Button className="closeOrder"  onClick={handleCloseClick}>Close</Button>
         <Button className="finialOrder" onClick={handleFinishOrderClick}>Finish Order</Button>
      </div>
    )}
    
  </div>
  
  )
}

export default HomePage