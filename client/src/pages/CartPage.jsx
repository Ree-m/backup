import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import Product from '../Product';
import { useNavigate } from "react-router-dom";


const CartPage = ({ cartItems, setCartItems }) => {

    const { userInfo } = useContext(UserContext)
    // const [quantity, setQuantity] = useState(cartItems.quantity)
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();




    if (cartItems) {
        console.log("this is cartItems", cartItems[0], cartItems)


    }

    async function removeFromCart(productId) {
        try {
            await fetch(`http://localhost:9000/cart/${userInfo.id}/${productId}`, {
                method: "DELETE",
                credentials: "include"
            })
            setRedirect(true)
            setCartItems(() => cartItems[0].products.filter((item) => item.productId !== productId)) //cart items with productId not equal to the deleted productid stay
        } catch (error) {
            console.error(error);

        }
    }




    async function updateQuantity(productId, newQuantity) {
        try {
            const response = await fetch(`http://localhost:9000/cart/updateQuantity/${userInfo.id}/${productId}/${newQuantity}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newQuantity })
            });
            const data = await response.json();
            setCartItems(data);
            console.log("this is update data", data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleMinusClick = (productId, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handlePlusClick = (productId, quantity) => {
        const newQuantity = quantity + 1;
        updateQuantity(productId, newQuantity);
    }


    if (redirect) {
        return navigate(`/cart/${userInfo.id}`)
    }


    return (
        <>
            <h2>Cart</h2>
            {cartItems && cartItems[0].products.length < 0 ? ("Cart is empty") : cartItems && cartItems[0].products.map((item) => (
                <div key={item._id}>
                    <p>{item.name}</p>
                    <div>
                        <button onClick={() => handleMinusClick(item.productId, item.quantity)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handlePlusClick(item.productId, item.quantity)}>+</button>
                    </div>
                    <p>Price: ${item.price}</p>
                    <img src={`http://localhost:9000/${item.image}`} alt={item.name} />
                    <button onClick={() => removeFromCart(item.productId)}>Remove from cart</button>
                </div>

            ))}

            {cartItems && (
                <>
                    <h3>Total bill: ${cartItems[0].products.reduce((acc,item)=>acc + item.price * item.quantity,0)}</h3>
                </>
            )}


        </>
    );
}

export default CartPage;