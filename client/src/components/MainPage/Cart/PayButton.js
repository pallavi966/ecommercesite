import axios from 'axios'
import {useSelector} from 'react-redux'
const url = 'http://localhost:5000/api'
const PayButton = (cart) => {

    // const {user} = useSelector((state)=>state.auth)
        
    const handleCheckout = () => {

        const cartItems = cart.cartItems
        console.log(cartItems)
        // console.log(user._id)
 
        axios.post(`${url}/stripe/create-checkout-session`,{
            cartItems
            // userId: user._id
          
        })
        .then((response) => {
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
          .catch((err) => console.log(err.message));
      };
    return (
        <>
            <button onClick={() => handleCheckout()}>CheckOut</button>
        </>
    )
}

export default PayButton