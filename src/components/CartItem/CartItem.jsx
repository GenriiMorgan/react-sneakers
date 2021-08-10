import React, { useContext } from "react";
import AppContext from "../../context";

function CartItem({ name, price, image, id }) {
	const { deleteFromCart } = useContext(AppContext);
	return (
		<div className="cartItem d-flex align-center mb-20">
			<div
				style={{ backgroundImage: "url(" + image + ")" }}
				className="cartItemImage"
			></div>
			<div className="mr-20 flex">
				<p className="mb-5">{name}</p>
				<b>{price} руб.</b>
			</div>
			<img
				className="removeBtn"
				onClick={() => deleteFromCart({ id })}
				src="./images/delete.jpg"
				alt=""
			/>
		</div>
	);
}

export default CartItem;
