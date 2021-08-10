import React, { useContext } from "react";
import Card from "../components/Card/Card.jsx";
import MyLoader from "../components/MyLoader.jsx";
import AppContext from "../context.jsx";

function Home() {
	const {
		sneakers,
		isLoading,
		clearInput,
		onChangeSearchInput,
		favorites,
		searchInput,
	} = useContext(AppContext);
	const renderItems = () => {
		const filteredItems = sneakers.filter((item) =>
			item.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
		);
		return isLoading ? (
			<>
				<MyLoader />
				<MyLoader />
				<MyLoader />
				<MyLoader />
				<MyLoader />
				<MyLoader />
				<MyLoader />
				<MyLoader />
			</>
		) : (
			filteredItems.map((item) => (
				<Card
					key={item.id}
					id={item.id}
					name={item.name}
					price={item.price}
					image={item.image}
					favorite={
						favorites.some((fav) => Number(fav.indexId) === Number(item.id))
							? true
							: false
					}
				/>
			))
		);
	};

	return (
		<div className="content p-40">
			<div className="d-flex justify-between align-center mb-40">
				<h1>
					{searchInput ? `Поиск по запросу: ${searchInput}` : "Все кроссовки"}
				</h1>
				<div className="search-block">
					<img src="/images/Search.svg" alt="Search" />
					<input
						value={searchInput}
						onChange={onChangeSearchInput}
						type="text"
						placeholder="Поиск..."
					/>
					{searchInput ? (
						<img
							onClick={clearInput}
							className="clearSearch cu-p"
							src="./images/delete.jpg"
							alt="clear"
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="items d-flex flex-wrap">{renderItems()}</div>
		</div>
	);
}

export default Home;
