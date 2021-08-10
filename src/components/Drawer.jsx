import React, { useContext, useState } from "react";
import CartItem from "./CartItem/CartItem";

import AppContext from "../context";

function Drawer({ onCloseCart, items }) {
	const { getTotalPrice, setCartOpened, clearCart, createOrder } =
		useContext(AppContext);
	const totalPrice = getTotalPrice();
	const [isOrdered, setIsOrdered] = useState(false);
	const [orderNum, setOrderNum] = useState(0);

	const order = () => {
		setOrderNum(createOrder(totalPrice));
		clearCart();
		setIsOrdered(true);
	};

	return (
		<div className="overlay">
			<div className="drawer-content">
				<div className="d-flex justify-between align-center">
					<h3>Корзина</h3>
					<img
						onClick={onCloseCart}
						className="cu-p"
						src="./images/delete.jpg"
						alt="close"
					/>
				</div>
				{!isOrdered ? (
					<>
						<div className="cartItems">
							{items.map((item) => (
								<CartItem
									key={parseInt(item.id)}
									name={item.name}
									price={item.price}
									image={item.image}
									id={item.id}
								/>
							))}
						</div>
						<ul className="cartTotalBlock">
							<li>
								<span>Итого:</span>
								<div></div>
								<b>{totalPrice} руб.</b>
							</li>
							<li>
								<span>Налог 5%</span>
								<div></div>
								<b>{Math.floor(totalPrice * 0.05)} руб.</b>
							</li>
						</ul>
						<button onClick={order} className="makeTransaction">
							<p>Оформить заказ</p>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 7H14.7143"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.71436 1L14.7144 7L8.71436 13"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</>
				) : (
					<div className="ordered">
						<img className="ordered__image" src="./images/ordered.jpg" alt="" />
						<h3>Ваш заказ оформлен</h3>
						<p>Ваш заказ #{orderNum} скоро будет передан курьерской доставке</p>
						<button onClick={() => setCartOpened(false)}>
							<img
								height={18}
								width={18}
								src="./images/arrow-left.svg"
								alt=""
							/>
							<p>Вернуться назад</p>
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Drawer;
