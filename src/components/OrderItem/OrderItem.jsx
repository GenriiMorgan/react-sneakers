import React from "react";
import styles from "./OrderItem.module.scss";

function OrderItem({ name, price, image }) {
	return (
		<div className={styles.orderItem}>
			<div className="d-flex justify-center align-center">
				<img height={112} width={133} src={image} alt="sneak1" />
			</div>
			<h5>{name}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span className="price">Цена:</span>
					<b>{price} руб.</b>
				</div>
			</div>
		</div>
	);
}

export default OrderItem;
