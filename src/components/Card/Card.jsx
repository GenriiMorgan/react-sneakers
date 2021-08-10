import React, { useContext, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context.jsx";

function Card({ id, name, price, image, favorite }) {
	const {
		addToCart,
		addToFavorite,
		isItemInCart,
		deleteFromCart,
		deleteFromFavorite,
	} = useContext(AppContext);
	const inCart = isItemInCart({ id });
	const [isFavorite, setIsFavorite] = useState(favorite);

	const addToCartAction = () => {
		if (!inCart) {
			addToCart({ indexId: id, id, name, price, image });
		} else {
			deleteFromCart({ indexId: id });
		}
	};

	const addToFavoriteAction = () => {
		if (isFavorite) {
			deleteFromFavorite({ indexId: id });
		}
		addToFavorite({ indexId: id, id, name, price, image });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			<div onClick={() => addToFavoriteAction()} className={styles.favourite}>
				<img
					src={isFavorite ? "/images/liked.svg" : "/images/unliked.svg"}
					alt="like"
				/>
			</div>
			<div className="d-flex justify-center align-center">
				<img height={112} width={133} src={image} alt="sneak1" />
			</div>
			<h5>{name}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span className="price">Цена:</span>
					<b>{price} руб.</b>
				</div>

				<img
					className="button"
					src={inCart ? "./images/added.svg" : "./images/addButton.svg"}
					alt="added"
					onClick={() => addToCartAction()}
				/>
			</div>
		</div>
	);
}

export default Card;
