import React from "react";
import Card from "../components/Card/Card";
import { useContext } from "react";
import AppContext from "../context";

function Favorites() {
	const { favorites } = useContext(AppContext);
	return (
		<div className="content p-40">
			<div className="d-flex justify-between align-center mb-40">
				<h1>Мои Закладки</h1>
			</div>
			<div className="items d-flex flex-wrap">
				{favorites.map((item) => (
					<Card
						key={item.id}
						id={item.indexId}
						name={item.name}
						price={item.price}
						image={item.image}
						favorite={true}
					/>
				))}
			</div>
		</div>
	);
}

export default Favorites;
