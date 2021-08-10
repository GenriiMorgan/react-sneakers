import React from "react";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./Order.module.scss";

function Order({ items }) {
	return (
		<>
			<div className={styles.order}>
				<div className={styles.orderItems}>
					{items.orders.map((item, index) => (
						<OrderItem key={index} {...item} />
					))}
				</div>
				<h4 class={styles.totalPrice}>
					Полная стоимость заказа: {items.price} руб.
				</h4>
			</div>
		</>
	);
}

export default Order;
