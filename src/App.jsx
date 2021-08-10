import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Profile from "./pages/Profile";

function App() {
	const [cartOpened, setCartOpened] = useState(false);
	const [sneakers, setSneakers] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const addToCart = (obj) => {
		if (cartItems.findIndex((item) => item.id === obj.id) === -1) {
			axios.post("https://610c44c566dd8f0017b76d57.mockapi.io/cart", obj);
			setCartItems((prev) => [...prev, obj]);
		}
		getTotalPrice();
	};

	const deleteFromFavorite = (obj) => {
		axios.delete(
			`https://610c44c566dd8f0017b76d57.mockapi.io/favorites/${obj.indexId}`
		);
	};

	const clearCart = () => {
		cartItems.forEach((item) =>
			axios.delete(
				`https://610c44c566dd8f0017b76d57.mockapi.io/cart/${item.id}`
			)
		);
		setCartItems([]);
	};

	const isItemInCart = (obj) => {
		return cartItems.some((item) => Number(item.indexId) === Number(obj.id));
	};

	const createOrder = (totalPrice) => {
		var order = {
			orders: [...cartItems],
			price: totalPrice,
		};
		axios.post("https://610c44c566dd8f0017b76d57.mockapi.io/orders", order);
		setOrders((prev) => [...prev, order]);
		return orders.length;
	};

	const deleteFromCart = (obj) => {
		axios.delete(`https://610c44c566dd8f0017b76d57.mockapi.io/cart/${obj.id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
		getTotalPrice();
	};

	const addToFavorite = async (obj) => {
		try {
			if (!favorites.some((item) => Number(item.id) === Number(obj.indexId))) {
				const { data } = await axios.post(
					"https://610c44c566dd8f0017b76d57.mockapi.io/favorites",
					obj
				);

				setFavorites((prev) => [...prev, data]);
			} else {
				axios.delete(
					`https://610c44c566dd8f0017b76d57.mockapi.io/favorites/${obj.id}`
				);
				setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
			}
		} catch (error) {
			console.log("Ошибка при добавлении товара в избранное");
		}
	};

	const onChangeSearchInput = (event) => {
		setSearchInput(event.target.value);
	};

	const clearInput = (event) => {
		event.preventDefault();
		setSearchInput("");
	};

	const getTotalPrice = () => {
		if (cartItems.length > 0) {
			const a = cartItems.reduce((acc, item) => acc + item.price, 0);
			return a;
		} else {
			return 0;
		}
	};

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			const cartResponse = await axios.get(
				"https://610c44c566dd8f0017b76d57.mockapi.io/cart"
			);
			const itemsResponse = await axios.get(
				"https://610c44c566dd8f0017b76d57.mockapi.io/Sneakers"
			);
			const favResponse = await axios.get(
				"https://610c44c566dd8f0017b76d57.mockapi.io/favorites"
			);
			const ordersResponse = await axios.get(
				"https://610c44c566dd8f0017b76d57.mockapi.io/orders"
			);
			setIsLoading(false);
			setFavorites(favResponse.data);
			setCartItems(cartResponse.data);
			setOrders(ordersResponse.data);
			setSneakers(itemsResponse.data);
		}
		fetchData();
	}, []);

	return (
		<AppContext.Provider
			value={{
				cartItems,
				sneakers,
				searchInput,
				favorites,
				addToCart,
				addToFavorite,
				onChangeSearchInput,
				clearInput,
				isLoading,
				deleteFromCart,
				setCartOpened,
				isItemInCart,
				deleteFromFavorite,
				createOrder,
				getTotalPrice,
				clearCart,
				orders,
			}}
		>
			<div className="wrapper">
				<Header />
				{cartOpened && (
					<Drawer onCloseCart={() => setCartOpened(false)} items={cartItems} />
				)}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/favorites">
						<Favorites />
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
				</Switch>
			</div>
		</AppContext.Provider>
	);
}

export default App;
