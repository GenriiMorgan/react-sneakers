import React from "react";
import { useContext } from "react";
import AppContext from "../context";
import Order from "../components/Order/Order";
import { Link } from "react-router-dom";

function Profile() {
	const { orders, isLoading } = useContext(AppContext);

	return (
		<div className="content p-40">
			{orders.length ? (
				<>
					<div className="d-flex justify-between align-center mb-40">
						<h2>История покупок</h2>
					</div>
					<div className="items d-flex flex-wrap">
						{orders.map((item, index) => (
							<Order key={index} items={item} />
						))}
					</div>
				</>
			) : isLoading ? (
				<></>
			) : (
				<div class="noOrdersContainer">
					<div className="noOrders">
						<img src="./images/sadSmile.png" alt="sadSmile" />
						<h3>У вас нет заказов</h3>
						<p>
							Вы нищеброд? <br /> Оформите хотя бы один заказ.
						</p>
						<Link class="LinkToHome" to="/">
							<button>
								<img
									height={18}
									width={18}
									src="./images/arrow-left.svg"
									alt=""
								/>
								<p>Вернуться назад</p>
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Profile;
